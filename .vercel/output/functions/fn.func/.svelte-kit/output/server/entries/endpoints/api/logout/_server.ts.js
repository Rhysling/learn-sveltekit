import { json } from "@sveltejs/kit";
//#region src/routes/api/logout/+server.ts
var POST = async ({ cookies }) => {
	cookies.set("token", "", {
		path: "/",
		maxAge: 0
	});
	return json({ message: "Logged out." });
};
//#endregion
export { POST };
