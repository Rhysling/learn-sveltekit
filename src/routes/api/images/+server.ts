import { json, type RequestHandler, type Cookies } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/auth';
import { ensureStorage, getImagePath, listImages } from '$lib/server/storage';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const allowedExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp']);

async function requireAuth(cookies: Cookies) {
	const token = cookies.get('token');
	if (!token) {
		return null;
	}

	return verifyToken(token);
}

export const GET: RequestHandler = async ({ cookies, url }) => {
	const user = await requireAuth(cookies);
	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const files = await listImages();
	const images = files.map((filename) => ({
		filename,
		url: `${url.origin}/images/${encodeURIComponent(filename)}`
	}));

	return json({ images });
};

export const POST: RequestHandler = async ({ request, cookies, url }) => {
	const user = await requireAuth(cookies);
	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const form = await request.formData();
	const file = form.get('image');

	if (!file || typeof (file as File).name !== 'string' || typeof (file as File).arrayBuffer !== 'function') {
		return json({ error: 'A valid image file is required.' }, { status: 400 });
	}

	const uploaded = file as File;
	const originalName = path.basename(uploaded.name);
	const extension = path.extname(originalName).toLowerCase();

	if (!allowedExtensions.has(extension)) {
		return json({ error: 'Only PNG, JPG, JPEG, GIF and WEBP images are allowed.' }, { status: 400 });
	}

	const safeName = originalName.replace(/\s+/g, '-');
	const filename = `${crypto.randomUUID()}-${safeName}`;
	const destination = getImagePath(filename);

	try {
		await ensureStorage();
		const buffer = Buffer.from(await uploaded.arrayBuffer());
		await fs.writeFile(destination, buffer);

		return json({ message: 'Image uploaded.', filename, url: `${url.origin}/images/${encodeURIComponent(filename)}` });
	}
	catch (e) {
		const detail = {
			error: e instanceof Error ? e.message : 'Upload failed - not Error instance',
			code: e instanceof Error && 'code' in e ? (e as NodeJS.ErrnoException).code : undefined,
			originalName,
			extension,
			size: uploaded.size,
			destination
		};
		console.error('Image upload failed:', detail);
		return json(detail, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ request, cookies }) => {
	const user = await requireAuth(cookies);
	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const form = await request.formData();
	const filename = form.get('filename') as string;

	const destination = getImagePath(filename);

	await ensureStorage();
	await fs.rm(destination);

	return json({ message: 'Image deleted.', filename });
};
