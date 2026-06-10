<script lang="ts">
	import "$lib/styles/global.scss";
	import type { RouteData } from "$lib/types/auth";

	type LayoutData = RouteData & { currentPath: string };
	let { data, children } = $props() as { data: LayoutData; children: () => any };
</script>

<nav
	style="padding: 1rem; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; gap: 1rem; align-items: center;"
>
	<div>
		<strong>
			{#if data.currentPath === "/"}
				SvelteKit + SQLite Tutorials
			{:else}
				<a href="/">SvelteKit + SQLite Tutorials</a>
			{/if}
		</strong>
	</div>

	{#if data.user}
		<div>
			Logged in as <strong>{data.user.email}</strong>
			{#if data.user.name}
				<span>({data.user.name})</span>
			{/if}
		</div>
		<div>
			<a href="/admin">Admin</a>
		</div>
	{/if}
</nav>

{@render children()}
