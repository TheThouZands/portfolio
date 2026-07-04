# Neon operational SQL

SQL files in this directory are manual database operations. They are intentionally
kept outside `drizzle/` so they are not applied by normal branch migrations or by
the Vercel build pipeline.

Apply these only to the production Neon branch, or to a long-lived staging branch
that should share the same operational behavior. Preview and local branches can
usually skip them.

Before applying `cleanup-expired-auth-sessions.sql`, configure the Neon compute
endpoint for `pg_cron` by setting `cron.database_name` to the application
database, then restart the compute. The job only runs while the compute is
active.
