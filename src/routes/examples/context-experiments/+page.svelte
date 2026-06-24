<script lang="ts">
	import { setEditMode } from "$lib/context/edit-mode";
	import SubComponent from "../context-experiments/SubComp.svelte";
	import { tempStore } from "$lib/context/temperature-store.svelte";

	let editMode = $state({
		isActive: false,
		toggle() {
			this.isActive = !this.isActive;
		},
	});
	setEditMode(editMode);
</script>

<div class="child"><SubComponent /></div>

<div>Here is the parent page button:</div>
<button onclick={() => editMode.toggle()}>
	{editMode.isActive ? "Exit Edit Mode" : "Enter Edit Mode"}
</button>

<div class="temperature">
	<div class="group-title">Using tempStore</div>
	<div>c: <input type="number" bind:value={tempStore.celsius} /></div>
	<div>f: <input type="number" bind:value={tempStore.farenheit} /></div>
</div>

<style lang="scss">
	@use "../../../lib/styles/custom-variables" as c;

	.child {
		padding: 3rem;
	}

	.group-title {
		font-weight: bold;
	}

	.temperature {
		margin: 2rem auto;
		padding: 1rem;
		max-width: min(800px, 80vw);
		border: 2px solid var(--main-lighter);
		border-radius: var(--radius);

		@media only screen and (width <= c.$bp-small) {
			font-size: 0.85rem;
		}
	}
</style>
