<script lang="ts">
	import { goto } from '$app/navigation';
	import { getHost } from '$lib/host';

	export let shortUrl = '';

	$: fqdnShortUrl = `${getHost()}/${shortUrl}`;
	let url = shortUrl ? '' : 'https://www.google.com';
	let btnLabel = 'Shorten!';
	let btnDisabled = false;

	function showLoading(show: boolean) {
		btnLabel = show ? 'shortening...' : 'Shorten!';
		setTimeout(() => (btnDisabled = show), 100); // cuz click of btn would not progate to form
	}
</script>

<form action="/created" method="get">
	<input
		bind:value={url}
		required
		type="url"
		placeholder="https://example.com"
		pattern="http:\/\/.*|https:\/\/.*"
		name="url"
	/>
	<input on:click={() => showLoading(true)} disabled={btnDisabled} value={btnLabel} type="submit" />
</form>

{#if shortUrl}
	<p>Your shortened URL:<br /> <a href={fqdnShortUrl}>{fqdnShortUrl}</a></p>
{/if}
