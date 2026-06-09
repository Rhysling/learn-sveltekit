import { N as attr, P as escape_html } from "../../chunks/dev.js";
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let email = "";
		let password = "";
		$$renderer.push(`<div class="card svelte-1uha8ag">`);
		if (data.user) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<h1>Welcome back</h1> <p>You are signed in as <strong>${escape_html(data.user.email)}</strong>.</p> <button class="svelte-1uha8ag">Logout</button>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<h1>${escape_html("Login")}</h1> <p>${escape_html("Sign in to continue.")}</p> <form><label for="email" class="svelte-1uha8ag">Email</label> <input id="email" type="email"${attr("value", email)} required="" class="svelte-1uha8ag"/> <label for="password" class="svelte-1uha8ag">Password</label> <input id="password" type="password"${attr("value", password)} required="" minlength="6" class="svelte-1uha8ag"/> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <button type="submit" class="svelte-1uha8ag">${escape_html("Login")}</button></form> <button type="button" class="svelte-1uha8ag">${escape_html("Need an account?")}</button>`);
		}
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
export { _page as default };
