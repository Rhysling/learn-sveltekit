import { P as escape_html } from "../../chunks/dev.js";
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, children } = $$props;
		$$renderer.push(`<nav style="padding: 1rem; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; gap: 1rem; align-items: center;"><div><strong>SvelteKit + SQLite + JWT</strong></div> `);
		if (data.user) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div>Logged in as <strong>${escape_html(data.user.email)}</strong> `);
			if (data.user.name) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span>(${escape_html(data.user.name)})</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></nav> `);
		children($$renderer);
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _layout as default };
