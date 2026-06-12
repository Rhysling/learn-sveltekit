import type { Handle } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	// pre-processing: runs before the load function

	const token = event.cookies.get('token');
	event.locals.user = token ? await verifyToken(token) : null;

	//console.log(`user:`, event.locals.user);

	const response = await resolve(event);

	// post-processing: runs after the load function
	return response;
};