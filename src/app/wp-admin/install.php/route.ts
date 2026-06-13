import { logWpHoneypotAttempt } from "@/db/wp-honeypot";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ParsedBody = {
  fields: Record<string, unknown>;
  raw: string;
};

type InstallRender = {
  html: string;
  routeState: string;
  statusCode: number;
  step: string;
};

const HTML_HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "Wed, 11 Jan 1984 05:00:00 GMT",
  "X-Robots-Tag": "noindex, nofollow",
};

const RAW_BODY_LIMIT = 16_000;
const WORDPRESS_ASSET_VERSION = "20260303";

const LANGUAGES = [
  ["", "English (United States)", "en"],
  ["es_ES", "Español", "es"],
  ["fr_FR", "Français", "fr"],
  ["de_DE", "Deutsch", "de"],
  ["it_IT", "Italiano", "it"],
  ["pt_BR", "Português do Brasil", "pt"],
  ["ja", "日本語", "ja"],
  ["zh_CN", "简体中文", "zh"],
  ["ru_RU", "Русский", "ru"],
  ["ar", "العربية", "ar"],
  ["ko_KR", "한국어", "ko"],
  ["nl_NL", "Nederlands", "nl"],
  ["pl_PL", "Polski", "pl"],
  ["tr_TR", "Türkçe", "tr"],
];

function escapeHtml(value: unknown) {
  const replacements: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return String(value ?? "").replace(/[&<>"']/g, (char) => replacements[char]);
}

function field(fields: Record<string, unknown>, name: string) {
  const value = fields[name];

  if (Array.isArray(value)) {
    return String(value[0] ?? "");
  }

  return typeof value === "string" ? value : "";
}

function sanitizeUser(value: string) {
  return value.replace(/[^A-Za-z0-9 _.\-@]/g, "");
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function generatePassword(length = 18) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";

  return Array.from({ length }, () => {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }).join("");
}

function getStep(url: URL) {
  const step = Number.parseInt(url.searchParams.get("step") ?? "0", 10);

  return Number.isFinite(step) ? step : 0;
}

function getLanguage(url: URL, body: Record<string, unknown>) {
  return field(body, "language") || url.searchParams.get("language") || "";
}

function parseSearchParams(raw: string) {
  const parsed: Record<string, unknown> = {};
  const params = new URLSearchParams(raw);

  params.forEach((value, key) => {
    const current = parsed[key];

    if (Array.isArray(current)) {
      current.push(value);
    } else if (typeof current === "string") {
      parsed[key] = [current, value];
    } else {
      parsed[key] = value;
    }
  });

  return parsed;
}

async function readBody(request: Request): Promise<ParsedBody> {
  if (request.method === "GET" || request.method === "HEAD") {
    return { fields: {}, raw: "" };
  }

  const raw = (await request.text()).slice(0, RAW_BODY_LIMIT);
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const parsed = JSON.parse(raw);

      return {
        fields:
          parsed && typeof parsed === "object" && !Array.isArray(parsed)
            ? (parsed as Record<string, unknown>)
            : { value: parsed },
        raw,
      };
    } catch {
      return { fields: { malformed_json: raw }, raw };
    }
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType === ""
  ) {
    return { fields: parseSearchParams(raw), raw };
  }

  return {
    fields: {
      unparsed_body: raw,
      content_type: contentType,
    },
    raw,
  };
}

function faviconHref() {
  return `/wp-admin/images/wordpress-logo-gray.svg?ver=${WORDPRESS_ASSET_VERSION}`;
}

function wpStyleLinks() {
  const styles = [
    ["dashicons-css", "/wp-includes/css/dashicons.css"],
    ["buttons-css", "/wp-includes/css/buttons.css"],
    ["forms-css", "/wp-admin/css/forms.css"],
    ["l10n-css", "/wp-admin/css/l10n.css"],
    ["wp-base-styles-css", "/wp-includes/css/dist/base-styles/admin-schemes.css"],
    ["install-css", "/wp-admin/css/install.css"],
  ];

  return styles
    .map(([id, href]) => {
      return `<link rel="stylesheet" id="${id}" href="${href}?ver=${WORDPRESS_ASSET_VERSION}" media="all">`;
    })
    .join("\n  ");
}

function displayHeader(bodyClass = "") {
  const classes = ["wp-core-ui", "admin-color-modern", bodyClass]
    .filter(Boolean)
    .join(" ");

  return `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="robots" content="noindex,nofollow">
  <title>WordPress &rsaquo; Installation</title>
  <link rel="icon" href="${faviconHref()}">
  ${wpStyleLinks()}
</head>
<body class="${classes}">
<p id="logo">WordPress</p>`;
}

function displayFooter() {
  return `<script>
var t = document.getElementById('weblog_title'); if (t){ t.focus(); }
(function() {
  document.querySelectorAll('.hide-if-no-js').forEach(function(node) {
    node.classList.remove('hide-if-no-js');
  });

  var pass1 = document.getElementById('pass1');
  var pass2 = document.getElementById('pass2');
  var reveal = document.querySelector('[data-toggle-password]');
  var strength = document.getElementById('pass-strength-result');

  if (pass1 && !pass1.value && pass1.dataset.pw) {
    pass1.value = pass1.dataset.pw;
  }

  function syncPassword() {
    if (pass1 && pass2) {
      pass2.value = pass1.value;
    }

    if (pass1 && strength) {
      var score = pass1.value.length > 15 ? 'Strong' : pass1.value.length > 9 ? 'Medium' : 'Weak';
      strength.textContent = score;
      strength.className = score.toLowerCase();
    }
  }

  if (pass1) {
    pass1.addEventListener('input', syncPassword);
    syncPassword();
  }

  if (reveal && pass1) {
    reveal.addEventListener('click', function() {
      var masked = pass1.type === 'password';
      pass1.type = masked ? 'text' : 'password';
      reveal.querySelector('.text').textContent = masked ? 'Hide' : 'Show';
      reveal.setAttribute('aria-label', masked ? 'Hide password' : 'Show password');
    });
  }
}());
</script>
</body>
</html>`;
}

function displayLanguageChooser(selectedLanguage: string) {
  const options = LANGUAGES.map(([value, label, lang]) => {
    const selected = value === selectedLanguage ? " selected" : "";

    return `<option value="${escapeHtml(value)}" lang="${escapeHtml(lang)}"${selected}>${escapeHtml(label)}</option>`;
  }).join("");

  return `${displayHeader("language-chooser")}
<form id="setup" method="post" action="/wp-admin/install.php?step=1">
  <h1>Select a default language</h1>
  <label class="screen-reader-text" for="language">Select a default language</label>
  <select size="14" name="language" id="language">${options}</select>
  <p class="step">
    <input type="submit" class="button button-primary button-large" value="Continue">
  </p>
</form>
${displayFooter()}`;
}

function displaySetupForm(fields: Record<string, unknown>, language: string, error?: string) {
  const weblogTitle = field(fields, "weblog_title");
  const userName = sanitizeUser(field(fields, "user_name"));
  const adminEmail = field(fields, "admin_email");
  const blogPublic = field(fields, "blog_public");
  const initialPassword = field(fields, "admin_password") || generatePassword();
  const checked = blogPublic === "0" ? " checked" : "";
  const message = error
    ? `<h1>Welcome</h1>
<p class="message">${error}</p>`
    : "";

  return `${message}
<form id="setup" method="post" action="/wp-admin/install.php?step=2" novalidate="novalidate">
  <table class="form-table" role="presentation">
    <tr>
      <th scope="row"><label for="weblog_title">Site Title</label></th>
      <td><input name="weblog_title" type="text" id="weblog_title" size="25" value="${escapeHtml(weblogTitle)}"></td>
    </tr>
    <tr>
      <th scope="row"><label for="user_login">Username</label></th>
      <td>
        <input name="user_name" type="text" id="user_login" size="25" aria-describedby="user-name-desc" value="${escapeHtml(userName)}">
        <p id="user-name-desc">Usernames can have only alphanumeric characters, spaces, underscores, hyphens, periods, and the @ symbol.</p>
      </td>
    </tr>
    <tr class="form-field form-required user-pass1-wrap">
      <th scope="row"><label for="pass1">Password</label></th>
      <td>
        <div class="wp-pwd">
          <div class="password-input-wrapper">
            <input type="password" name="admin_password" id="pass1" class="regular-text" autocomplete="new-password" spellcheck="false" data-reveal="1" data-pw="${escapeHtml(initialPassword)}" aria-describedby="pass-strength-result admin-password-desc">
            <div id="pass-strength-result" aria-live="polite"></div>
          </div>
          <button type="button" class="button wp-hide-pw hide-if-no-js" data-start-masked="0" data-toggle-password="1" aria-label="Hide password">
            <span class="dashicons dashicons-hidden" aria-hidden="true"></span>
            <span class="text">Hide</span>
          </button>
        </div>
        <p id="admin-password-desc"><span class="description important hide-if-no-js"><strong>Important:</strong> You will need this password to log&nbsp;in. Please store it in a secure location.</span></p>
      </td>
    </tr>
    <tr class="form-field form-required user-pass2-wrap hide-if-js">
      <th scope="row"><label for="pass2">Repeat Password <span class="description">(required)</span></label></th>
      <td><input type="password" name="admin_password2" id="pass2" autocomplete="new-password" spellcheck="false" value="${escapeHtml(initialPassword)}"></td>
    </tr>
    <tr class="pw-weak">
      <th scope="row">Confirm Password</th>
      <td>
        <label>
          <input type="checkbox" name="pw_weak" class="pw-checkbox">
          Confirm use of weak password
        </label>
      </td>
    </tr>
    <tr>
      <th scope="row"><label for="admin_email">Your Email</label></th>
      <td>
        <input name="admin_email" type="email" id="admin_email" size="25" aria-describedby="admin-email-desc" value="${escapeHtml(adminEmail)}">
        <p id="admin-email-desc">Double-check your email address before continuing.</p>
      </td>
    </tr>
    <tr>
      <th scope="row">Search engine visibility</th>
      <td>
        <fieldset>
          <legend class="screen-reader-text"><span>Search engine visibility</span></legend>
          <label for="blog_public"><input name="blog_public" type="checkbox" id="blog_public" aria-describedby="privacy-desc" value="0"${checked}> Discourage search engines from indexing this site</label>
          <p id="privacy-desc" class="description">It is up to search engines to honor this request.</p>
        </fieldset>
      </td>
    </tr>
  </table>
  <p class="step"><input type="submit" name="Submit" id="submit" class="button button-large" value="Install WordPress"></p>
  <input type="hidden" name="language" value="${escapeHtml(language)}">
</form>`;
}

function renderSetupPage(fields: Record<string, unknown>, language: string, error?: string) {
  return `${displayHeader()}
<h1>Welcome</h1>
<p>Welcome to the famous five-minute WordPress installation process! Just fill in the information below and you&#8217;ll be on your way to using the most extendable and powerful personal publishing platform in the world.</p>

<h2>Information needed</h2>
<p>Please provide the following information. Do not worry, you can always change these settings later.</p>

${displaySetupForm(fields, language, error)}
${displayFooter()}`;
}

function renderSuccess(fields: Record<string, unknown>) {
  const userName = sanitizeUser(field(fields, "user_name"));
  const password = field(fields, "admin_password");
  const passwordMarkup = password
    ? `<code>${escapeHtml(password)}</code><br>`
    : "";

  return `${displayHeader()}
<h1>Success!</h1>

<p>WordPress has been installed. Thank you, and enjoy!</p>

<table class="form-table install-success">
  <tr>
    <th>Username</th>
    <td>${escapeHtml(userName)}</td>
  </tr>
  <tr>
    <th>Password</th>
    <td>
      ${passwordMarkup}
      <p>Your chosen password.</p>
    </td>
  </tr>
</table>

<p class="step"><a href="/wp-login.php" class="button button-primary button-large">Log In</a></p>
${displayFooter()}`;
}

function renderStep2(fields: Record<string, unknown>, language: string): InstallRender {
  const userName = field(fields, "user_name").trim();
  const adminPassword = field(fields, "admin_password");
  const adminPasswordCheck = field(fields, "admin_password2");
  const adminEmail = field(fields, "admin_email").trim();

  if (!userName) {
    return {
      html: renderSetupPage(fields, language, "Please provide a valid username."),
      routeState: "step2_invalid_username",
      statusCode: 200,
      step: "2",
    };
  }

  if (sanitizeUser(userName) !== userName) {
    return {
      html: renderSetupPage(
        fields,
        language,
        "The username you provided has invalid characters.",
      ),
      routeState: "step2_invalid_username_chars",
      statusCode: 200,
      step: "2",
    };
  }

  if (adminPassword !== adminPasswordCheck) {
    return {
      html: renderSetupPage(fields, language, "Your passwords do not match. Please try again."),
      routeState: "step2_password_mismatch",
      statusCode: 200,
      step: "2",
    };
  }

  if (!adminEmail) {
    return {
      html: renderSetupPage(fields, language, "You must provide an email address."),
      routeState: "step2_missing_email",
      statusCode: 200,
      step: "2",
    };
  }

  if (!isEmail(adminEmail)) {
    return {
      html: renderSetupPage(
        fields,
        language,
        "Sorry, that is not a valid email address. Email addresses look like <code>username@example.com</code>.",
      ),
      routeState: "step2_invalid_email",
      statusCode: 200,
      step: "2",
    };
  }

  return {
    html: renderSuccess(fields),
    routeState: "step2_success",
    statusCode: 200,
    step: "2",
  };
}

function renderInstall(request: Request, fields: Record<string, unknown>): InstallRender {
  const url = new URL(request.url);
  const step = getStep(url);
  const language = getLanguage(url, fields);

  if (step === 0 && !language) {
    return {
      html: displayLanguageChooser(language),
      routeState: "step0_language_chooser",
      statusCode: 200,
      step: "0",
    };
  }

  if (step === 0 || step === 1) {
    return {
      html: renderSetupPage(fields, language),
      routeState: "step1_setup_form",
      statusCode: 200,
      step: String(step),
    };
  }

  if (step === 2) {
    return renderStep2(fields, language);
  }

  return {
    html: `${displayHeader()}${displayFooter()}`,
    routeState: "unknown_step",
    statusCode: 200,
    step: String(step),
  };
}

async function installResponse(request: Request, includeBody = true) {
  const parsedBody = await readBody(request);
  const rendered = renderInstall(request, parsedBody.fields);

  await logWpHoneypotAttempt({
    request,
    routeState: rendered.routeState,
    statusCode: rendered.statusCode,
    step: rendered.step,
    body: parsedBody.fields,
    rawBody: parsedBody.raw,
  });

  return new Response(includeBody ? rendered.html : null, {
    status: rendered.statusCode,
    headers: HTML_HEADERS,
  });
}

export async function GET(request: Request) {
  return installResponse(request);
}

export async function HEAD(request: Request) {
  return installResponse(request, false);
}

export async function POST(request: Request) {
  return installResponse(request);
}

export async function PUT(request: Request) {
  return installResponse(request);
}

export async function PATCH(request: Request) {
  return installResponse(request);
}

export async function DELETE(request: Request) {
  return installResponse(request);
}

export async function OPTIONS(request: Request) {
  return installResponse(request, false);
}
