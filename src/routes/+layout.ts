import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => ({
	currentPath: url.pathname
});
