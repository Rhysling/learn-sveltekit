<script lang="ts">
	import "$lib/styles/global.scss";
	import { PUBLIC_APP_NAME } from "$env/static/public";
	import type { LayoutProps } from "./$types";
	import UserStatus from "$components/UserStatus.svelte";
	import SiteMap from "$components/SiteMap.svelte";
	import Toast from "$components/Toast.svelte";

	let { data, children }: LayoutProps = $props();
</script>

<div class="container">
	<nav>
		<div class="logo">
			{#if data.currentPath === "/"}
				{PUBLIC_APP_NAME}
			{:else}
				<a href="/">{PUBLIC_APP_NAME}</a>
			{/if}
		</div>

		{#if data.currentPath !== "/login"}
			<UserStatus {data} />
		{/if}
	</nav>
	<SiteMap isAdmin={data.user?.isAdmin || false} />

	{@render children()}
	<Toast />
</div>

<style lang="scss">
	.container {
		position: relative;
	}

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
