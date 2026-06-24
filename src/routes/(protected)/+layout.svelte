<script lang="ts">
	import { untrack } from "svelte";
	import { setAuth } from "$lib/context/auth";

	let { data, children } = $props();
	const d = untrack(() => data);
	if (d.user) setAuth(d.user);
</script>

{@render children()}
