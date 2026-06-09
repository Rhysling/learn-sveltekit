import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
  cookies.set('token', '', {
    path: '/',
    maxAge: 0
  });

  return json({ message: 'Logged out.' });
};
