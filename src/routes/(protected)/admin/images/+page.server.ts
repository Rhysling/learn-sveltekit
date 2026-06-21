import type { PageServerLoad } from './$types';
import type { RouteData, AuthTokenPayload } from '$lib/types/auth';

export const load: PageServerLoad = async ({ locals }) => {

	return { user: locals.user as AuthTokenPayload } as RouteData;
};
