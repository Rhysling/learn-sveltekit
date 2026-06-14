import type { PageLoad } from './$types';
import type { ImageMetadata } from '$lib/types/media';

export const load: PageLoad = async ({ fetch, data }) => {
	const response = await fetch('/api/images');
	const result = await response.json();
	const images: ImageMetadata[] = result.images ?? [];

	return { ...data, images };
};
