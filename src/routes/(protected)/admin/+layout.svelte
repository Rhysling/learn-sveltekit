<script lang="ts">
	import SiteMap from "$components/SiteMap.svelte";

	let { data, children } = $props();
</script>

<SiteMap isAdmin={data.user?.isAdmin || false} pathForMenu="/admin" />
{@render children()}

<style lang="scss">
	@use "../../../lib/styles/custom-variables" as c;

	@media only screen and (width <= c.$bp-small) {
	}
</style>
