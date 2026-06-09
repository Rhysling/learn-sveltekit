# Prisma Database Management Guide

## Chat History - June 9, 2026

### User Question
"Explain how to use Prisma to manage the database"

---

## Prisma Database Management in Your SvelteKit Project

Your project uses **Prisma** as an ORM (Object-Relational Mapper) with **SQLite** as the database. Here's how to use it:

### **1. Understanding Your Setup**

Your `prisma/schema.prisma` defines:
- **SQLite database** (lightweight, file-based)
- **User model** with fields: `id`, `email`, `password`, `name`, `createdAt`

Your `src/lib/server/db.ts` provides a **singleton PrismaClient**—a single connection instance reused throughout the app (important for performance).

### **2. Basic CRUD Operations**

Using your db instance in server-side code:

```typescript
import prisma from '$lib/server/db';

// CREATE
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    password: 'hashedPassword',
    name: 'John Doe'
  }
});

// READ
const user = await prisma.user.findUnique({
  where: { email: 'user@example.com' }
});

const allUsers = await prisma.user.findMany();
const filteredUsers = await prisma.user.findMany({
  where: { name: { contains: 'John' } }
});

// UPDATE
const updated = await prisma.user.update({
  where: { id: 'userId' },
  data: { name: 'Jane Doe' }
});

// DELETE
await prisma.user.delete({
  where: { id: 'userId' }
});
```

### **3. Managing the Database Schema**

When you modify `schema.prisma`:

```bash
# Create a migration and apply it
npm run migrate

# Generate updated Prisma Client types
npm run generate
```

Example: Adding a `Media` model to your schema:

```prisma
model Media {
  id        String   @id @default(cuid())
  filename  String
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}
```

Then run `npm run migrate` to create the database migration.

### **4. Key Prisma Commands**

```bash
prisma studio          # Open interactive database browser
prisma db push         # Sync schema with database (dev only)
prisma format          # Format schema.prisma
prisma validate        # Check schema for errors
```

### **5. Best Practices for Your App**

✅ **Use the singleton pattern** (already done in `db.ts`)—don't create multiple PrismaClient instances

✅ **Always use it in server-only code** (routes, API handlers, server-side logic)

✅ **Use transactions for multi-step operations**:
```typescript
await prisma.$transaction([
  prisma.user.create({ data: {...} }),
  prisma.media.create({ data: {...} })
]);
```

✅ **Handle errors gracefully**:
```typescript
try {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: 'userId' }
  });
} catch (error) {
  // Handle not found
}
```

### **6. Type Safety**

Prisma auto-generates TypeScript types. Import them as needed:
```typescript
import type { User, Media } from '@prisma/client';

const user: User = await prisma.user.findUnique({...});
```

Your `src/lib/types/` folder is where you can define custom types extending Prisma models.
