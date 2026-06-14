import type { Handle, HandleServerError } from '@sveltejs/kit';
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

export const handleError: HandleServerError = ({ error, event }) => {
	console.error('[handleErrorFoo]', event.url.pathname, error);
	return { message: 'Something went wrong. Please try again.' };
};