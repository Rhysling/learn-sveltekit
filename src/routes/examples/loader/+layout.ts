import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const layoutList = ["Layout Item 1", "Layout Item 2", "Layout Item 3"];

	return { layoutList };
};
