import { t as prisma } from "../../../../chunks/db.js";
import { r as verifyPassword, t as createToken } from "../../../../chunks/auth.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/login/+server.ts
var POST = async ({ request, cookies }) => {
	const body = await request.json();
	const email = String(body.email ?? "").trim().toLowerCase();
	const password = String(body.password ?? "");
	if (!email || !password) return json({ error: "Email and password are required." }, { status: 400 });
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) return json({ error: "Invalid credentials." }, { status: 401 });
	if (!await verifyPassword(password, user.password)) return json({ error: "Invalid credentials." }, { status: 401 });
	const token = await createToken({
		userId: user.id,
		email: user.email,
		name: user.name ?? void 0
	});
	cookies.set("token", token, {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		maxAge: 3600 * 24 * 7
	});
	return json({ message: "Login succeeded." });
};
//#endregion
export { POST };
