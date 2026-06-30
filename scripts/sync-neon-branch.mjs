import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envFilePath = resolve(rootDir, process.env.NEON_ENV_FILE ?? ".env.local");
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";
const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
Usage:
  npm run db:branch:sync
  npm run db:branch:sync -- --list
  npm run db:branch:sync -- --branch feature/backend
  npm run db:branch:sync -- --branch-prefix local
  npm run db:branch:sync -- --neon-branch preview/feature/backend
  npm run db:branch:sync -- --parent main

Required:
  NEON_API_KEY          Neon API key for CLI automation
  PF_NEON_PROJECT_ID   Neon project id, usually from Vercel env pull

Optional:
  NEON_BRANCH           Exact Neon branch name to use
  NEON_BRANCH_PREFIX    Prefix for inferred branches, defaults to preview
  NEON_LOCAL_BRANCH     Legacy exact Neon branch name override
  NEON_PARENT_BRANCH   Parent Neon branch for newly created Neon branches
  NEON_ENV_FILE        Env file to update, defaults to .env.local
`);
  process.exit(0);
}

for (const envFile of [
  ".env.local",
  ".vercel/.env.development.local",
  ".env",
]) {
  config({ path: resolve(rootDir, envFile), quiet: true });
}

const projectId = requireEnv("PF_NEON_PROJECT_ID");
const apiKey = requireEnv("NEON_API_KEY");

if (args.includes("--list")) {
  listBranches();
  process.exit(0);
}

const existingDatabaseUrl =
  process.env.PF_DATABASE_URL_UNPOOLED ?? process.env.PF_DATABASE_URL;
const databaseUrl = parseOptionalUrl(existingDatabaseUrl);
const roleName =
  process.env.PF_PGUSER ?? process.env.PF_POSTGRES_USER ?? databaseUrl?.username;
const databaseName =
  process.env.PF_PGDATABASE ??
  process.env.PF_POSTGRES_DATABASE ??
  databaseUrl?.pathname.replace(/^\//, "");

if (!roleName || !databaseName) {
  throw new Error(
    "Missing PF_PGUSER/PF_PGDATABASE, or a parseable PF_DATABASE_URL, for Neon connection string lookup.",
  );
}

const sourceBranch =
  readFlag("--branch") ?? process.env.GIT_BRANCH ?? currentGitBranch();
const branchPrefix =
  readFlag("--branch-prefix") ?? process.env.NEON_BRANCH_PREFIX ?? "preview";
const neonBranch =
  readFlag("--neon-branch") ??
  process.env.NEON_BRANCH ??
  process.env.NEON_LOCAL_BRANCH ??
  toNeonBranchName(sourceBranch, branchPrefix);
const parentBranch = readFlag("--parent") ?? process.env.NEON_PARENT_BRANCH;

console.log(`Syncing local env to Neon branch "${neonBranch}"...`);

const existingBranch = await ensureBranch(neonBranch, parentBranch);
await waitForBranchReady(existingBranch.name);

const connectionArgs = [
  "connection-string",
  existingBranch.name,
  "--role-name",
  roleName,
  "--database-name",
  databaseName,
];
const unpooledUrl = runNeon(connectionArgs).trim();
const pooledUrl = runNeon([...connectionArgs, "--pooled"]).trim();

updateEnvFile(envFilePath, buildEnvUpdates({ pooledUrl, projectId, unpooledUrl }));

console.log(`Updated ${relativeEnvPath(envFilePath)} for Neon branch "${existingBranch.name}".`);
console.log("Run npm run db:migrate to apply committed migrations to this branch.");

async function ensureBranch(branchName, parent) {
  const branches = normalizeBranches(
    parseJson(runNeon(["branches", "list"], { json: true })),
  );
  const existing = branches.find((branch) => branch.name === branchName);

  if (existing) {
    console.log(`Using existing Neon branch "${branchName}".`);
    return existing;
  }

  console.log(`Creating Neon branch "${branchName}".`);
  const createArgs = ["branches", "create", "--name", branchName];

  if (parent) {
    createArgs.push("--parent", parent);
  }

  const created = parseJson(runNeon(createArgs, { json: true }));
  return created.branch ?? created;
}

function listBranches() {
  const branches = normalizeBranches(
    parseJson(runNeon(["branches", "list"], { json: true })),
  );

  if (branches.length === 0) {
    console.log("No Neon branches found.");
    return;
  }

  for (const branch of branches) {
    const marker = branch.primary ? "*" : " ";
    const state = branch.current_state ?? branch.state ?? "unknown";

    console.log(`${marker} ${branch.name} (${branch.id}) - ${state}`);
  }
}

async function waitForBranchReady(branchName) {
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    const branch = parseJson(runNeon(["branches", "get", branchName], { json: true }));

    if (branch.current_state === "ready") {
      return branch;
    }

    await sleep(2000);
  }

  throw new Error(`Timed out waiting for Neon branch "${branchName}" to become ready.`);
}

function buildEnvUpdates({ pooledUrl, projectId, unpooledUrl }) {
  const pooled = new URL(pooledUrl);
  const unpooled = new URL(unpooledUrl);
  const noSsl = new URL(unpooledUrl);

  noSsl.searchParams.delete("sslmode");
  noSsl.searchParams.delete("channel_binding");

  return {
    PF_DATABASE_URL: pooledUrl,
    PF_DATABASE_URL_UNPOOLED: unpooledUrl,
    PF_NEON_PROJECT_ID: projectId,
    PF_PGDATABASE: decodeURIComponent(unpooled.pathname.replace(/^\//, "")),
    PF_PGHOST: pooled.hostname,
    PF_PGHOST_UNPOOLED: unpooled.hostname,
    PF_PGPASSWORD: decodeURIComponent(unpooled.password),
    PF_PGUSER: decodeURIComponent(unpooled.username),
    PF_POSTGRES_DATABASE: decodeURIComponent(unpooled.pathname.replace(/^\//, "")),
    PF_POSTGRES_HOST: pooled.hostname,
    PF_POSTGRES_PASSWORD: decodeURIComponent(unpooled.password),
    PF_POSTGRES_PRISMA_URL: addSearchParam(unpooledUrl, "connect_timeout", "30"),
    PF_POSTGRES_URL: pooledUrl,
    PF_POSTGRES_URL_NO_SSL: noSsl.toString(),
    PF_POSTGRES_URL_NON_POOLING: unpooledUrl,
    PF_POSTGRES_USER: decodeURIComponent(unpooled.username),
  };
}

function updateEnvFile(filePath, updates) {
  const existing = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  const lines = existing ? existing.split(/\r?\n/) : [];
  const seen = new Set();
  const updatedLines = lines.map((line) => {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=/);

    if (!match) {
      return line;
    }

    const key = match[1];

    if (!(key in updates)) {
      return line;
    }

    seen.add(key);
    return `${key}=${formatEnvValue(updates[key])}`;
  });

  const missingKeys = Object.keys(updates).filter((key) => !seen.has(key));

  if (missingKeys.length > 0) {
    if (updatedLines.length > 0 && updatedLines.at(-1) !== "") {
      updatedLines.push("");
    }

    updatedLines.push("# Neon preview branch sync");

    for (const key of missingKeys) {
      updatedLines.push(`${key}=${formatEnvValue(updates[key])}`);
    }
  }

  writeFileSync(filePath, `${updatedLines.join("\n").replace(/\n+$/, "")}\n`);
}

function runNeon(neonArgs, { json = false } = {}) {
  const outputArgs = json ? ["--output", "json"] : [];

  return run(npxCommand, [
    "--yes",
    "neonctl@latest",
    ...neonArgs,
    "--project-id",
    projectId,
    "--no-color",
    "--no-analytics",
    ...outputArgs,
  ], {
    env: {
      ...process.env,
      NEON_API_KEY: apiKey,
    },
  });
}

function run(command, commandArgs, options = {}) {
  const result = spawnSync(command, commandArgs, {
    cwd: rootDir,
    encoding: "utf8",
    shell: process.platform === "win32" && command.endsWith(".cmd"),
    ...options,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(
      [
        `Command failed: ${command} ${commandArgs.join(" ")}`,
        result.stderr.trim(),
        result.stdout.trim(),
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }

  return result.stdout;
}

function currentGitBranch() {
  const branch = run("git", ["branch", "--show-current"]).trim();

  if (!branch) {
    throw new Error(
      "Cannot infer a Git branch while HEAD is detached. Pass --branch or --neon-branch.",
    );
  }

  return branch;
}

function toNeonBranchName(branchName, prefix) {
  const sanitized = branchName
    .trim()
    .replace(/^refs\/heads\//, "")
    .replace(/\\/g, "/")
    .replace(/[^A-Za-z0-9._/-]+/g, "-")
    .replace(/\/+/g, "/")
    .replace(/^-+|-+$/g, "");

  if (!sanitized) {
    throw new Error("Could not derive a Neon branch name from the current Git branch.");
  }

  const sanitizedPrefix = prefix
    .trim()
    .replace(/\\/g, "/")
    .replace(/[^A-Za-z0-9._/-]+/g, "-")
    .replace(/\/+/g, "/")
    .replace(/^\/+|\/+$/g, "");

  if (!sanitizedPrefix) {
    return sanitized.slice(0, 256);
  }

  return `${sanitizedPrefix}/${sanitized}`.slice(0, 256);
}

function readFlag(name) {
  const index = args.indexOf(name);

  if (index === -1) {
    return undefined;
  }

  const value = args[index + 1];

  if (!value || value.startsWith("--")) {
    throw new Error(`Missing value for ${name}.`);
  }

  return value;
}

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing ${name}. Add it to .env.local or export it before running this script.`,
    );
  }

  return value;
}

function parseJson(value) {
  try {
    return JSON.parse(value);
  } catch (error) {
    throw new Error(`Expected JSON from Neon CLI, received:\n${value}`, {
      cause: error,
    });
  }
}

function normalizeBranches(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (Array.isArray(value?.branches)) {
    return value.branches;
  }

  if (value?.branch) {
    return [value.branch];
  }

  if (value?.id && value?.name) {
    return [value];
  }

  throw new Error(`Unexpected Neon branches response:\n${JSON.stringify(value, null, 2)}`);
}

function addSearchParam(url, key, value) {
  const parsed = new URL(url);

  parsed.searchParams.set(key, value);
  return parsed.toString();
}

function parseOptionalUrl(value) {
  if (!value) {
    return null;
  }

  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function formatEnvValue(value) {
  if (/^[A-Za-z0-9_./:@%+?=&,-]+$/.test(value)) {
    return value;
  }

  return JSON.stringify(value);
}

function relativeEnvPath(filePath) {
  return filePath.replace(`${rootDir}\\`, "").replace(`${rootDir}/`, "");
}

function sleep(ms) {
  return new Promise((resolvePromise) => {
    setTimeout(resolvePromise, ms);
  });
}
