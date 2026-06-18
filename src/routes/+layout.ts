import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ data, url }) => ({
	...data,
	currentPath: url.pathname
});
