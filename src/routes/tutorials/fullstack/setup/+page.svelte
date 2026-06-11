<div class="section-card">
	<h1>Setup and Configuration</h1>

	<section>
		<h2>Why SvelteKit?</h2>
		<p>
			SvelteKit extends Svelte into a full-stack framework. It adds filesystem
			routing, server-only modules, API endpoints, and adapter-based deployment.
		</p>
		<p>
			This tutorial uses a Node adapter and SQLite so you can build a local app
			with persistent storage and deploy it to Fly.io later.
		</p>
	</section>

	<section>
		<h2>Dependencies</h2>
		<p>The starter app relies on these dependencies:</p>
		<pre><code
				>{`{
  "devDependencies": {
    "@sveltejs/adapter-node": "^3.0.0",
    "@sveltejs/kit": "^2.64.0",
    "@types/node": "^20.0.0",
    "prisma": "^5.15.0",
    "svelte": "^5.0.0",
    "typescript": "^5.5.0"
  },
  "dependencies": {
    "@prisma/client": "^5.15.0",
    "bcryptjs": "^2.4.3",
    "jose": "^5.1.0"
  }
}`}</code
			></pre>
	</section>

	<section>
		<h2>`svelte.config.ts`</h2>
		<p>
			Here is the config that makes this app a Node server with SvelteKit
			aliases.
		</p>
		<pre><code
				>{`import node from '@sveltejs/adapter-node';
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

export default config;`}</code
			></pre>
	</section>

	<section>
		<h2>Project structure</h2>
		<p>Important paths in this app:</p>
		<ul>
			<li><code>src/routes</code> — page and API routes</li>
			<li><code>src/lib/server</code> — shared server helpers</li>
			<li><code>src/lib/types</code> — type definitions</li>
			<li><code>prisma/schema.prisma</code> — database schema</li>
		</ul>
	</section>
</div>

<style>
	.section-card {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 16px;
		padding: 2rem;
		box-shadow: 0 14px 40px rgba(15, 23, 42, 0.05);
	}

	section + section {
		margin-top: 1.75rem;
	}

	pre {
		overflow-x: auto;
		background: #111827;
		color: #f9fafb;
		padding: 1rem;
		border-radius: 0.75rem;
	}
</style>
