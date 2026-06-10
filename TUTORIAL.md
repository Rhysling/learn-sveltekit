# SvelteKit Tutorial: Build a Full-Stack App with SQLite, JWT Auth, and Fly.io

This tutorial shows how to use a SvelteKit starter app to build a real full-stack application. It is designed for developers who already understand Svelte components and want to learn SvelteKit's routing, server-side APIs, and deployment model.

## What you will build

- A SvelteKit app with file-based routes
- User authentication using JWT stored in HttpOnly cookies
- A local SQLite database via Prisma
- Auth-protected image upload and download
- Deployment-ready configuration for Fly.io with persistent storage

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Update `.env` with a secure `JWT_SECRET`.

4. Run the Prisma migration and start the dev server:

```bash
npx prisma migrate dev --name init
npm run dev
```

5. Open the app at `http://localhost:5173`.

## Why SvelteKit?

Svelte gives you a powerful component model. SvelteKit adds the full app framework:

- routing from filesystem paths
- server-side rendering and server-only modules
- API endpoints alongside UI routes
- adapter-based deployment to Node and Fly.io

### Svelte vs SvelteKit: the key differences

| Feature | Svelte | SvelteKit |
|---|---|---|
| Project type | UI components | Full-stack app + routing
| Routing | Manual | File-based `src/routes`
| Server code | Not built in | `+server.ts`, `+page.server.ts`
| Deployment | Static or custom bundler | Adapter-based deployments
| Data loading | Client only | `load()` / server `load` functions

## Project setup

The starter app uses these dependencies:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "start": "node build",
    "sync": "svelte-kit sync",
    "migrate": "prisma migrate dev --name init",
    "generate": "prisma generate"
  },
  "devDependencies": {
    "@sveltejs/adapter-node": "^3.0.0",
    "@sveltejs/kit": "^2.64.0",
    "@types/node": "^20.0.0",
    "prisma": "^5.15.0",
    "svelte": "^5.0.0",
    "typescript": "^5.5.0"
  },
  "dependencies": {
    "@prisma/client": "^5.15.0",
    "bcryptjs": "^2.4.3",
    "jose": "^5.1.0"
  }
}
```

### SvelteKit configuration

`src/svelte.config.ts` configures SvelteKit and chooses the Node adapter:

```ts
import node from '@sveltejs/adapter-node';
import type { UserConfig } from '@sveltejs/kit';

const config: UserConfig = {
  compilerOptions: {
    runes: true
  },
  kit: {
    adapter: node(),
    alias: {
      $lib: './src/lib'
    }
  }
};

export default config;
```

This tells SvelteKit to build a Node server app, which is ideal for Fly.io plus local SQLite persistence.

## File-based routing in SvelteKit

SvelteKit routes are defined by files in `src/routes`.

- `src/routes/+page.svelte` renders the homepage
- `src/routes/+page.server.ts` loads server data for the homepage
- `src/routes/+layout.svelte` wraps all pages
- `src/routes/api/...` defines backend APIs
- `src/routes/admin/+page.svelte` defines a protected admin area

### `+layout.svelte`

The layout file shares UI across all pages and can consume route data:

```svelte
<script lang="ts">
  import type { RouteData } from '$lib/types/auth';
  let { data, children } = $props() as { data: RouteData; children: () => any };
</script>

<nav>
  <div><strong>SvelteKit + SQLite + JWT</strong></div>
  {#if data.user}
    <div>Logged in as <strong>{data.user.email}</strong></div>
    <div><a href="/admin">Admin</a></div>
  {/if}
</nav>

{@render children()}
```

Note how SvelteKit uses `$props()` in runes mode instead of `export let`.

## Server-side data loading

In SvelteKit, page data can come from a server module.

### `src/routes/+page.server.ts`

This file reads the JWT cookie and passes user data to the page:

```ts
import { verifyToken } from '$lib/server/auth';
import type { RouteData, SessionUser } from '$lib/types/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get('token');
  if (!token) return { user: null };

  const payload = await verifyToken(token);
  if (!payload) return { user: null };

  const user: SessionUser = {
    email: payload.email,
    name: payload.name
  };

  return { user } satisfies RouteData;
};
```

This is the key SvelteKit concept: server-only logic that runs before rendering the page.

## Authentication flow

This sample app uses JWTs stored in an HttpOnly cookie.

### `src/lib/server/auth.ts`

This helper module creates and verifies tokens:

```ts
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import type { AuthTokenPayload } from '$lib/types/auth';

const secret = process.env.JWT_SECRET ?? 'dev-secret';
const jwtSecret = new TextEncoder().encode(secret);

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createToken(user: AuthTokenPayload) {
  return new SignJWT({ email: user.email, name: user.name, sub: user.userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(jwtSecret);
}

export async function verifyToken(token: string): Promise<AuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, jwtSecret);
    if (typeof payload.sub !== 'string' || typeof payload.email !== 'string') return null;
    return {
      userId: payload.sub,
      email: payload.email,
      name: typeof payload.name === 'string' ? payload.name : undefined
    };
  } catch {
    return null;
  }
}
```

### Login and registration endpoints

The app defines API routes under `src/routes/api`.

#### `src/routes/api/login/+server.ts`

```ts
import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/server/db';
import { createToken, verifyPassword } from '$lib/server/auth';
import type { LoginRequestBody, AuthResponse } from '$lib/types/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const body = (await request.json()) as LoginRequestBody;
  const email = String(body.email ?? '').trim().toLowerCase();
  const password = String(body.password ?? '');

  if (!email || !password) {
    return json({ error: 'Email and password are required.' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return json({ error: 'Invalid credentials.' }, { status: 401 });

  const valid = await verifyPassword(password, user.password);
  if (!valid) return json({ error: 'Invalid credentials.' }, { status: 401 });

  const token = await createToken({ userId: user.id, email: user.email, name: user.name ?? undefined });
  cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7
  });

  return json({ message: 'Login succeeded.' } as AuthResponse);
};
```

The register endpoint is similar and creates a user before issuing the token.

## SQLite with Prisma

The app uses Prisma to connect to SQLite via `src/lib/server/db.ts`:

```ts
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
```

This pattern avoids multiple Prisma clients in development hot reload mode.

The database URL lives in `.env.example`:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="change-me-to-a-secure-random-string"
IMAGE_STORAGE_PATH="./uploads"
```

In production on Fly, `DATABASE_URL` becomes `file:/data/sqlite.db` and `IMAGE_STORAGE_PATH` becomes `/data/uploads`.

## Image upload and protected downloads

This app includes a protected image-management flow.

### Storage helpers

`src/lib/server/storage.ts` creates and manages the upload folder:

```ts
import fs from 'fs/promises';
import path from 'path';

const storagePath = process.env.IMAGE_STORAGE_PATH ?? (process.env.NODE_ENV === 'production' ? '/data/uploads' : './uploads');

export async function ensureStorage() {
  await fs.mkdir(storagePath, { recursive: true });
  return storagePath;
}

export function getImagePath(filename: string) {
  return path.join(storagePath, filename);
}

export async function listImages() {
  await ensureStorage();
  const items = await fs.readdir(storagePath);
  return items.filter((name) => !name.startsWith('.'));
}
```

### Upload endpoint

`src/routes/api/images/+server.ts` accepts form uploads and returns a list.

```ts
import { json, type RequestHandler } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/auth';
import { ensureStorage, getImagePath, listImages } from '$lib/server/storage';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const allowedExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp']);

async function requireAuth(cookies: Cookies) {
  const token = cookies.get('token');
  if (!token) return null;
  return verifyToken(token);
}

export const GET: RequestHandler = async ({ cookies, url }) => {
  const user = await requireAuth(cookies);
  if (!user) return json({ error: 'Unauthorized' }, { status: 401 });

  const files = await listImages();
  const images = files.map((filename) => ({
    filename,
    url: `${url.origin}/images/${encodeURIComponent(filename)}`
  }));

  return json({ images });
};

export const POST: RequestHandler = async ({ request, cookies, url }) => {
  const user = await requireAuth(cookies);
  if (!user) return json({ error: 'Unauthorized' }, { status: 401 });

  const form = await request.formData();
  const file = form.get('image');
  if (!file || typeof (file as File).name !== 'string') {
    return json({ error: 'A valid image file is required.' }, { status: 400 });
  }

  const uploaded = file as File;
  const extension = path.extname(uploaded.name).toLowerCase();
  if (!allowedExtensions.has(extension)) {
    return json({ error: 'Only PNG, JPG, JPEG, GIF and WEBP images are allowed.' }, { status: 400 });
  }

  const filename = `${crypto.randomUUID()}-${uploaded.name.replace(/\s+/g, '-')}`;
  const destination = getImagePath(filename);
  await ensureStorage();
  await fs.writeFile(destination, Buffer.from(await uploaded.arrayBuffer()));

  return json({ message: 'Image uploaded.', filename, url: `${url.origin}/images/${encodeURIComponent(filename)}` });
};
```

### Protected image download route

This route ensures only authenticated users can fetch stored images:

```ts
import { error, type RequestHandler } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { ensureStorage, getImagePath } from '$lib/server/storage';
import { verifyToken } from '$lib/server/auth';

export const GET: RequestHandler = async ({ params, cookies }) => {
  const token = cookies.get('token');
  if (!token) throw error(401, 'Unauthorized');
  const user = await verifyToken(token);
  if (!user) throw error(401, 'Unauthorized');

  const filename = path.basename(params.filename);
  await ensureStorage();
  const filePath = getImagePath(filename);
  await fs.promises.access(filePath);
  const stream = fs.createReadStream(filePath);
  return new Response(stream, { headers: { 'Content-Type': 'image/png' } });
};
```

## The admin page

The protected admin page lives at `src/routes/admin/+page.svelte` and displays the upload form.

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import type { RouteData } from '$lib/types/auth';
  import type { ImageMetadata } from '$lib/types/media';

  let { data } = $props() as { data: RouteData };
  let selectedFile: File | null = $state(null);
  let images: ImageMetadata[] = $state([]);
  let uploadMessage = $state('');

  async function fetchImages() {
    const response = await fetch('/api/images');
    if (!response.ok) {
      uploadMessage = 'Unable to load images.';
      return;
    }
    images = (await response.json()).images ?? [];
  }

  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    selectedFile = target.files?.[0] ?? null;
    uploadMessage = '';
  }

  async function uploadImage(event: Event) {
    event.preventDefault();
    if (!selectedFile) {
      uploadMessage = 'Select an image first.';
      return;
    }
    const formData = new FormData();
    formData.append('image', selectedFile);
    const response = await fetch('/api/images', { method: 'POST', body: formData });
    const result = await response.json();
    uploadMessage = response.ok ? 'Upload succeeded.' : result.error || 'Upload failed.';
    if (response.ok) {
      selectedFile = null;
      await fetchImages();
    }
  }

  onMount(fetchImages);
</script>
```

The page makes authenticated API calls, so only logged-in users can interact with uploads.

## Fly.io deployment

This sample app is configured for Fly.io using a Dockerfile and `fly.toml`.

### Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
ENV NODE_ENV=production
ENV DATABASE_URL=file:/data/sqlite.db
ENV IMAGE_STORAGE_PATH=/data/uploads
CMD ["sh", "-c", "npx prisma migrate deploy && node build"]
```

### `fly.toml`

```toml
app = "sveltekit-sqlite-jwt"
[build]
  image = "node:20-alpine"
[env]
  DATABASE_URL = "file:/data/sqlite.db"
  IMAGE_STORAGE_PATH = "/data/uploads"
[[mounts]]
  source = "data"
  destination = "/data"
```

This setup ensures the SQLite database and uploaded images are stored in a persistent Fly volume.

## Complete final app tour

Here is how the app is structured, file by file:

- `package.json`
  - defines dev scripts, build scripts, Prisma, SvelteKit, and Node adapter dependencies
- `svelte.config.ts`
  - enables runes mode and selects `@sveltejs/adapter-node`
- `.env.example`
  - shows local SQLite and upload path settings
- `src/lib/server/db.ts`
  - creates a Prisma client for SQLite
- `src/lib/server/auth.ts`
  - handles password hashing and JWT issuance/verification
- `src/lib/server/storage.ts`
  - manages image upload directory creation and file paths
- `src/lib/types/auth.ts`
  - shares auth payload and route data types between client and server
- `src/lib/types/media.ts`
  - defines uploaded image metadata shapes
- `src/routes/+layout.svelte`
  - global layout and navigation
- `src/routes/+page.server.ts`
  - loads authenticated user data from cookies
- `src/routes/+page.svelte`
  - renders login/register UI and the image app state
- `src/routes/api/register/+server.ts`
  - creates users and issues JWT cookies
- `src/routes/api/login/+server.ts`
  - validates credentials and issues JWT cookies
- `src/routes/api/logout/+server.ts`
  - clears auth cookie
- `src/routes/api/images/+server.ts`
  - lists and uploads authenticated image files
- `src/routes/images/[filename]/+server.ts`
  - serves image files only to authenticated users
- `src/routes/admin/+page.server.ts`
  - protects the admin dashboard route
- `src/routes/admin/+page.svelte`
  - provides the file upload UI and image gallery for admins
- `Dockerfile` and `fly.toml`
  - configure production deployment with persistent Fly storage

## Next steps

To continue learning, try:

- adding role-based authorization for admin vs regular users
- switching the database from SQLite to Postgres
- adding image metadata to the database
- deploying the app to Fly.io and testing real uploads

---

This tutorial is one long guide that explains the sample app, includes code snippets, compares Svelte with SvelteKit, and finishes with a complete final app tour.
