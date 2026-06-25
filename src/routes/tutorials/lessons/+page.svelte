<div class="card">
	<h1>Stand-Alone Lessons</h1>
	<p>
		Individual lessons covering SvelteKit concepts. Each lesson is self-contained
		with explanations, code examples, and a quiz.
	</p>

	<ol class="lesson-list">
		<li>
			<a href="/lessons/0001-form-actions.html">Form Actions</a>
			<span class="desc">The idiomatic way to handle form submissions and server-side mutations.</span>
		</li>
		<li>
			<a href="/lessons/0002-hooks-server.html">hooks.server.ts &mdash; Centralized Middleware</a>
			<span class="desc">Run logic on every request: auth checks, logging, redirects.</span>
		</li>
		<li>
			<a href="/lessons/0003-svelte5-runes.html">Svelte 5 Runes: $state, $derived, $effect</a>
			<span class="desc">The new reactivity primitives that replace stores and reactive statements.</span>
		</li>
		<li>
			<a href="/lessons/0004-layout-load-protected-routes.html">Layout Load Functions &amp; Protected Routes</a>
			<span class="desc">Share data across pages and guard routes with layout-level load functions.</span>
		</li>
		<li>
			<a href="/lessons/0005-error-handling.html">Error Handling in SvelteKit</a>
			<span class="desc">Expected vs. unexpected errors, error pages, and the error boundary system.</span>
		</li>
		<li>
			<a href="/lessons/0006-invalidate.html">invalidate &mdash; On-Demand Data Refresh</a>
			<span class="desc">Re-run load functions without a full page reload.</span>
		</li>
		<li>
			<a href="/lessons/0007-deployment.html">Deploying a SvelteKit App to Production</a>
			<span class="desc">Adapters, Docker, Fly.io, and production configuration.</span>
		</li>
		<li>
			<a href="/lessons/0008-stores-context-shared-state.html">Shared State &amp; the Context API</a>
			<span class="desc">Patterns for sharing state across components without prop drilling.</span>
		</li>
		<li>
			<a href="/lessons/0009-prisma-relations-migrations.html">Prisma Relations &amp; Migrations</a>
			<span class="desc">Model relationships, migration workflow, and querying related data.</span>
		</li>
		<li>
			<a href="/lessons/0010-environment-variables.html">Environment Variables &amp; Config</a>
			<span class="desc">Public vs. private env vars, .env files, and runtime configuration.</span>
		</li>
	</ol>
</div>

<style>
	h1 {
		margin-bottom: 1rem;
	}

	.lesson-list {
		margin-top: 1.5rem;
		padding-left: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.lesson-list li {
		line-height: 1.5;
	}

	.lesson-list a {
		font-weight: 600;
	}

	.desc {
		display: block;
		margin-top: 0.15rem;
	}
</style>
