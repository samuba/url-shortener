<script lang="ts">
	import { getHost } from '$lib/host';
	import IconClipboard from '$lib/IconClipboard.svelte';

	export let shortUrl = '';

	$: fqdnShortUrl = `${getHost()}/${shortUrl}`;
	let url = '';
	let btnLabel = 'Shorten';
	let btnDisabled = false;
	let mode = 'custom';

	function showLoading(show: boolean) {
		btnLabel = show ? 'shortening...' : 'Shorten';
		setTimeout(() => (btnDisabled = show), 100); // cuz click of btn would not propagate to form
	}
</script>

<form action="/created" method="get" on:submit={() => showLoading(true)}>
	<div>
		<input bind:group={mode} value="random" type="radio" name="mode" id="random-box" />
		<label for="random-box">Random</label>
		<input bind:group={mode} value="custom" type="radio" name="mode" id="custom-box" />
		<label for="custom-box">Custom</label>
	</div>

	<div>
		<input
			bind:value={url}
			name="url"
			required
			type="url"
			placeholder="https://create.party"
			pattern="http:\/\/.*|https:\/\/.*"
			title="URL you want to shorten"
		/>
		<input disabled={btnDisabled} value={btnLabel} type="submit" />
	</div>

	{#if mode === 'custom'}
		<div>
			samu.bar/
			<input
				name="customSlug"
				required
				pattern="[a-zA-Z0-9_-]*$"
				type="text"
				placeholder="negroni-on-the-rocks"
			/>
		</div>
	{/if}
</form>

{#if shortUrl}
	<div>
		<br />
		Enjoy your shortened URL: <br />
		<a href={fqdnShortUrl} target="_blank">{fqdnShortUrl.replace('https://', '')}</a>
		<button
			on:click={() => navigator.clipboard.writeText(fqdnShortUrl)}
			title="copy to clipboard"
			style="margin-left: 0.5rem;"
		>
			<IconClipboard style="height: 1rem;" color="#fff" />
		</button>
	</div>
{/if}

<style>
	div {
		margin-top: 1rem;
	}

	input[type='radio'] {
		margin-left: 1rem;
	}
</style>
