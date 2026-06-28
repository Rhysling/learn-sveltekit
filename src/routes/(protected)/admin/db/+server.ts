import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDbPath } from '$lib/server/storage';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';

export const GET: RequestHandler = async ({ url }) => {
	const dbName = url.searchParams.get('file');
	if (!dbName) throw error(400, 'Missing file parameter');

	if (dbName.includes('..') || dbName.includes('/') || dbName.includes('\\'))
		throw error(400, 'Invalid file name');

	const filePath = getDbPath(dbName);

	try {
		await stat(filePath);
	} catch {
		throw error(404, 'File not found');
	}

	const stream = createReadStream(filePath);
	const readable = new ReadableStream({
		start(controller) {
			stream.on('data', (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)));
			stream.on('end', () => controller.close());
			stream.on('error', (err) => controller.error(err));
		},
		cancel() {
			stream.destroy();
		},
	});

	return new Response(readable, {
		headers: {
			'Content-Type': 'application/octet-stream',
			'Content-Disposition': `attachment; filename="${dbName}"`,
		},
	});
};
