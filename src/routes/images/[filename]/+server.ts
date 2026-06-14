import { error, type RequestHandler, type Cookies } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { ensureStorage, getImagePath } from '$lib/server/storage';
import { verifyToken } from '$lib/server/auth';

const contentTypes: Record<string, string> = {
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.webp': 'image/webp'
};

function getContentType(filename: string) {
	return contentTypes[path.extname(filename).toLowerCase()] ?? 'application/octet-stream';
}

async function requireAuth(cookies: Cookies) {
	const token = cookies.get('token');
	if (!token) {
		return null;
	}

	return verifyToken(token);
}

export const GET: RequestHandler = async ({ params, cookies }) => {
	const user = await requireAuth(cookies);
	if (!user) {
		throw error(401, 'Unauthorized');
	}

	const filename = path.basename(params.filename || '');
	if (!filename) {
		throw error(400, 'Invalid filename');
	}

	await ensureStorage();
	const filePath = getImagePath(filename);

	try {
		await fs.promises.access(filePath);
	} catch {
		throw error(404, 'Image not found');
	}

	const fileData = await fs.promises.readFile(filePath);
	return new Response(fileData, {
		headers: {
			'Content-Type': getContentType(filename),
			'Content-Disposition': `inline; filename="${filename}"`
		}
	});
};
