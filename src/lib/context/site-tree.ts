export type SitePage = {
	title: string;
	description: string;
	path: string;
	includeChildren?: boolean;
	children: SitePage[];
};

export const pageTree: SitePage = {
	title: "Home",
	description: "Interactive, hands-on guides to building full-stack apps with SvelteKit.",
	path: "/",
	children: [
		{
			title: "SvelteKit and Related Tutorials",
			description: "Tutorials available for learning SvelteKit and related technologies.",
			path: "/tutorials",
			children: [
				{
					title: "SvelteKit Full-Stack App Tutorial",
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
					title: "Stand-Alone Lessons",
					description:
						"Individual lessons covering SvelteKit concepts like form actions, hooks, Svelte 5 runes, error handling, deployment, and more. Each lesson is self-contained with explanations, code examples, and a quiz.",
					path: "/tutorials/lessons",
					includeChildren: true,
					children: [],
				},
			],
		},
		{
			title: "Examples",
			description: "This section hosts interactive SvelteKit feature examples.",
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
					title: "Loading Playground",
					description: "Play with how load functions work.",
					path: "/examples/loader",
					children: [],
				},
				{
					title: "Context Experiments",
					description: "Play with context.",
					path: "/examples/context-experiments",
					children: [],
				},
				{
					title: "Reactive Patterns",
					description: "Play with reactive patterns.",
					path: "/examples/reactive-patterns",
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

function findPageRecursive(base: SitePage, path: string): SitePage | undefined {
	if (base.path === path) return base;
	for (const c of base.children) {
		const result = findPageRecursive(c, path);
		if (result) return result;
	}
}

export function findPage(path: string): SitePage | undefined {
	return findPageRecursive(pageTree, path);
}
