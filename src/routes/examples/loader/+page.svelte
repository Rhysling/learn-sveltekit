<script lang="ts">
	import type { PageProps } from "./$types";
	import { dummyStore } from "$lib/context/dummy-store.svelte";
	import { enhance } from "$app/forms";
	let { data, form }: PageProps = $props();

	let newItem = $state("");

	let fullList = $derived([
		...data.layoutList,
		...data.pageList,
		...data.pageServerList,
		...dummyStore.dummy,
	]);

	function addItem() {
		const trimmed = newItem.trim();
		if (trimmed) {
			dummyStore.add(trimmed);
			newItem = "";
		}
	}

	const removeLast = () => {
		dummyStore.removeLast();
	};
</script>

<div class="card">
	<h1>Load Function Playground</h1>
	<div class="full-list">
		<h2>Full List of Items</h2>
		<div>
			{#each fullList as item}
				<div>{item}</div>
			{/each}
		</div>
	</div>

	<form method="POST" action="?/add" use:enhance={() => {}}>
		<div>
			<h3>New Item</h3>
			<input
				type="text"
				name="newItem"
				bind:value={newItem}
				placeholder="Enter new item"
			/>
		</div>

		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}

		<button
			onclick={(e) => {
				e.preventDefault();
				addItem();
			}}
		>
			Add Item by Fn
		</button>
		<button type="submit">Add Item by Form</button>
		<button
			type="button"
			onclick={() => {
				newItem = "";
			}}
		>
			Clear
		</button>
		<button
			onclick={(e) => {
				e.preventDefault();
				removeLast();
			}}
		>
			Remove Last Item
		</button>
	</form>
</div>

<style lang="scss">
	.card {
		max-width: 680px;
		margin: 2rem auto;
		padding: 1.5rem;
		border: 2px solid var(--main-lightest);
		border-radius: 12px;
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.04);

		.full-list {
			margin: 1rem 0;
			padding: 0.75rem;
			border: 1px solid #ccc;
			border-radius: 8px;
			background: #f9f9f9;
		}

		.error {
			color: red;
			margin-top: 0.5rem;
		}
		h3 {
			margin-bottom: 0.5rem;
		}
		button {
			margin-top: 1rem;
		}
	}
</style>
