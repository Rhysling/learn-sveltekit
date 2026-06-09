import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/server/db';
import { createToken, hashPassword } from '$lib/server/auth';
import type { RegisterRequestBody, AuthResponse } from '$lib/types/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const body = (await request.json()) as RegisterRequestBody;
	const email = String(body.email ?? '').trim().toLowerCase();
	const password = String(body.password ?? '');
	const name = String(body.name ?? '').trim();

	if (!email || !password || password.length < 6) {
		return json({ error: 'Email and password are required. Password must be 6+ chars.' }, { status: 400 });
	}

	const existing = await prisma.user.findUnique({ where: { email } });
	if (existing) {
		return json({ error: 'This email is already registered.' }, { status: 409 });
	}

	const hashed = await hashPassword(password);
	const user = await prisma.user.create({ data: { email, password: hashed, name: name || undefined } });
	const token = await createToken({ userId: user.id, email: user.email, name: user.name ?? undefined });

	cookies.set('token', token, {
		httpOnly: true,
		path: '/',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7
	});

	return json({ message: 'Registration succeeded.' } as AuthResponse);
};
