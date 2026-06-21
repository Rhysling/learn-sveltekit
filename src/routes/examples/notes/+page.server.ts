import prisma from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) throw redirect(303, `/login?redirectTo=${encodeURIComponent(url.pathname)}`);

	return {
		notes: await prisma.note.findMany()
	}
};

export const actions: Actions = {
	add: async ({ request }) => {
		const data = await request.formData();
		const body = String(data.get('body') ?? '').trim();

		// Validation: return errors without throwing
		if (!body) {
			return fail(400, { error: 'Note body is required.', body });
		}

		await prisma.note.create({ data: { body } });
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));

		if (!id) return fail(400, { error: 'Invalid note id.' });

		await prisma.note.delete({ where: { id } });
	}
};