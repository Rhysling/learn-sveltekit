import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const pageServerList = ["Server Item 1", "Server Item 2", "Server Item 3"];

	return {
		pageServerList
	};
};

export const actions: Actions = {
	add: async ({ request }) => {
		const data = await request.formData();
		const newItem = String(data.get('newItem') ?? '').trim();

		// Validation: return errors without throwing
		if (!newItem) {
			return fail(400, { error: "Form says: Item is required.", newItem });
		}

		console.log('Adding new item:', newItem);
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const newItem = String(data.get('newItem') ?? '').trim();

		if (!newItem) {
			return fail(400, { error: 'Item is required.', newItem });
		}

		console.log('Deleting item:', newItem);
	}
};