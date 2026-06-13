import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import type { AuthTokenPayload } from '$lib/types/auth';
import { JWT_SECRET } from '$env/static/private';

const jwtSecret = new TextEncoder().encode(JWT_SECRET);

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
		if (typeof payload.sub !== 'string' || typeof payload.email !== 'string') {
			return null;
		}
		return {
			userId: payload.sub,
			email: payload.email,
			name: typeof payload.name === 'string' ? payload.name : undefined
		};
	} catch {
		return null;
	}
}
