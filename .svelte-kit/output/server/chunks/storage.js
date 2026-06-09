import fs from "fs/promises";
import path from "path";
//#region src/lib/server/storage.ts
var storagePath = process.env.IMAGE_STORAGE_PATH ?? (process.env.NODE_ENV === "production" ? "/data/uploads" : "./uploads");
async function ensureStorage() {
	await fs.mkdir(storagePath, { recursive: true });
	return storagePath;
}
function getImagePath(filename) {
	return path.join(storagePath, filename);
}
async function listImages() {
	await ensureStorage();
	return (await fs.readdir(storagePath)).filter((name) => !name.startsWith("."));
}
//#endregion
export { getImagePath as n, listImages as r, ensureStorage as t };
