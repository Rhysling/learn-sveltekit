<script lang="ts">
	import type { PageProps } from "./$types";
	let { data }: PageProps = $props();
</script>

<div class="card">
	<h1>{data.currentPage?.title || "Title Missing"}</h1>
	<p>
		{data.currentPage?.description || "Description Missing"}
	</p>

	{#each data.currentPage?.children ?? [] as c}
		<section>
			<h2>
				<a href={c.path}>{c.title}</a>
			</h2>
			<p>
				{c.description}
			</p>
		</section>
	{/each}
</div>

<style>
	h1 {
		margin-bottom: 1rem;

		& + p {
			margin-bottom: 1rem;
		}
	}

	section + section {
		margin-top: 1.75rem;
	}
</style>
