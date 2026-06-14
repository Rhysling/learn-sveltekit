<script>
	import { page } from "$app/state";
</script>

<h1>{page.status}</h1>
<p class="error">Dashboard error: {page.error?.message}</p>
<a href="/">Go home</a>

<style lang="scss">
	$brand-100: #75dcff;

	.error {
		font-size: 2rem;
		font-weight: bold;
		color: #ff6b6b;
		margin: 0.5rem 0;
		border: 2px solid $brand-100;
		border-radius: 8px;
		padding: 1rem;
	}
</style>
