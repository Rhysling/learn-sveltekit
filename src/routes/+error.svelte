<script lang="ts">
	import { page } from "$app/state";
</script>

<h1>{page.status}</h1>
<div class="box">
	<p class="error">{page.error?.message || "There was a problem."}</p>
	<p><a href="/">Go home</a></p>
</div>

<style lang="scss">
	h1 {
		margin-top: 2rem;
		text-align: center;
	}

	.box {
		margin: 0.5rem auto;
		max-width: min(600px, 80vw);
		border: 2px solid var(--brand-100);
		border-radius: 8px;
		padding: 1rem;
		text-align: center;
		background-color: var(--color-error-bg);
	}
	.error {
		font-size: 1.5rem;
		font-weight: bold;
		color: var(--color-error);
		margin: 0.5rem 0;
		padding: 1rem;
	}
</style>
