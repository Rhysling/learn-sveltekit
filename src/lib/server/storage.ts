import fs from 'fs/promises';
import path from 'path';

const storagePath = process.env.IMAGE_STORAGE_PATH ?? (process.env.NODE_ENV === 'production' ? '/data/uploads' : './uploads');

export async function ensureStorage() {
	await fs.mkdir(storagePath, { recursive: true });
	return storagePath;
}

export function getImagePath(filename: string) {
	return path.join(storagePath, filename);
}

export async function listImages() {
	await ensureStorage();
	const items = await fs.readdir(storagePath);
	return items.filter((name) => !name.startsWith('.'));
}
