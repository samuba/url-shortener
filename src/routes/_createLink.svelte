<script lang="ts">
	import { getHost } from '$lib/host';
	import IconClipboard from '$lib/IconClipboard.svelte';

	export let shortUrl = '';

	$: fqdnShortUrl = `${getHost()}/${shortUrl}`;
	let url = '';
	let btnLabel = 'Shorten';
	let btnDisabled = false;

	function showLoading(show: boolean) {
		btnLabel = show ? 'shortening...' : 'Shorten';
		setTimeout(() => (btnDisabled = show), 100); // cuz click of btn would not progate to form
	}
</script>

<form action="/created" method="get" on:submit={() => showLoading(true)}>
	<input
		bind:value={url}
		required
		type="url"
		placeholder="e.g. https://example.com"
		pattern="http:\/\/.*|https:\/\/.*"
		name="url"
	/>
	<input disabled={btnDisabled} value={btnLabel} type="submit" />
</form>

{#if shortUrl}
	<p>
		Your shortened URL:<br />
		<a href={fqdnShortUrl} target="_blank">{fqdnShortUrl.replace('https://', '')}</a>
		<button
			on:click={() => navigator.clipboard.writeText(fqdnShortUrl)}
			title="copy to clipboard"
			style="margin-left: 0.5rem;"
		>
			<IconClipboard style="height: 1rem;" color="#fff" />
		</button>
	</p>
{/if}
