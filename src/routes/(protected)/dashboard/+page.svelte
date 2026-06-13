<script lang="ts">
	import type { PageProps } from "./$types";
	let { data }: PageProps = $props();
</script>

<h1>Dashboard</h1>
<p>Welcome back, {data.user.name}!</p>
<p>Logged in as: {data.user.email}</p>
<p>UserId = {data.user.userId}</p>
