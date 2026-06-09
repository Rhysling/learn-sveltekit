import { i as verifyToken } from "../../../chunks/auth.js";
import { redirect } from "@sveltejs/kit";
//#region src/routes/admin/+page.server.ts
var load = async ({ cookies }) => {
	const token = cookies.get("token");
	if (!token) throw redirect(303, "/");
	const payload = await verifyToken(token);
	if (!payload) throw redirect(303, "/");
	return { user: {
		email: payload.email,
		name: payload.name
	} };
};
//#endregion
export { load };
