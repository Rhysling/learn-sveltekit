import { i as verifyToken } from "../../chunks/auth.js";
//#region src/routes/+page.server.ts
var load = async ({ cookies }) => {
	const token = cookies.get("token");
	if (!token) return { user: null };
	const payload = await verifyToken(token);
	if (!payload) return { user: null };
	return { user: {
		email: payload.email,
		name: payload.name
	} };
};
//#endregion
export { load };
