<script lang="ts">
	import type { PageProps } from "./$types";
	import { enhance } from "$app/forms";
	import { untrack } from "svelte";
	let { data, form }: PageProps = $props();

	let isSubmitting = $state(false);
	let body = $state(untrack(() => form?.body ?? ""));
	let charCount = $derived(body.length);
	const LIMIT = 20;
	let isOverLimit = $derived(charCount > LIMIT);

	$effect(() => {
		document.title =
			body.length > 0 ? `Writing... (${charCount} chars)` : "Notes";
		return () => {
			document.title = "Notes";
		};
	});
</script>

<div class="card">
	<h2>Notes</h2>
	<div class="note-box">
		<div>Id</div>
		<div>Note</div>
		<div>&nbsp;</div>
		{#each data.notes as n}
			<div>{n.id}</div>
			<div>
				<div>{n.body}</div>
				<div class="dt">{n.createdAt.toISOString()}</div>
			</div>
			<div>
				<form method="POST" action="?/delete" use:enhance>
					<input type="hidden" name="id" value={n.id} />
					<button class="del" type="submit">Delete</button>
				</form>
			</div>
		{/each}
	</div>

	<form
		method="POST"
		action="?/add"
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

		<textarea name="body" bind:value={body}></textarea><br />
		<p class="char-count" class:over={isOverLimit}>
			{charCount} / {LIMIT}
		</p>
		<button type="submit" disabled={isSubmitting || isOverLimit}>
			{isSubmitting ? "Adding note..." : "Add note"}
		</button>
		<button
			type="button"
			onclick={() => {
				body = "";
			}}
			disabled={isSubmitting}
		>
			Clear
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
		}

		.dt {
			font-size: 0.7rem;
			color: #666;
			padding: 0 0.5rem;
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

	.char-count {
		font-size: 0.9rem;
		color: #666;
		margin-top: 0.5rem;

		&.over {
			color: red;
		}
	}

	button {
		margin-top: 1rem;

		&[disabled] {
			opacity: 0.6;
			cursor: not-allowed;
		}

		&.del {
			font-size: 0.8rem;
			padding: 0.25rem 0.5rem;
			background-color: #ff4d4d;
		}
	}
</style>
