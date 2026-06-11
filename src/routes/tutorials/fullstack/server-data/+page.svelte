<script lang="ts">
	let showPayload = $state(false);

	const examplePayload = {
		user: {
			email: "alice@example.com",
			name: "Alice",
		},
	};
</script>

<div class="section-card">
	<h1>Server-Side Data Loading</h1>

	<section>
		<p>
			SvelteKit can load page data on the server before rendering. The server
			module lives next to the page file as <code>+page.server.ts</code>.
		</p>
	</section>

	<section>
		<h2>Example server load</h2>
		<pre><code
				>{`import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get("token");
  if (!token) return { user: null };

  return {
    user: { email: "alice@example.com", name: "Alice" }
  };
};`}</code
			></pre>
	</section>

	<section>
		<h2>Data preview</h2>
		<p>
			Click the button to view a sample payload that a server load function
			might return to a page.
		</p>
		<button onclick={() => (showPayload = !showPayload)}>
			{showPayload ? "Hide" : "Show"} example payload
		</button>

		{#if showPayload}
			<pre>{JSON.stringify(examplePayload, null, 2)}</pre>
		{/if}
	</section>

	<section>
		<h2>Why this matters</h2>
		<p>
			Using server-side load keeps sensitive logic off the client and lets the
			page render with preloaded data. That makes your app faster and more
			secure.
		</p>
	</section>
</div>

<style>
	.section-card {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 16px;
		padding: 2rem;
		box-shadow: 0 14px 40px rgba(15, 23, 42, 0.05);
	}

	button {
		margin-top: 1rem;
		padding: 0.75rem 1rem;
		border-radius: 9999px;
		border: 1px solid #d1d5db;
		background: #ffffff;
		color: #111827;
		cursor: pointer;
		font-weight: 600;
	}

	button:hover {
		background: #f3f4f6;
	}

	pre {
		margin-top: 1rem;
		background: #111827;
		color: #f9fafb;
		padding: 1rem;
		border-radius: 0.75rem;
		overflow-x: auto;
	}
</style>
