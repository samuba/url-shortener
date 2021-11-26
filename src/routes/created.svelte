<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page }) {
		const url = page.query.get('url');
		console.log(url);
		return {
			status: 200,
			props: {
				url
			}
		};
	}
</script>

<script lang="ts">
	export let url: string;
</script>

yo is: {url}
