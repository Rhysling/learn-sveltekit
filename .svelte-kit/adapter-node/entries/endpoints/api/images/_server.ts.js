import { i as verifyToken } from "../../../../chunks/auth.js";
import { n as getImagePath, r as listImages, t as ensureStorage } from "../../../../chunks/storage.js";
import { json } from "@sveltejs/kit";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
//#region src/routes/api/images/+server.ts
var allowedExtensions = new Set([
	".png",
	".jpg",
	".jpeg",
	".gif",
	".webp"
]);
async function requireAuth(cookies) {
	const token = cookies.get("token");
	if (!token) return null;
	return verifyToken(token);
}
var GET = async ({ cookies, url }) => {
	if (!await requireAuth(cookies)) return json({ error: "Unauthorized" }, { status: 401 });
	return json({ images: (await listImages()).map((filename) => ({
		filename,
		url: `${url.origin}/images/${encodeURIComponent(filename)}`
	})) });
};
var POST = async ({ request, cookies, url }) => {
	if (!await requireAuth(cookies)) return json({ error: "Unauthorized" }, { status: 401 });
	const file = (await request.formData()).get("image");
	if (!file || typeof file.name !== "string" || typeof file.arrayBuffer !== "function") return json({ error: "A valid image file is required." }, { status: 400 });
	const uploaded = file;
	const originalName = path.basename(uploaded.name);
	const extension = path.extname(originalName).toLowerCase();
	if (!allowedExtensions.has(extension)) return json({ error: "Only PNG, JPG, JPEG, GIF and WEBP images are allowed." }, { status: 400 });
	const safeName = originalName.replace(/\s+/g, "-");
	const filename = `${crypto.randomUUID()}-${safeName}`;
	const destination = getImagePath(filename);
	await ensureStorage();
	await fs.writeFile(destination, Buffer.from(await uploaded.arrayBuffer()));
	return json({
		message: "Image uploaded.",
		filename,
		url: `${url.origin}/images/${encodeURIComponent(filename)}`
	});
};
//#endregion
export { GET, POST };
