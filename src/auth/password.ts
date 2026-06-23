import "server-only";

import * as argon2 from "argon2";

const PASSWORD_HASH_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 64 * 1024,
  timeCost: 3,
  parallelism: 1,
  hashLength: 32,
} as const satisfies argon2.Options;

const PASSWORD_REHASH_OPTIONS = {
  memoryCost: PASSWORD_HASH_OPTIONS.memoryCost,
  timeCost: PASSWORD_HASH_OPTIONS.timeCost,
  parallelism: PASSWORD_HASH_OPTIONS.parallelism,
} as const;

type VerifyPasswordInput = {
  password: string;
  passwordHash: string;
};

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, PASSWORD_HASH_OPTIONS);
}

export async function verifyPassword({
  password,
  passwordHash,
}: VerifyPasswordInput): Promise<boolean> {
  return argon2.verify(passwordHash, password);
}

export function passwordHashNeedsRehash(passwordHash: string): boolean {
  return argon2.needsRehash(passwordHash, PASSWORD_REHASH_OPTIONS);
}
