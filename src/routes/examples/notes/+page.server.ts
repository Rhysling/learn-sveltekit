import prisma from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		notes: await prisma.note.findMany()
	}
};

export const actions: Actions = {
	// The 'default' action handles a plain POST to this page
	default: async ({ request }) => {
		const data = await request.formData();
		const body = String(data.get('body') ?? '').trim();

		// Validation: return errors without throwing
		if (!body) {
			return fail(400, { error: 'Note body is required.', body });
		}

		await prisma.note.create({ data: { body } });

		// Returning nothing re-runs the load function automatically
	}
};
//{ data: { body } }