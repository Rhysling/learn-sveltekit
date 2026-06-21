<script lang="ts">
	import type { PageProps } from "./$types";
	let { data }: PageProps = $props();
</script>

<h1>Admin Dashboard</h1>

<p>Welcome back, {data?.user?.name || "Missing"}!</p>
<p>Logged in as: {data?.user?.email || "Missing"}</p>
<p>UserId = {data?.user?.userId || "Missing"}</p>

<style lang="scss">
	@use "../../../lib/styles/custom-variables" as c;

	@media only screen and (width <= c.$bp-small) {
	}
</style>
