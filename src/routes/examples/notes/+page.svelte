<script lang="ts">
	import type { PageProps } from "./$types";
	import { enhance } from "$app/forms";
	let { data, form }: PageProps = $props();

	let isSubmitting = $state(false);
</script>

<div class="card">
	<h2>Notes</h2>
	<div class="note-box">
		<div>Id</div>
		<div>Note</div>
		<div>CreatedAt</div>
		{#each data.notes as n}
			<div>{n.id}</div>
			<div>{n.body}</div>
			<div class="dt">{n.createdAt.toISOString()}</div>
		{/each}
	</div>

	<form
		method="POST"
		use:enhance={() => {
			isSubmitting = true;
			return async ({ update }) => {
				await update(); // re-run load + apply form result
				isSubmitting = false;
			};
		}}
	>
		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}

		<textarea name="body" value={form?.body ?? ""}></textarea><br />
		<button type="submit" disabled={isSubmitting}>
			{isSubmitting ? "Adding note..." : "Add note"}
		</button>
	</form>
</div>

<style lang="scss">
	$brand-100: #75dcff;

	.card {
		max-width: 680px;
		margin: 2rem auto;
		padding: 1.5rem;
		border: 2px solid $brand-100;
		border-radius: 12px;
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.04);
	}
	.note-box {
		display: grid;
		grid-template-columns: 0.5fr 5fr 2fr;
		gap: 0.5rem;
		margin-top: 1rem;
		padding: 1rem;
		border: 1px solid $brand-100;
		border-radius: 8px;
		background-color: #f9f9f9;

		div {
			padding: 0.5rem;
			border-bottom: 1px solid $brand-100;
		}

		.dt {
			font-size: 0.7rem;
			color: #666;
		}
	}

	.error {
		color: red;
		margin: 0.5rem 0 0;
	}

	textarea {
		width: 100%;
		min-height: 80px;
		margin-top: 1rem;
		padding: 0.5rem;
		border: 1px solid $brand-100;
		border-radius: 8px;
		resize: vertical;
	}

	button {
		margin-top: 1rem;
	}
</style>
