<script lang="ts">
	import "$lib/styles/global.scss";
	import type { RouteData } from "$lib/types/auth";
	import UserStatus from "$components/UserStatus.svelte";
	import SiteMap from "$components/SiteMap.svelte";

	let { data, children }: { data: RouteData; children: any } = $props();
</script>

<div class="container">
	<nav>
		<div class="logo">
			{#if data.currentPath === "/"}
				SvelteKit + SQLite Tutorials
			{:else}
				<a href="/">SvelteKit + SQLite Tutorials</a>
			{/if}
		</div>

		{#if data.currentPath !== "/login"}
			<UserStatus {data} />
		{/if}
	</nav>

	<SiteMap />

	{@render children()}
</div>

<style lang="scss">
	nav {
		padding: 1rem;
		border-bottom: 1px solid #ddd;
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: center;

		.logo {
			font-weight: bold;
			font-size: 1.25rem;
		}
	}
</style>
