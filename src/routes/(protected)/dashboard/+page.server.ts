//import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {

	//error(500, 'Test dashboard error')
	//throw new Error('Throw dashboard error');

	return { params };
};