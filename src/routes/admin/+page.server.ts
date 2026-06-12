import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RouteData, SessionUser } from '$lib/types/auth';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(303, '/');

	const user: SessionUser = {
		email: locals.user.email,
		name: locals.user.name
	};

	return {
		user
	} satisfies RouteData;
};
