<script lang="ts">
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<div class="title">Admin Databases</div>

<div class="list">
	<div class="list-title">Database Backup List</div>
	<div>&nbsp;</div>
	<div>&nbsp;</div>
	<div>&nbsp;</div>
	{#each data.dbNames || [] as item (item)}
		<div>{item}</div>
		<div>
			<a href="/admin/db?file={encodeURIComponent(item)}" download={item}
				>Download</a
			>
		</div>
		<div>
			{#if item.indexOf("_") > 0}
				<form
					method="POST"
					action="?/restore"
					onsubmit={(e: SubmitEvent) => {
						if (
							!confirm(
								`Restore ${item}? The current database will be backed up first.`,
							)
						)
							e.preventDefault();
					}}
				>
					<input type="hidden" name="dbName" value={item} />
					<button type="submit" class="link">Restore</button>
				</form>
			{/if}
		</div>
		<div>
			{#if item.indexOf("_") > 0}
				<form
					method="POST"
					action="?/delete"
					onsubmit={(e: SubmitEvent) => {
						if (!confirm(`Delete ${item}?`)) e.preventDefault();
					}}
				>
					<input type="hidden" name="dbName" value={item} />
					<button type="submit" class="link">Delete</button>
				</form>
			{/if}
		</div>
	{/each}
	<form method="POST" action="?/backup" style="grid-column: span 4;">
		<input type="hidden" name="dbName" value={data.mainDbName} />
		<button type="submit">Backup Db</button>
	</form>
</div>

<style lang="scss">
	@use "../../../../lib/styles/custom-variables" as c;

	.title {
		font-size: 2rem;
		font-weight: bold;
		text-align: center;
		margin: 1rem auto;
	}

	.list {
		display: grid;
		grid-template-columns: 1fr auto auto auto;
		gap: 0;

		margin: 2rem auto;
		padding: 1rem;
		max-width: min(800px, 80vw);
		border: 2px solid var(--main-lighter);
		border-radius: var(--radius);

		.list-title {
			font-weight: bold;
		}

		> div {
			margin: 0 1em;
		}
		button {
			margin: 1em 0;
		}

		button.link {
			all: unset;
			color: var(--link-color);
			transition: color 0.2s ease;
			cursor: pointer;
			text-decoration: none;

			&:hover {
				color: var(--link-hover);
				text-decoration: underline;
			}
		}

		@media only screen and (width <= c.$bp-small) {
			font-size: 0.85rem;
			max-width: 92vw;
		}
	}
</style>
