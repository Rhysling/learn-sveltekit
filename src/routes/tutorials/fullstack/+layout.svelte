<script lang="ts">
	let { children } = $props();
</script>

<div class="tutorial-page">
	{@render children()}
</div>

<style lang="scss">
	@use "../../../lib/styles/custom-variables" as c;

	.tutorial-page {
		padding: 2rem 1.5rem;
		max-width: 860px;
		margin: 0 auto;
	}

	@media only screen and (width <= c.$bp-small) {
	}
</style>
