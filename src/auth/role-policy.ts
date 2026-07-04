export const AUTH_ROLES = ["reader", "moderator", "owner"] as const;

export type AuthRole = (typeof AUTH_ROLES)[number];

const AUTH_ROLE_RANK = {
  reader: 0,
  moderator: 1,
  owner: 2,
} satisfies Record<AuthRole, number>;

export function isAuthRole(role: unknown): role is AuthRole {
  return typeof role === "string" && AUTH_ROLES.includes(role as AuthRole);
}

export function normalizeAuthRole(role: unknown): AuthRole {
  return isAuthRole(role) ? role : "reader";
}

export function authRoleMeetsMinimum(role: AuthRole, minimumRole: AuthRole) {
  return AUTH_ROLE_RANK[role] >= AUTH_ROLE_RANK[minimumRole];
}

export function canModerate(role: AuthRole) {
  return authRoleMeetsMinimum(role, "moderator");
}

export function canOwn(role: AuthRole) {
  return authRoleMeetsMinimum(role, "owner");
}
