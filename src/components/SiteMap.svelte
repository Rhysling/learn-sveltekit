<script lang="ts">
	import { page } from "$app/state";
	import { pageTree, noAdminTree, findPage } from "$lib/context/site-tree";
	import type { SitePage } from "$lib/context/site-tree";

	type SiteMapProps = {
		isAdmin: boolean;
		pathForMenu?: string;
	};

	let { isAdmin, pathForMenu = "" }: SiteMapProps = $props();

	function buildBreadcrumbs(
		base: SitePage,
		crumbList: SitePage[],
		path: string,
	): SitePage[] | undefined {
		let localList = [...crumbList, base];
		if (base.path === path) return localList;

		for (const c of base.children) {
			const result = buildBreadcrumbs(c, localList, path);
			if (result) return result;
		}
	}

	let tree = $derived(isAdmin ? pageTree : noAdminTree);

	let crumbs = $derived.by(() => buildBreadcrumbs(tree, [], page.url.pathname));

	let currentPage = $derived.by(() => {
		return crumbs?.length ? crumbs[crumbs.length - 1] : tree;
	});

	let parentPage = $derived.by(() => {
		if (!crumbs?.length || crumbs.length < 2) return tree;
		return crumbs[crumbs.length - 2];
	});

	let navList = $derived.by(() => {
		if (currentPage.includeChildren || currentPage.path === "/") {
			return [currentPage, ...currentPage.children];
		}
		if (parentPage.includeChildren) {
			return [parentPage, ...parentPage.children];
		}
		return [...parentPage.children];
	});

	let currentNavIx = $derived.by(() =>
		navList.findIndex((c) => c.path === currentPage.path),
	);

	let isSiteMap = $derived(!pathForMenu);

	let menuPages = $derived.by(() => {
		if (isSiteMap) return [];

		const pg = findPage(pathForMenu, isAdmin);
		if (!pg) return [];
		return pg.includeChildren ? [pg, ...pg.children] : [...pg.children];
	});
</script>

{#if isSiteMap}
	<div class="site-map">
		<div>
			{#if crumbs}
				{#each crumbs as crumb, i}
					<a href={crumb.path}>{crumb.title}</a>
					{i < crumbs.length - 1 ? " > " : ""}
				{/each}
			{:else}
				No breadcrumbs found.
			{/if}
		</div>

		<div>
			<button
				class="small"
				disabled={currentNavIx === 0}
				onclick={() => (window.location.href = navList[0].path || "/")}
			>
				First
			</button>
			<button
				class="small"
				disabled={currentNavIx === 0}
				onclick={() =>
					(window.location.href = navList[currentNavIx - 1].path || "/")}
			>
				Previous
			</button>
			<button
				class="small"
				disabled={currentPage.path === "/"}
				onclick={() => (window.location.href = parentPage.path || "/")}
			>
				Up
			</button>
			<button
				class="small"
				disabled={currentNavIx === navList.length - 1}
				onclick={() =>
					(window.location.href = navList[currentNavIx + 1].path || "/")}
			>
				Next
			</button>

			<button
				class="small"
				style="margin-right:0;"
				disabled={currentNavIx === navList.length - 1}
				onclick={() =>
					(window.location.href = navList[navList.length - 1].path || "/")}
			>
				Last
			</button>
		</div>
	</div>
{:else}<!-- navForPath menu below -->
	<ul>
		{#each menuPages as mp, i}
			{@const mpl = menuPages.length - 1}
			{#if page.url.pathname === mp.path}
				<li style="font-weight:bold;">{mp.title}</li>
			{:else}
				<li>
					<a href={mp.path} title={mp.description}>{mp.title}</a>
				</li>
			{/if}
			{#if i < mpl}&#8226;&nbsp;{/if}
		{/each}
	</ul>
{/if}

<style lang="scss">
	@use "../lib/styles/custom-variables" as c;

	.site-map {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		margin: 0.5rem 0;
		padding: 0.25rem;
		background-color: var(--main-lightest);
	}

	ul {
		margin: 0.5rem 0;
		padding: 0;

		li {
			display: inline-block;
		}
	}

	@media only screen and (width <= c.$bp-small) {
	}
</style>
