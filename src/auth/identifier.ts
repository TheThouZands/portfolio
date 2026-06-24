export type AuthIdentifierKind = "email" | "username";

export function normalizeAuthIdentifier(identifier: string): string {
  return identifier.trim().toLowerCase();
}

export function getAuthIdentifierKind(identifier: string): AuthIdentifierKind {
  return identifier.includes("@") ? "email" : "username";
}
