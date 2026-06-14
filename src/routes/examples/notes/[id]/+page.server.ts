import { error } from '@sveltejs/kit';
import prisma from '$lib/server/db';

export const load = async ({ params }) => {
	const note = await prisma.note.findUnique({
		where: { id: Number(params.id) }
	});

	if (!note) {
		error(404, 'Note not found');  // throws — stops execution
	}

	return { note };
};