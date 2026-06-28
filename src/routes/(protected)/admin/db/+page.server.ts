import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';
import { listDbs, backupDb, restoreDb, deleteDb } from '$lib/server/storage';
import { stringSortFn } from "$lib/utils";

const mainDbName = (env.DATABASE_URL ?? '').replace(/^file:.*\//, '');

export const load: PageServerLoad = async () => {
	const dbNames = (await listDbs()).sort((a, b) => -stringSortFn(a, b));

	return { dbNames, mainDbName };
};

export const actions: Actions = {
	backup: async ({ request }) => {
		const data = await request.formData();
		const dbName = (data.get('dbName') || '') as string;
		if (!dbName) return fail(400, { error: 'DB name is missing.' });

		try {
			backupDb(dbName);
		} catch {
			return fail(500, { error: 'Backup failed.' });
		}
	},

	restore: async ({ request }) => {
		const data = await request.formData();
		const dbName = (data.get('dbName') || '') as string;
		if (!dbName) return fail(400, { error: 'DB name is missing.' });
		if (!dbName.includes('_')) return fail(400, { error: 'Cannot restore the main database over itself.' });

		try {
			await restoreDb(dbName, mainDbName);
		} catch {
			return fail(500, { error: 'Restore failed.' });
		}
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const dbName = (data.get('dbName') || '') as string;
		if (!dbName) return fail(400, { error: 'DB name is missing.' });
		if (!dbName.includes('_')) return fail(400, { error: 'Cannot delete the main database.' });

		try {
			await deleteDb(dbName);
		} catch {
			return fail(500, { error: 'Delete failed.' });
		}
	},
};