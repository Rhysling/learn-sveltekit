import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RouteData, SessionUser } from '$lib/types/auth';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(303, '/');

	return { user: locals.user as SessionUser } as RouteData;
};
