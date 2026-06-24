<script lang="ts">
	import { setEditMode } from "$lib/context/edit-mode";
	import SubComponent from "../context-experiments/SubComp.svelte";

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

<style>
	.child {
		padding: 3rem;
	}
</style>
