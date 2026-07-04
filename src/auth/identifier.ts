export type AuthIdentifierKind = "email" | "username";

const INTERNAL_AUTH_EMAIL_DOMAIN = "users.invalid";

export function normalizeAuthIdentifier(identifier: string): string {
  return identifier.trim().toLowerCase();
}

export function getAuthIdentifierKind(identifier: string): AuthIdentifierKind {
  return identifier.includes("@") ? "email" : "username";
}

export function isInternalAuthEmail(email: string): boolean {
  return normalizeAuthIdentifier(email).endsWith(`@${INTERNAL_AUTH_EMAIL_DOMAIN}`);
}

export function toAppEmail(email: string): string | null {
  const normalizedEmail = normalizeAuthIdentifier(email);

  return isInternalAuthEmail(normalizedEmail) ? null : normalizedEmail;
}
