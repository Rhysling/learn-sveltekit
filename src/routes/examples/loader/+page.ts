import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
	const pageList = ["Page Item 1", "Page Item 2", "Page Item 3"];

	return { ...data, pageList };
};
