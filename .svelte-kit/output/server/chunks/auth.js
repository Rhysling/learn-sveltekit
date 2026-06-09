import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
//#region src/lib/server/auth.ts
var secret = process.env.JWT_SECRET ?? "dev-secret";
var jwtSecret = new TextEncoder().encode(secret);
async function hashPassword(password) {
	return bcrypt.hash(password, 10);
}
async function verifyPassword(password, hash) {
	return bcrypt.compare(password, hash);
}
async function createToken(user) {
	return new SignJWT({
		email: user.email,
		name: user.name,
		sub: user.userId
	}).setProtectedHeader({ alg: "HS256" }).setExpirationTime("7d").sign(jwtSecret);
}
async function verifyToken(token) {
	try {
		const { payload } = await jwtVerify(token, jwtSecret);
		if (typeof payload.sub !== "string" || typeof payload.email !== "string") return null;
		return {
			userId: payload.sub,
			email: payload.email,
			name: typeof payload.name === "string" ? payload.name : void 0
		};
	} catch {
		return null;
	}
}
//#endregion
export { verifyToken as i, hashPassword as n, verifyPassword as r, createToken as t };
