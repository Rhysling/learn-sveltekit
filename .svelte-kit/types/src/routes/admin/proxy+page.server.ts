// @ts-nocheck
import { redirect, type PageServerLoad } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/auth';
import type { RouteData, SessionUser } from '$lib/types/auth';

export const load = async ({ cookies }: Parameters<PageServerLoad>[0]) => {
	const token = cookies.get('token');
	if (!token) {
		throw redirect(303, '/');
	}

	const payload = await verifyToken(token);
	if (!payload) {
		throw redirect(303, '/');
	}

	const user: SessionUser = {
		email: payload.email,
		name: payload.name
	};

	return {
		user
	} satisfies RouteData;
};
