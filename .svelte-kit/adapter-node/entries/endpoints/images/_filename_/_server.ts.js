import { i as verifyToken } from "../../../../chunks/auth.js";
import { n as getImagePath, t as ensureStorage } from "../../../../chunks/storage.js";
import { error } from "@sveltejs/kit";
import path from "path";
import fs from "fs";
//#region src/routes/images/[filename]/+server.ts
var contentTypes = {
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".gif": "image/gif",
	".webp": "image/webp"
};
function getContentType(filename) {
	return contentTypes[path.extname(filename).toLowerCase()] ?? "application/octet-stream";
}
async function requireAuth(cookies) {
	const token = cookies.get("token");
	if (!token) return null;
	return verifyToken(token);
}
var GET = async ({ params, cookies }) => {
	if (!await requireAuth(cookies)) throw error(401, "Unauthorized");
	const filename = path.basename(params.filename);
	if (!filename) throw error(400, "Invalid filename");
	await ensureStorage();
	const filePath = getImagePath(filename);
	try {
		await fs.promises.access(filePath);
	} catch {
		throw error(404, "Image not found");
	}
	const stream = fs.createReadStream(filePath);
	return new Response(stream, { headers: {
		"Content-Type": getContentType(filename),
		"Content-Disposition": `inline; filename="${filename}"`
	} });
};
//#endregion
export { GET };
