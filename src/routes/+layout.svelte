<script lang="ts">
	import type { RouteData } from "$lib/types/auth";

	let { data, children } = $props() as { data: RouteData; children: () => any };
</script>

<nav
	style="padding: 1rem; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; gap: 1rem; align-items: center;"
>
	<div>
		<strong>SvelteKit + SQLite + JWT</strong>
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
