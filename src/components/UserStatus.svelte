<script lang="ts">
	import type { RouteData } from "$lib/types/auth";

	let { data }: { data: RouteData } = $props();

	async function logout(e: Event) {
		e.preventDefault();
		await fetch("/api/logout", { method: "POST" });
		window.location.reload();
	}
</script>

<div>
	{#if data.user}
		Welcome, {data.user.name || data.user.email || "((missing))"} &#8226;
		<a href="/" onclick={(e) => logout(e)}>Logout</a>
	{:else}
		<a href="/login">Login</a> &#8226;
		<a href="/login?mode=register">Register</a>
	{/if}
</div>

<style lang="scss">
	@use "../lib/styles/custom-variables" as c;

	@media only screen and (width <= c.$bp-small) {
	}
</style>
