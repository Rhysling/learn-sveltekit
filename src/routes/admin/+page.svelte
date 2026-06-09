<script lang="ts">
	import { onMount } from 'svelte';
	import type { RouteData } from '$lib/types/auth';
	import type { ImageMetadata } from '$lib/types/media';

	let { data } = $props() as { data: RouteData };
	let selectedFile: File | null = $state(null);
	let images: ImageMetadata[] = $state([]);
	let uploadMessage = $state('');

	async function fetchImages() {
		const response = await fetch('/api/images');
		if (!response.ok) {
			uploadMessage = 'Unable to load images.';
			return;
		}

		const result = await response.json();
		images = result.images ?? [];
	}

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		selectedFile = target.files?.[0] ?? null;
		uploadMessage = '';
	}

	async function uploadImage(event: Event) {
		event.preventDefault();

		if (!selectedFile) {
			uploadMessage = 'Select an image first.';
			return;
		}

		const formData = new FormData();
		formData.append('image', selectedFile);

		const response = await fetch('/api/images', {
			method: 'POST',
			body: formData
		});

		const result = await response.json();
		if (response.ok) {
			uploadMessage = 'Upload succeeded.';
			selectedFile = null;
			await fetchImages();
		} else {
			uploadMessage = result.error || 'Upload failed.';
		}
	}

	onMount(() => {
		fetchImages();
	});
</script>

<div class="card">
	<h1>Admin Dashboard</h1>
	<p>Welcome back, <strong>{data.user.email}</strong>.</p>

	<section style="margin-top: 1.5rem;">
		<h2>Upload an image</h2>
		<form onsubmit={uploadImage}>
			<label for="image">Choose an image</label>
			<input id="image" type="file" accept="image/*" onchange={handleFileChange} />
			<button type="submit" disabled={!selectedFile}>Upload image</button>
		</form>
		{#if uploadMessage}
			<p><strong>{uploadMessage}</strong></p>
		{/if}
	</section>

	<section style="margin-top: 1.5rem;">
		<h2>Uploaded images</h2>
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
</div>

<style>
	.card {
		max-width: 780px;
		margin: 2rem auto;
		padding: 1.5rem;
		border: 1px solid #ddd;
		border-radius: 12px;
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.04);
	}

	.gallery {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
