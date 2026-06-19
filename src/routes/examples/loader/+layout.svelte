<script lang="ts">
	import { page } from "$app/state";
	let { data, children } = $props();
</script>

<div class="loader-layout">
	<div>This is the loader layout</div>
	<div class="top">
		<h2>Loader list:</h2>
		{#each data.layoutList as item}
			<div>{item}</div>
		{/each}
	</div>
	{@render children()}
</div>

<style>
	.loader-layout {
		padding: 1.25rem 1.5rem;
		background: #ffeeee;
		border: 1px solid black;
		border-radius: 8px;

		.top {
			margin: 1rem;
			padding: 0.5rem;
			border: 1px solid blue;
			border-radius: 8px;
		}
	}
</style>
