<div class="section-card">
	<h1>SvelteKit Full-Stack App Tutorial</h1>
	<p>
		This tutorial teaches how to build a complete SvelteKit app with file-based
		routing, server-side data, authentication, and deploy-ready configuration.
	</p>

	<section>
		<h2>What you will build</h2>
		<ul>
			<li>A route-driven SvelteKit tutorial site</li>
			<li>Server-loaded page data with `+page.server.ts`</li>
			<li>JWT authentication and protected UI</li>
			<li>A deployable Node app ready for Fly.io and SQLite persistence</li>
		</ul>
	</section>

	<section>
		<h2>Getting started</h2>
		<ol>
			<li>Install dependencies with <code>npm install</code>.</li>
			<li>Copy <code>.env.example</code> to <code>.env</code>.</li>
			<li>Set a secure <code>JWT_SECRET</code> value.</li>
			<li>Run Prisma and start the dev server:</li>
		</ol>
		<pre><code
				>npx prisma migrate dev --name init
npm run dev</code
			></pre>
		<p>
			Open the app at <strong>http://localhost:5173</strong> and return here to continue
			through the tutorial.
		</p>
	</section>

	<section>
		<h2>How to use this tutorial</h2>
		<p>
			Use the navigation bar above to move between the pages. Each page builds
			on the previous one:
		</p>
		<ul>
			<li>Intro</li>
			<li>Setup</li>
			<li>Routing</li>
			<li>Server data</li>
			<li>Auth</li>
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

	h1 {
		margin-bottom: 1rem;
	}

	section + section {
		margin-top: 1.75rem;
	}

	code {
		background: #f3f4f6;
		padding: 0.15rem 0.35rem;
		border-radius: 0.35rem;
	}
</style>
