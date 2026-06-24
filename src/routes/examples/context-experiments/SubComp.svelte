<script lang="ts">
	import { getEditMode } from "$lib/context/edit-mode";

	const edit = getEditMode();
</script>

<div class="child">
	{#if edit.isActive}
		<div>This is Edit Mode</div>
		<div class="edit-controls">
			<button>Delete</button>
			<button>Rename</button>
		</div>
	{/if}

	<!-- Child can also toggle: -->
	<div>
		Child Edit Control:
		<button onclick={() => edit.toggle()}>
			{edit.isActive ? "Done" : "Edit"}
		</button>
	</div>
</div>

<style>
	.child {
		border: 2px solid blue;
		padding: 2rem;
		margin: 1rem auto;
		max-width: min(800px, 80vw);
	}
</style>
