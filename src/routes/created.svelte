<script context="module" lang="ts">
	import { getHost } from '$lib/host';
	import type { Link } from 'src/global';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		console.log({ page });
		const url = page.query.get('url');
		const description = page.query.get('description');

		if (!url) throw new Error(`No URL provided`);

		const res = await fetch(`${getHost()}/api/links`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({ url, description })
		});
		return {
			status: 200,
			props: {
				shortUrl: ((await res.json()) as Link).shortUrl
			}
		};
	}
</script>

<script lang="ts">
	import CreateLink from './_createLink.svelte';
	export let shortUrl: string;
</script>

<CreateLink {shortUrl} />
