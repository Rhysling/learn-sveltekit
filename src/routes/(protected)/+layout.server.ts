import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (!locals.user)
		redirect(303, `/login?redirectTo=${encodeURIComponent(url.pathname)}`);

	if (!locals.user.isAdmin)
		error(403, `This is Admin Only.`);

	return { currentUser: locals.user };
};