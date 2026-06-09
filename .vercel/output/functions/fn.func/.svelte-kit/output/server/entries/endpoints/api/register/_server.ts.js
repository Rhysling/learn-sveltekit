import { t as prisma } from "../../../../chunks/db.js";
import { n as hashPassword, t as createToken } from "../../../../chunks/auth.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/register/+server.ts
var POST = async ({ request, cookies }) => {
	const body = await request.json();
	const email = String(body.email ?? "").trim().toLowerCase();
	const password = String(body.password ?? "");
	const name = String(body.name ?? "").trim();
	if (!email || !password || password.length < 6) return json({ error: "Email and password are required. Password must be 6+ chars." }, { status: 400 });
	if (await prisma.user.findUnique({ where: { email } })) return json({ error: "This email is already registered." }, { status: 409 });
	const hashed = await hashPassword(password);
	const user = await prisma.user.create({ data: {
		email,
		password: hashed,
		name: name || void 0
	} });
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
	return json({ message: "Registration succeeded." });
};
//#endregion
export { POST };
