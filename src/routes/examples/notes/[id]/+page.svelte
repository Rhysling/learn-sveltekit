<script lang="ts">
	import type { PageProps } from "./$types";
	import { untrack } from "svelte";
	let { data }: PageProps = $props();

	let n = $state(untrack(() => data.note));
</script>

<div class="card">
	<h2>One Note</h2>
	<div class="note-box">
		<div>Id</div>
		<div>Note</div>

		<div>{n.id}</div>
		<div>
			<div>{n.body}</div>
			<div class="dt">{n.createdAt.toISOString()}</div>
		</div>
	</div>
</div>

<style lang="scss">
	.card {
		max-width: 680px;
		margin: 2rem auto;
		padding: 1.5rem;
		border: 2px solid var(--brand-100);
		border-radius: 12px;
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.04);
	}
	.note-box {
		display: grid;
		grid-template-columns: 1fr 5fr;
		gap: 0.5rem;
		margin-top: 1rem;
		padding: 1rem;
		border: 1px solid var(--brand-100);
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
</style>
