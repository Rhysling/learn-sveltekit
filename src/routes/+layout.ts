import type { LayoutLoad } from './$types';
import { findPage } from "$lib/context/site-tree";

export const load: LayoutLoad = ({ data, url }) => ({
	...data,
	currentPath: url.pathname,
	currentPage: findPage(url.pathname)
});
