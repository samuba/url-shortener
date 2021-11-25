<script lang="ts">
	import type { Link, NewLink } from 'src/global';
	import { onMount } from 'svelte';

	let shortUrl = '';
	let url = 'https://www.google.com';
	let btnLabel = 'Shorten!';
	let btnDisabled = false;

	let allLinks: Link[] = [];

	async function shortenUrl() {
		showLoading(true);
		const res = await fetch(`/api/links`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				url,
				description: ''
			} as NewLink)
		});
		const linkRes = (await res.json()) as Link;
		console.log({ res });
		shortUrl = `${location.protocol}//${window.location.host}/${linkRes.shortUrl}`;
		url = '';
		showLoading(false);
	}

	function showLoading(show: boolean) {
		btnLabel = show ? 'shortening...' : 'Shorten!';
		btnDisabled = show;
	}

	onMount(async () => {
		const res = await fetch(`/api/links/list`, {
			headers: { 'Content-Type': 'application/json' }
		});
		if (!res.ok) {
			console.log('list', res);
			console.log('list.body', res.text());
			return;
		}
		allLinks = (await res.json()) as Link[];
	});
</script>

<header>
	<h1>Kurzer</h1>
	<p>shortens your URLs</p>
</header>

<form action="" on:submit|preventDefault={shortenUrl}>
	<label for="url-box">URL</label>
	<input
		bind:value={url}
		required
		type="url"
		placeholder="https://example.com"
		pattern="http:\/\/.*|https:\/\/.*"
	/>
	<input disabled={btnDisabled} type="submit" value={btnLabel} />
</form>

{#if shortUrl}
	<p>Your shortened URL is: <a href={shortUrl}>{shortUrl}</a></p>
{/if}

<pre>
	{JSON.stringify(allLinks, null, 2)}
</pre>
