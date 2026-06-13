<script lang="ts">
	import type { RouteData } from "$lib/types/auth";
	let { data } = $props() as { data: RouteData };
</script>

<div class="card">
	<h1>Examples</h1>
	<p>
		This section will host interactive SvelteKit examples and tutorial
		sequences.
	</p>

	<section class="links">
		<h2>Available example</h2>
		<ul>
			<li><a href="/examples/upload">Image upload example</a></li>
			<li><a href="/examples/notes">Notes form example</a></li>
			<li><a href="/dashboard">A protected dashboard</a></li>
		</ul>
		<p class="placeholder">More examples are coming soon.</p>
	</section>
</div>

<style lang="scss">
	$brand-100: #75dcff;

	.card {
		max-width: 680px;
		margin: 2rem auto;
		padding: 1.5rem;
		border: 2px solid $brand-100;
		border-radius: 12px;
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.04);
	}

	.links ul {
		list-style: disc inside;
		padding-left: 0;
	}

	.links li {
		margin: 0.75rem 0;
	}

	.placeholder {
		margin-top: 1rem;
		font-style: italic;
		color: #666;
	}

	a {
		color: #0070f3;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
