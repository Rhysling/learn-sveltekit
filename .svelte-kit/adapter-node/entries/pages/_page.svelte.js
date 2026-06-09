import "../../chunks/index-server.js";
import { F as escape_html, P as attr, r as ensure_array_like } from "../../chunks/dev.js";
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let email = "";
		let password = "";
		let images = [];
		$$renderer.push(`<div class="card svelte-1uha8ag">`);
		if (data.user) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<h1>Welcome back</h1> <p>You are signed in as <strong>${escape_html(data.user.email)}</strong>.</p> <button class="svelte-1uha8ag">Logout</button> <section style="margin-top: 1.5rem;"><h2>Upload an image</h2> <form><label for="image" class="svelte-1uha8ag">Choose an image</label> <input id="image" type="file" accept="image/*" class="svelte-1uha8ag"/> <button type="submit"${attr("disabled", true, true)} class="svelte-1uha8ag">Upload image</button></form> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></section> <section style="margin-top: 1.5rem;"><h2>Your uploaded images</h2> `);
			if (images.length) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="gallery svelte-1uha8ag"><!--[-->`);
				const each_array = ensure_array_like(images);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let image = each_array[$$index];
					$$renderer.push(`<div class="image-card svelte-1uha8ag"><img${attr("src", image.url)}${attr("alt", image.filename)} class="svelte-1uha8ag"/> <div><a${attr("href", image.url)}${attr("download", image.filename)}>Download</a></div></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<p>No images uploaded yet.</p>`);
			}
			$$renderer.push(`<!--]--></section>`);
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
