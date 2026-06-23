Auth modules contain server-only account and credential behavior.

Keep password hashing, session validation, and future account workflows here so routes and CMS modules can call a small
security-focused surface instead of depending on low-level primitives directly.
