<script lang="ts">
	let segment = $state("example");
	const routePreview = $derived(`/tutorials/fullstack/routing/${segment}`);
</script>

<div class="section-card">
	<h1>File-Based Routing</h1>

	<section>
		<p>
			SvelteKit maps files under <code>src/routes</code> to URLs automatically.
			A file named <code>+page.svelte</code> becomes a rendered page. A folder creates
			a nested route.
		</p>
		<ul>
			<li><code>src/routes/+page.svelte</code> → <code>/</code></li>
			<li>
				<code>src/routes/tutorials/full-stack/+page.svelte</code> →
				<code>/tutorials/full-stack</code>
			</li>
			<li>
				<code>src/routes/tutorials/full-stack/routing/+page.svelte</code> →
				<code>/tutorials/full-stack/routing</code>
			</li>
		</ul>
	</section>

	<section>
		<h2>Interactive route preview</h2>
		<p>Type a segment and see the route URL update immediately.</p>
		<label>
			Route segment:
			<input bind:value={segment} placeholder="example" />
		</label>
		<p class="preview">Preview URL: <code>{routePreview}</code></p>
	</section>

	<section>
		<h2>Dynamic route example</h2>
		<p>
			You can create dynamic route folders with square brackets, for example:
		</p>
		<pre><code>src/routes/tutorials/full-stack/[slug]/+page.svelte</code></pre>
		<p>
			This would render a path like <code
				>/tutorials/full-stack/hello-world</code
			>.
		</p>
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

	label {
		display: block;
		margin-top: 1rem;
	}

	input {
		margin-top: 0.5rem;
		width: 100%;
		max-width: 360px;
		padding: 0.7rem 0.85rem;
		border: 1px solid #d1d5db;
		border-radius: 0.55rem;
	}

	.preview {
		margin-top: 1rem;
		font-weight: 600;
	}

	pre {
		background: #f3f4f6;
		padding: 1rem;
		border-radius: 0.75rem;
	}
</style>
