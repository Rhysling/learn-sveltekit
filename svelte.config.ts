import node from '@sveltejs/adapter-node';
import type { UserConfig } from '@sveltejs/kit';

const config: UserConfig = {
  compilerOptions: {
    runes: true
  },
  kit: {
    adapter: node(),
    alias: {
      $lib: './src/lib'
    }
  }
};

export default config;
