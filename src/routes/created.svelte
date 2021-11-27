<script context="module" lang="ts">
	import { getHost } from '$lib/host';
	import type { Link } from 'src/global';
	import { onMount } from 'svelte';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		console.log({ page });
		const shortUrl = page.query.get('shortUrl');
		if (shortUrl) {
			return {
				status: 200,
				props: { shortUrl }
			};
		}
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
	import { browser } from '$app/env';
	import CreateLink from './_createLink.svelte';
	export let shortUrl: string;

	onMount(() => {
		if (browser) {
			// to not generate a new link when users clicks on browser back
			if (!location.search.includes('?shortUrl')) {
				location.search = '?shortUrl=' + shortUrl;
			}
		}
	});
</script>

<CreateLink {shortUrl} />
