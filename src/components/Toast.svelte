<script lang="ts">
	import { toasts } from "$lib/state/toasts.svelte";
</script>

{#if toasts.items.length > 0}
	<div class="toast-container">
		{#each toasts.items as toast (toast.id)}
			<div class="toast">
				{toast.message}
				<button onclick={() => toasts.dismiss(toast.id)}>Clear Me</button>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	@use "../lib/styles/custom-variables" as c;

	.toast-container {
		position: fixed;
		top: 2rem;
		right: 2rem;

		.toast {
			padding: 0.4em;
			margin: 0 0 0.5em;
			border: 1px solid var(--background-main);
			border-radius: var(--radius);
			border-color: var(--color-info);
			outline: 1px solid var(--color-info);
			background-color: var(--color-info-bg);
		}
	}

	@media only screen and (width <= c.$bp-small) {
	}
</style>
