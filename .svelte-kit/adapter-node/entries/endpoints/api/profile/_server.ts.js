import { i as verifyToken } from "../../../../chunks/auth.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/profile/+server.ts
var GET = async ({ cookies }) => {
	const token = cookies.get("token");
	if (!token) return json({ error: "Unauthorized" }, { status: 401 });
	const payload = await verifyToken(token);
	if (!payload) return json({ error: "Unauthorized" }, { status: 401 });
	return json({
		email: payload.email,
		name: payload.name
	});
};
//#endregion
export { GET };
