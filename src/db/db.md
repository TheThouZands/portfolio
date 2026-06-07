DB files describe the PostgreSQL shape used by the app

schema.ts is the source of truth for table additions, removals, and modifications

after changing it, run db:generate and commit the schema update together with the generated drizzle migration

db:migrate applies those committed migrations to the database
