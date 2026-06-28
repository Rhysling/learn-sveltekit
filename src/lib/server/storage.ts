import { env } from "$env/dynamic/private";
import { dev } from "$app/environment";

import Database from 'better-sqlite3';
import fs from 'fs/promises';
import path from 'path';

const imgPath = env.IMAGE_STORAGE_PATH ?? (dev ? "./uploads" : "/data/uploads");
const dbPath = env.DB_STORAGE_PATH ?? (dev ? "./prisma" : "/data");

export async function ensureStorage() {
	await fs.mkdir(imgPath, { recursive: true });
	return imgPath;
}

export function getImagePath(filename: string) {
	return path.join(imgPath, filename);
}

export function getDbPath(filename: string) {
	return path.join(dbPath, filename);
}

export async function listImages() {
	await ensureStorage();
	const items = await fs.readdir(imgPath);
	return items.filter((name) => !name.startsWith('.'));
}

export async function listDbs() {
	const items = await fs.readdir(dbPath);
	return items.filter((name) => name.endsWith('.db'));
}

export function backupDb(sourceDbName: string): string {
	const nameNoExt = sourceDbName.replace(/\.db$/, '');
	const now = new Date();
	const ts = now.toISOString().slice(0, 19).replace(/T/, '_').replace(/:/g, '-');
	const backupName = `${nameNoExt}_${ts}.db`;

	const sourcePath = path.join(dbPath, sourceDbName);
	const backupPath = path.join(dbPath, backupName);

	const db = new Database(sourcePath, { readonly: true });
	db.exec(`VACUUM INTO '${backupPath.replace(/\\/g, '/')}'`);
	db.close();

	return backupName;
}

export async function restoreDb(backupName: string, mainDbName: string) {
	backupDb(mainDbName);
	await fs.copyFile(path.join(dbPath, backupName), path.join(dbPath, mainDbName));
}

export async function deleteDb(dbName: string) {
	await fs.unlink(path.join(dbPath, dbName));
}

export async function uploadDb(mainDbName: string, fileBuffer: Buffer) {
	backupDb(mainDbName);
	await fs.writeFile(path.join(dbPath, mainDbName), fileBuffer);
}