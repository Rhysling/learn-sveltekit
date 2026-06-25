<script lang="ts">
	import type { PageProps } from "./$types";
	let { data }: PageProps = $props();
</script>

<div class="card">
	<header class="hero">
		<h1>SvelteKit Tutorial Collection</h1>
		<p class="tagline">
			{data.currentPage?.description || "Description missing."}
		</p>
		{#if data.user}
			<p class="signed-in">Signed in as <strong>{data.user.email}</strong></p>
		{/if}
	</header>

	<section class="links">
		<h2>Start learning</h2>
		<ul>
			{#each data.currentPage?.children ?? [] as c}
				<li>
					<a href={c.path}>
						<strong>{c.title}</strong>
					</a>
					<span class="desc">{c.description}</span>
				</li>
			{/each}
		</ul>
		<p class="placeholder">More tutorial sequences will be added here.</p>
	</section>
</div>

<style>
	.hero {
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid #f0f0f0;
	}

	.hero h1 {
		margin-bottom: 0.5rem;
	}

	.tagline {
		color: var(--text-secondary);
		font-size: 1rem;
		margin-top: 0.25rem;
	}

	.signed-in {
		margin-top: 0.75rem;
		font-size: 0.9rem;
		color: var(--text-secondary);
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
</style>
