<script>
	import { page } from "$app/state";
</script>

<h1>{page.status}</h1>
<p style="color:red;font-weight:bold;">{page.error?.message}</p>
<a href="/">Go home</a>
