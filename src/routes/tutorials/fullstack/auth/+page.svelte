<div class="section-card">
	<h1>Authentication Flow</h1>

	<section>
		<p>
			This app uses JWT tokens stored in an HttpOnly cookie to keep
			authentication state safe on the server and browser.
		</p>
	</section>

	<section>
		<h2>Token helpers</h2>
		<pre><code
				>{`import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET ?? "dev-secret");

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createToken(payload: { userId: string; email: string; name?: string; }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(jwtSecret);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, jwtSecret);
  return payload;
}`}</code
			></pre>
	</section>

	<section>
		<h2>Login endpoint</h2>
		<pre><code
				>{`import { json, type RequestHandler } from "@sveltejs/kit";
import prisma from "$lib/server/db";
import { createToken, verifyPassword } from "$lib/server/auth";

export const POST: RequestHandler = async ({ request, cookies }) => {
  const body = await request.json();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (!email || !password) {
    return json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return json({ error: "Invalid credentials." }, { status: 401 });

  const valid = await verifyPassword(password, user.password);
  if (!valid) return json({ error: "Invalid credentials." }, { status: 401 });

  const token = await createToken({ userId: user.id, email: user.email, name: user.name ?? undefined });
  cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7
  });

  return json({ message: "Login succeeded." });
};`}</code
			></pre>
	</section>

	<section>
		<h2>What to remember</h2>
		<p>
			Use server-only code for secrets and token verification. Keep browser
			state simple by using one auth cookie and server-loaded user context.
		</p>
	</section>
</div>

<style>
	.section-card {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 16px;
		padding: 2rem;
		box-shadow: 0 14px 40px rgba(15, 23, 42, 0.05);
	}

	section + section {
		margin-top: 1.75rem;
	}

	pre {
		background: #111827;
		color: #f9fafb;
		padding: 1rem;
		border-radius: 0.75rem;
		overflow-x: auto;
	}
</style>
