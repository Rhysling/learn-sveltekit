<script lang="ts">
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	let fileInput: HTMLInputElement;
	let hasFile = $state(false);
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
	<form
		method="POST"
		action="?/upload"
		enctype="multipart/form-data"
		style="grid-column: span 4;"
		onsubmit={(e: SubmitEvent) => {
			if (
				!confirm(
					"Upload and replace the main database? The current database will be backed up first.",
				)
			)
				e.preventDefault();
		}}
	>
		<div class="upload">
			<label>
				<span>Upload Db</span>
				<input
					type="file"
					name="file"
					accept=".db"
					required
					bind:this={fileInput}
					onchange={() =>
						(hasFile = fileInput.files !== null && fileInput.files.length > 0)}
				/>
			</label>
			<button type="submit" class="link">Upload</button>
			<button
				type="button"
				class="link"
				disabled={!hasFile}
				onclick={() => {
					fileInput.value = "";
					hasFile = false;
				}}>Cancel</button
			>
		</div>
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
			margin: 1em 1em 0;
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

			&:disabled {
				color: var(--text-disabled);
				cursor: default;

				&:hover {
					text-decoration: none;
				}
			}
		}

		.upload {
			margin: 1em 0 0 1em;
			border: 1px solid var(--main-lighter);
			border-radius: calc(var(--radius) / 2);
			display: flex;
			align-items: center;

			label {
				span {
					font-weight: bold;
					margin-left: 1em;
				}

				input {
					font-size: 0.9em;
					margin: 0;
				}
			}

			button {
				margin: 0 1em;
			}
		}

		@media only screen and (width <= c.$bp-small) {
			font-size: 0.85rem;
			max-width: 92vw;
		}
	}
</style>
