# Prisma Relations & Migrations — Lesson Delivered

The user received lesson 9 covering: one-to-many relations in Prisma (virtual vs real fields, `@relation` directive, back-relations), optional vs required relations for existing data, the migration workflow (`migrate dev`, `migrate reset`, `db push`, `migrate deploy`), database seeding with `upsert` for idempotency, querying relations with `include` vs `select` (and the security trap of including sensitive fields), nested writes (`connect`, `create`), and the dev singleton pattern in `db.ts`.

**Key exercises assigned**: (1) Add a Note → User relation and run a migration, (2) Write and run a seed script, (3) Update the notes page to show author names and set authorId on create. Completion of these exercises will confirm operational understanding of schema evolution and relational queries in a SvelteKit context.

**Implications**: Once exercises are complete, the user will have a working relational data model. This unlocks future lessons on pagination, transactions, many-to-many relations, and the SQLite → PostgreSQL migration path.
