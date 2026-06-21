import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RouteData, AuthTokenPayload } from '$lib/types/auth';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) throw redirect(303, `/login?redirectTo=${encodeURIComponent(url.pathname)}`);

	return { user: locals.user as AuthTokenPayload } as RouteData;
};
