<script lang="ts">
	import { page } from "$app/state";
	let { data, children } = $props() as { data: unknown; children: () => any };

	const pages = [
		{ title: "Intro", href: "/tutorials/fullstack" },
		{ title: "Setup", href: "/tutorials/fullstack/setup" },
		{ title: "Routing", href: "/tutorials/fullstack/routing" },
		{ title: "Server data", href: "/tutorials/fullstack/server-data" },
		{ title: "Auth", href: "/tutorials/fullstack/auth" },
	];

	const currentPath = $derived.by(() => page.url.pathname);
	const currentIndex = $derived.by(() =>
		pages.findIndex((page) => page.href === currentPath),
	);
	const previousPage = $derived.by(() =>
		currentIndex > 0 ? pages[currentIndex - 1] : null,
	);
	const nextPage = $derived.by(() =>
		currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null,
	);
</script>

<nav class="tutorial-nav">
	<div class="tutorial-breadcrumb">
		<a href="/">Home</a>
		<span>/</span>
		<strong>SvelteKit Full-Stack App Tutorial</strong>
	</div>

	<div class="tutorial-links">
		<a href={pages[0].href} class="nav-button">First</a>

		{#if previousPage}
			<a href={previousPage.href} class="nav-button">Previous</a>
		{:else}
			<span class="nav-button disabled">Previous</span>
		{/if}

		<a href="/tutorials/fullstack" class="nav-button">Home</a>

		{#if nextPage}
			<a href={nextPage.href} class="nav-button">Next</a>
		{:else}
			<span class="nav-button disabled">Next</span>
		{/if}

		<a href={pages[pages.length - 1].href} class="nav-button">Last</a>
	</div>
</nav>

<main class="tutorial-page">
	{@render children()}
</main>

<style>
	.tutorial-nav {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1.25rem 1.5rem;
		background: #f9fafb;
		border-bottom: 1px solid #e5e7eb;
	}

	.tutorial-breadcrumb {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		font-size: 0.95rem;
		color: #374151;
	}

	.tutorial-breadcrumb a {
		color: #2563eb;
		text-decoration: none;
	}

	.tutorial-breadcrumb a:hover {
		text-decoration: underline;
	}

	.tutorial-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.nav-button {
		padding: 0.65rem 1rem;
		border-radius: 9999px;
		background: #ffffff;
		border: 1px solid #d1d5db;
		color: #111827;
		text-decoration: none;
		font-weight: 600;
		transition: background 0.15s ease;
	}

	.nav-button:hover {
		background: #f3f4f6;
	}

	.disabled {
		opacity: 0.45;
		cursor: default;
		pointer-events: none;
	}

	.tutorial-page {
		padding: 2rem 1.5rem;
		max-width: 860px;
		margin: 0 auto;
	}
</style>
