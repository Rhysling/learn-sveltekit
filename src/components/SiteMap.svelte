<script lang="ts">
	import { page } from "$app/state";

	type SitePage = {
		title: string;
		description: string;
		path: string;
		includeChildren?: boolean;
		children: SitePage[];
	};

	type SiteMapProps = {
		pathForMenu: string;
	};

	let { pathForMenu = "" }: SiteMapProps = $props();

	const pageTree: SitePage = {
		title: "Home",
		description: "Welcome to the SvelteKit Tutorial Collection.",
		path: "/",
		children: [
			{
				title: "Tutorials",
				description: "Imported Tutorial Collection.",
				path: "/tutorials",
				children: [
					{
						title: "SvelteKit Full-Stack",
						description:
							"This tutorial teaches how to build a complete SvelteKit app with file-based routing, server-side data, authentication, and deploy-ready configuration.",
						path: "/tutorials/fullstack",
						includeChildren: true,
						children: [
							{
								title: "Setup and Configuration",
								description: "Setup.",
								path: "/tutorials/fullstack/setup",
								children: [],
							},
							{
								title: "Routing",
								description: "Routing.",
								path: "/tutorials/fullstack/routing",
								children: [],
							},
							{
								title: "Server-Side Data Loading",
								description: "Server-Side Data Loading.",
								path: "/tutorials/fullstack/server-data",
								children: [],
							},
							{
								title: "Authentication",
								description: "Authentication.",
								path: "/tutorials/fullstack/auth",
								children: [],
							},
						],
					},
					{
						title: "Another Tutorial",
						description: "Foo.",
						path: "/tutorials/foo",
						includeChildren: true,
						children: [
							{
								title: "A",
								description: "Setup.",
								path: "/tutorials/foo/setup",
								children: [],
							},
							{
								title: "Routing",
								description: "Routing.",
								path: "/tutorials/foo/routing",
								children: [],
							},
							{
								title: "Server-Side Data Loading",
								description: "Server-Side Data Loading.",
								path: "/tutorials/foo/server-data",
								children: [],
							},
							{
								title: "Authentication",
								description: "Authentication.",
								path: "/tutorials/foo/auth",
								children: [],
							},
						],
					},
				],
			},
			{
				title: "Examples",
				description: "Interactive Feature Examples.",
				path: "/examples",
				includeChildren: false,
				children: [
					{
						title: "Image Upload Example",
						description: "Upload images.",
						path: "/examples/upload",
						children: [],
					},
					{
						title: "Notes Form Example",
						description: "Save notes to SQLite.",
						path: "/examples/notes",
						children: [],
					},
					{
						title: "Standalone Dashooard",
						description: "A dashboard in a protected route.",
						path: "/dashboard",
						children: [],
					},
					{
						title: "Loading Playground",
						description: "Play with how load functions work.",
						path: "/examples/loader",
						children: [],
					},
				],
			},
			{
				title: "Admin Dashboard",
				description:
					"A protected admin interface for managing the application.",
				path: "/admin",
				includeChildren: true,
				children: [
					{
						title: "Users",
						description: "Manage users.",
						path: "/admin/users",
						children: [],
					},
					{
						title: "Images",
						description: "Manage images.",
						path: "/admin/images",
						children: [],
					},
				],
			},
		],
	};

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

	function findPageByPath(base: SitePage, path: string): SitePage | undefined {
		if (base.path === path) return base;
		for (const c of base.children) {
			const result = findPageByPath(c, path);
			if (result) return result;
		}
	}

	let crumbs = $derived.by(() =>
		buildBreadcrumbs(pageTree, [], page.url.pathname),
	);

	let currentPage = $derived.by(() => {
		return crumbs?.length ? crumbs[crumbs.length - 1] : pageTree;
	});

	let parentPage = $derived.by(() => {
		if (!crumbs?.length || crumbs.length < 2) return pageTree;
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

		const pg = findPageByPath(pageTree, pathForMenu);
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
			{#if page.route.id === mp.path}
				<li style="font-weight:bold;">{mp.title}</li>
			{:else}
				<li><a href={mp.path} title={mp.description}>{mp.title}</a></li>
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
		background-color: c.$main-lightest;
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
