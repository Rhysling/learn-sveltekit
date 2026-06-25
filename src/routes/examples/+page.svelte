<script lang="ts">
	import type { PageProps } from "./$types";
	let { data }: PageProps = $props();
</script>

<div class="card">
	<h1>{data.currentPage?.title || "Title Missing"}</h1>
	<p>{data.currentPage?.description || "Description Missing"}</p>

	<section class="links">
		<h2>Available examples</h2>
		<ul>
			{#each data.currentPage?.children ?? [] as c}
				<li><a href={c.path}>{c.title}</a></li>
			{/each}
		</ul>
		<p class="placeholder">More examples are coming soon.</p>
	</section>
</div>

<style>
	h1 {
		margin-bottom: 1rem;

		& + p {
			margin-bottom: 1rem;
		}
	}

	.links ul {
		list-style: disc inside;
		padding-left: 0;
	}

	.links li {
		margin: 0.75rem 0;
	}
</style>
