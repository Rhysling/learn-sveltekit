#!/bin/sh

# One-time fix: add missing columns to production User table.
# Each ALTER TABLE will silently fail if the column already exists.
# Remove this block after the first successful deploy.
DB_PATH=$(echo "$DATABASE_URL" | sed 's|^file:||')
node -e "
  const Database = require('better-sqlite3');
  const db = new Database('$DB_PATH');
  const cols = [
    'ALTER TABLE User ADD COLUMN lastLoginAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP',
    'ALTER TABLE User ADD COLUMN isAdmin BOOLEAN NOT NULL DEFAULT 0',
    'ALTER TABLE User ADD COLUMN isDisabled BOOLEAN NOT NULL DEFAULT 0'
  ];
  for (const sql of cols) {
    try { db.exec(sql); console.log('Applied:', sql); }
    catch (e) { console.log('Skipped (already exists):', sql); }
  }
  db.close();
"

npx prisma migrate deploy && node build
