<script lang="ts">
	import SiteMap from "$components/SiteMap.svelte";

	let { children } = $props();
</script>

<SiteMap pathForMenu="/admin" />
{@render children()}

<style lang="scss">
	@use "../../../lib/styles/custom-variables" as c;

	@media only screen and (width <= c.$bp-small) {
	}
</style>
