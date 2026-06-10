<script lang="ts">
	import { onMount } from "svelte";
	import type { RouteData } from "$lib/types/auth";
	import type { ImageMetadata } from "$lib/types/media";

	let { data } = $props() as { data: RouteData };
	let email = $state("");
	let password = $state("");
	let name = $state("");
	let message = $state("");
	let mode = $state<"login" | "register">("login");
	let selectedFile: File | null = $state(null);
	let images: ImageMetadata[] = $state([]);
	let uploadMessage = $state("");

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
			window.location.reload();
		} else {
			message = result.error || "Something went wrong";
		}
	}

	async function logout() {
		await fetch("/api/logout", { method: "POST" });
		window.location.reload();
	}

	async function fetchImages() {
		const response = await fetch("/api/images");
		if (!response.ok) {
			uploadMessage = "Unable to load images.";
			return;
		}

		const result = await response.json();
		images = result.images ?? [];
	}

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		selectedFile = target.files?.[0] ?? null;
		uploadMessage = "";
	}

	async function uploadImage(event: Event) {
		event.preventDefault();

		if (!selectedFile) {
			uploadMessage = "Select an image first.";
			return;
		}

		const formData = new FormData();
		formData.append("image", selectedFile);

		const response = await fetch("/api/images", {
			method: "POST",
			body: formData,
		});

		const result = await response.json();

		if (response.ok) {
			uploadMessage = "Upload succeeded.";
			selectedFile = null;
			await fetchImages();
		} else {
			uploadMessage = result.error || "Upload failed.";
		}
	}

	onMount(() => {
		if (data.user) {
			fetchImages();
		}
	});
</script>

<div class="card">
	<a class="back" href="/examples">← Back to examples</a>

	{#if data.user}
		<h1>Welcome back</h1>
		<p>You are signed in as <strong>{data.user.email}</strong>.</p>
		<button onclick={logout}>Logout</button>

		<section style="margin-top: 1.5rem;">
			<h2>Upload an image</h2>
			<form onsubmit={uploadImage}>
				<label for="image">Choose an image</label>
				<input
					id="image"
					type="file"
					accept="image/*"
					onchange={handleFileChange}
				/>
				<button type="submit" disabled={!selectedFile}>Upload image</button>
			</form>
			{#if uploadMessage}
				<p><strong>{uploadMessage}</strong></p>
			{/if}
		</section>

		<section style="margin-top: 1.5rem;">
			<h2>Your uploaded images</h2>
			{#if images.length}
				<div class="gallery">
					{#each images as image}
						<div class="image-card">
							<img src={image.url} alt={image.filename} />
							<div>
								<a href={image.url} download={image.filename}>Download</a>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p>No images uploaded yet.</p>
			{/if}
		</section>
	{:else}
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
	{/if}

	{#if message}
		<p><strong>{message}</strong></p>
	{/if}
</div>

<style>
	.card {
		max-width: 680px;
		margin: 2rem auto;
		padding: 1.5rem;
		border: 1px solid #ddd;
		border-radius: 12px;
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.04);
	}

	.back {
		display: inline-block;
		margin-bottom: 1rem;
		color: #0070f3;
		text-decoration: none;
	}

	.back:hover {
		text-decoration: underline;
	}

	.gallery {
		display: grid;
		gap: 1rem;
	}

	.image-card {
		border: 1px solid #eee;
		padding: 1rem;
		border-radius: 12px;
		text-align: center;
	}

	img {
		max-width: 100%;
		border-radius: 10px;
		margin-bottom: 0.75rem;
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
