<script lang="ts">
	import type { RouteData } from "$lib/types/auth";
	import { page } from "$app/state";

	const modeStr =
		page.url.searchParams.get("mode") === "register" ? "register" : "login";

	let { data } = $props() as { data: RouteData };
	const redirectTo = $derived(data.redirectTo ?? "/");
	let email = $state("");
	let password = $state("");
	let name = $state("");
	let message = $state("");
	let mode = $state<"login" | "register">(modeStr);

	async function submitForm(event: Event) {
		event.preventDefault();

		const endpoint = mode === "login" ? "/api/login" : "/api/register";
		const body: Record<string, string> = { email, password };

		if (mode === "register") {
			body.name = name;
		}

		const response = await fetch(endpoint, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});

		const result = await response.json();

		if (response.ok) {
			message = result.message;
			window.location.href = redirectTo;
		} else {
			message = result.error || "Something went wrong";
		}
	}
</script>

<div class="card">
	<h1>{mode === "login" ? "Login" : "Register"}</h1>
	<p>{mode === "login" ? "Sign in to continue." : "Create a new account."}</p>

	<form onsubmit={submitForm}>
		<label for="email">Email</label>
		<input id="email" type="email" bind:value={email} required />

		<label for="password">Password</label>
		<input
			id="password"
			type="password"
			bind:value={password}
			required
			minlength="6"
		/>

		{#if mode === "register"}
			<label for="name">Name</label>
			<input id="name" type="text" bind:value={name} />
		{/if}

		<button type="submit">{mode === "login" ? "Login" : "Register"}</button>
	</form>

	<button
		type="button"
		onclick={() => (mode = mode === "login" ? "register" : "login")}
	>
		{mode === "login" ? "Need an account?" : "Already have an account?"}
	</button>

	{#if message}
		<p><strong>{message}</strong></p>
	{/if}
</div>

<style lang="scss">
	.card {
		max-width: 680px;
		margin: 2rem auto;
		padding: 1.5rem;
		border: 1px solid #ddd;
		border-radius: 12px;
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.04);
	}

	label {
		display: block;
		margin: 0.75rem 0 0.25rem;
	}

	input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ccc;
		border-radius: 8px;
	}

	button {
		margin-top: 1rem;
	}
</style>
