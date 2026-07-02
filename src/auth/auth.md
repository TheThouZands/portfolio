Auth modules contain server-only account and credential behavior.

Keep password hashing, session validation, and future account workflows here so routes and CMS modules can call a small
security-focused surface instead of depending on low-level primitives directly.

Better Auth reads `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` from the environment. Generate a secret with
`npx auth@latest secret` or `openssl rand -base64 32` before using real accounts.

Auth-owned ids are Postgres UUID columns. Better Auth is configured with `advanced.database.generateId: "uuid"`,
so generated primary keys should come from the database defaults on the Drizzle schema.

The CMS-owned flow keeps username/email decisions in `authIdentities` instead of Better Auth's default user table.
`POST /api/auth/portfolio-auth/resolve-identifier` returns the next auth step for a custom entry UI:

- username identifiers expose existence and route to sign-in or sign-up
- email identifiers route to email OTP without exposing whether the email is already attached to an account

Better Auth's core user row requires an email string. Username-only accounts may use a generated `.invalid` email for
persistence compatibility, but app-facing helpers must expose that as no email. Auth entrypoints should reject generated
placeholder email identifiers before handing a request to Better Auth email-oriented login, OTP, OTL, or verification
helpers.

`emailVerified` belongs to Better Auth and should remain the source of truth for real email verification. Generated
placeholder emails cannot be verified, displayed, or used as login identifiers.

Password endpoints should verify the Argon2id hash here, then ask Better Auth to create and set the session cookie.
