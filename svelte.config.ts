import node from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess';
import type { UserConfig } from '@sveltejs/kit';

const config: UserConfig = {
	preprocess: sveltePreprocess({
		scss: {
			includePaths: ['src']
		}
	}),
	compilerOptions: {
		runes: true
	},
	kit: {
		adapter: node(),
		alias: {
			$lib: './src/lib',
			$components: './src/components',
		}
	}
};

export default config;
