import { verifyToken } from '$lib/server/auth';
import type { RouteData, AuthTokenPayload } from '$lib/types/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, url }) => {
	const redirectTo = url.searchParams.get('redirectTo') ?? '/';

	const token = cookies.get('token');
	if (!token) {
		return { user: null, redirectTo };
	}

	const payload = await verifyToken(token);
	if (!payload) {
		return { user: null, redirectTo };
	}

	const user: AuthTokenPayload = {
		userId: payload.userId,
		email: payload.email,
		name: payload.name,
		isAdmin: payload.isAdmin
	};

	return {
		user,
		redirectTo
	} satisfies RouteData;
};
