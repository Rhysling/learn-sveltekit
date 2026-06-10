import { verifyToken } from '$lib/server/auth';
import type { RouteData, SessionUser } from '$lib/types/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('token');
	if (!token) {
		return { user: null };
	}

	const payload = await verifyToken(token);
	if (!payload) {
		return { user: null };
	}

	const user: SessionUser = {
		email: payload.email,
		name: payload.name
	};

	return {
		user
	} satisfies RouteData;
};
