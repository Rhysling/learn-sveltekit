// @ts-nocheck
import { verifyToken } from '$lib/server/auth';
import type { RouteData, SessionUser } from '$lib/types/auth';
import type { PageServerLoad } from './$types';

export const load = async ({ cookies }: Parameters<PageServerLoad>[0]) => {
  const token = cookies.get('token');
  if (!token) {
    return { user: null };
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return { user: null };
  }

  const user: SessionUser = {
    email: payload.email,
    name: payload.name
  };

  return {
    user
  } satisfies RouteData;
};
