<script lang="ts">
	import type { Link, NewLink } from 'src/global';
	import CreateLink from './_createLink.svelte';

	let allLinks: Link[] = [];

	async function loadAll() {
		const res = await fetch(`/api/links/list`);
		if (!res.ok) {
			console.log('list', res);
			console.log('list.body', res.text());
			return;
		}
		allLinks = (await res.json()) as Link[];
	}
</script>

<CreateLink />

<!-- <br /><br />
<button on:click={loadAll}>Load All</button>
<pre>
	{JSON.stringify(allLinks, null, 2)}
</pre> -->
