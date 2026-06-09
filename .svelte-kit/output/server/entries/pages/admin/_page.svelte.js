import "../../../chunks/index-server.js";
import { F as escape_html, P as attr, r as ensure_array_like } from "../../../chunks/dev.js";
//#region src/routes/admin/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let images = [];
		$$renderer.push(`<div class="card svelte-1jef3w8"><h1>Admin Dashboard</h1> <p>Welcome back, <strong>${escape_html(data.user.email)}</strong>.</p> <section style="margin-top: 1.5rem;"><h2>Upload an image</h2> <form><label for="image" class="svelte-1jef3w8">Choose an image</label> <input id="image" type="file" accept="image/*" class="svelte-1jef3w8"/> <button type="submit"${attr("disabled", true, true)} class="svelte-1jef3w8">Upload image</button></form> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></section> <section style="margin-top: 1.5rem;"><h2>Uploaded images</h2> `);
		if (images.length) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="gallery svelte-1jef3w8"><!--[-->`);
			const each_array = ensure_array_like(images);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let image = each_array[$$index];
				$$renderer.push(`<div class="image-card svelte-1jef3w8"><img${attr("src", image.url)}${attr("alt", image.filename)} class="svelte-1jef3w8"/> <div><a${attr("href", image.url)}${attr("download", image.filename)}>Download</a></div></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<p>No images uploaded yet.</p>`);
		}
		$$renderer.push(`<!--]--></section></div>`);
	});
}
//#endregion
export { _page as default };
