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
		btnDisabled = show;
	}
</script>

<form
	on:submit|preventDefault={() => {
		showLoading(true);
		goto(`/created?url=${url}`);
	}}
>
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
	<p>Your shortened URL:<br /> <a href={fqdnShortUrl}>{fqdnShortUrl}</a></p>
{/if}
