Auth modules contain server-only account and credential behavior.

Keep password hashing, session validation, and future account workflows here so routes and CMS modules can call a small
security-focused surface instead of depending on low-level primitives directly.

Better Auth reads `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` from the environment. Generate a secret with
`npx auth@latest secret` or `openssl rand -base64 32` before using real accounts.
