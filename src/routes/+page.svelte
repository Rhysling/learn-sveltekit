<script lang="ts">
	import type { RouteData } from "$lib/types/auth";
	let { data } = $props() as { data: RouteData };
</script>

<div class="card">
	<header class="hero">
		<h1>SvelteKit Tutorial Collection</h1>
		<p class="tagline">
			Interactive, hands-on guides to building full-stack apps with SvelteKit.
		</p>
		{#if data.user}
			<p class="signed-in">Signed in as <strong>{data.user.email}</strong></p>
		{/if}
	</header>

	<section class="links">
		<h2>Start learning</h2>
		<ul>
			<li>
				<a href="/tutorials">
					<strong>SvelteKit and Related Tutorials</strong>
				</a>
				<span class="desc"
					>This is the list of tutorials available for learning SvelteKit and
					related technologies.</span
				>
			</li>
			<li>
				<a href="/examples">
					<strong>Examples</strong>
				</a>
				<span class="desc">Interactive tutorials and example projects.</span>
			</li>
			<li>
				<a href="/admin">
					<strong>Admin Dashboard</strong>
				</a>
				<span class="desc"
					>A protected admin interface for managing the application.</span
				>
			</li>
		</ul>
		<p class="placeholder">More tutorial sequences will be added here soon.</p>
	</section>
</div>

<style>
	.card {
		max-width: 680px;
		margin: 3rem auto;
		padding: 2rem 2.25rem;
		border: 1px solid #e5e7eb;
		border-radius: 16px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
		background: #fff;
	}

	.hero {
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid #f0f0f0;
	}

	.hero h1 {
		margin-bottom: 0.5rem;
	}

	.tagline {
		color: #4b5563;
		font-size: 1rem;
		margin-top: 0.25rem;
	}

	.signed-in {
		margin-top: 0.75rem;
		font-size: 0.9rem;
		color: #6b7280;
	}

	.links h2 {
		margin-bottom: 1rem;
	}

	.links ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.links li {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.desc {
		font-size: 0.9rem;
		color: #4b5563;
	}

	.placeholder {
		margin-top: 1.25rem;
		font-size: 0.875rem;
		font-style: italic;
		color: #9ca3af;
	}

	a {
		color: #2563eb;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
