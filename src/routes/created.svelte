<script context="module" lang="ts">
	import { getHost } from '$lib/host';
	import { paramMissing } from '$lib/common';
	import type { Link, NewLink } from 'src/global';
	import { navigating } from '$app/stores';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		const url = page.query.get('url') ?? paramMissing('url');
		const customSlug = page.query.get('customSlug');
		const description = page.query.get('description');

		navigating.subscribe((x) => console.log({ x }));

		const res = await fetch(`${getHost()}/api/links`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({ url, customSlug, description } as NewLink)
		});

		if (res.status === 409) return { props: { shortUrlAlreadyExists: true, shortUrl: '' } };
		if (!res.ok) throw new Error(`Error ${res.status} from server  ${await res.text()}`);

		return {
			props: {
				shortUrl: ((await res.json()) as Link).shortUrl,
				url,
				customSlug
			}
		};
	}
</script>

<script lang="ts">
	import CreateLink from './_createLink.svelte';
	import { onMount } from 'svelte';
	import confetti from 'canvas-confetti';

	export let shortUrl: string;
	export let shortUrlAlreadyExists = false;

	export let url: string;
	export let customSlug: string;
	export let mode: 'custom' | 'random	';

	onMount(() => {
		// TODO: find a way to not fire confetti & create new link on browser back. Sveltekit session? SessionCache?
		confetti({ colors: ['#3291ff', '#0070f3'] });
	});
</script>

<CreateLink {shortUrl} {url} {customSlug} {mode} />

{#if shortUrlAlreadyExists}
	<div><mark>Name already taken. Choose another one.</mark></div>
{/if}
