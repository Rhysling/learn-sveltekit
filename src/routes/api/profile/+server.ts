import { json, type RequestHandler } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/auth';

export const GET: RequestHandler = async ({ cookies }) => {
  const token = cookies.get('token');
  if (!token) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  return json({ email: payload.email, name: payload.name });
};
