import { verifyToken } from '$lib/server/auth';
import type { AuthTokenPayload } from '$lib/types/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('token');
	if (!token) return { user: null };

	const payload = await verifyToken(token);
	if (!payload) return { user: null };

	return {
		user: {
			userId: payload.userId,
			email: payload.email,
			name: payload.name,
			isAdmin: payload.isAdmin
		} satisfies AuthTokenPayload
	};
};
