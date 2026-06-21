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
	if (!user) {
		return json({ error: 'Invalid credentials.' }, { status: 401 });
	}

	const valid = await verifyPassword(password, user.password);
	if (!valid) {
		return json({ error: 'Invalid credentials.' }, { status: 401 });
	}

	await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

	const token = await createToken({ userId: user.id, email: user.email, name: user.name ?? undefined, isAdmin: user.isAdmin });
	cookies.set('token', token, {
		httpOnly: true,
		path: '/',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7
	});

	return json({ message: 'Login succeeded.' } as AuthResponse);
};
