<script lang="ts">
	import type { PageProps } from "./$types";
	let { data }: PageProps = $props();
</script>

<div class="card">
	<h1>Admin Dashboard</h1>
	<p>Welcome back, {data?.user?.name || "Missing"}!</p>
	<p>Logged in as: {data?.user?.email || "Missing"}</p>
	<p>UserId = {data?.user?.userId || "Missing"}</p>

	<section class="links">
		<h2>Admin Pages</h2>
		<ul>
			{#each data.currentPage?.children ?? [] as c}
				<li><a href={c.path}>{c.title}</a></li>
			{/each}
		</ul>
	</section>
</div>

<style>
	h1 {
		margin-bottom: 1rem;
	}

	h2 {
		margin-top: 1rem;
	}

	.links ul {
		list-style: disc inside;
		padding-left: 0;
	}

	.links li {
		margin: 0.75rem 0;
	}
</style>
