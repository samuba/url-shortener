<script context="module" lang="ts">
	import { getHost } from '$lib/host';
	import confetti from 'canvas-confetti';
	import type { Link, NewLink } from 'src/global';
	import { onMount } from 'svelte';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		// console.log('LOAD /created - page', page);
		let shortUrl = page.query.get('shortUrl');
		// page is not being visited for the first time
		if (shortUrl) return { props: { shortUrl } };

		const url = page.query.get('url');
		const customSlug = page.query.get('customSlug');
		const description = page.query.get('description');

		if (!url) throw new Error(`No URL provided`);

		const res = await fetch(`${getHost()}/api/links`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({ url, customSlug, description } as NewLink)
		});
		shortUrl = ((await res.json()) as Link).shortUrl;

		if (res.status === 409) return { props: { shortUrlAlreadyExists: true, shortUrl: '' } };
		if (!res.ok) throw new Error(`Error ${res.status} from server  ${await res.text()}`);

		return { props: { shortUrl } };
	}
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import CreateLink from './_createLink.svelte';

	export let shortUrl: string;
	export let shortUrlAlreadyExists = false;

	onMount(() => {
		if (browser && shortUrl && !location.search.includes('?shortUrl')) {
			// to not generate a new link when users clicks on browser back
			location.search = '?shortUrl=' + shortUrl;
			setTimeout(() => confetti({ colors: ['#3291ff', '#0070f3'] }), 100);
		}
	});
</script>

<CreateLink {shortUrl} />

{#if shortUrlAlreadyExists}
	<div><mark>Name already taken. Choose another one.</mark></div>
{/if}
