-- Manual Neon production maintenance.
--
-- This is not a Drizzle migration. Apply it deliberately to the production
-- Neon branch once pg_cron is configured for the compute endpoint.

CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.unschedule(jobid)
FROM cron.job
WHERE jobname = 'cleanup-expired-auth-sessions';

SELECT cron.schedule(
  'cleanup-expired-auth-sessions',
  '0 3 * * *',
  $$
    DELETE FROM public."session"
    WHERE "expires_at" < now();
  $$
);
