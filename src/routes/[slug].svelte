<script context="module" lang="ts">
	import { getHost } from '$lib/host';
	import type { Link } from 'src/global';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page }) {
		const { slug } = page.params;
		try {
			const res = await fetch(`${getHost()}/api/links/${slug}`);
			console.log({ res });
			if (res.status === 404) {
				return {
					status: 404,
					title: 'Not Found',
					content: 'Sorry, the page you were looking for was not found.'
				};
			}
			return {
				status: 301,
				redirect: ((await res.json()) as Link).url
			};
		} catch (error) {
			console.error(error);
			return {
				status: 500,
				content: error.message
			};
		}
	}
</script>
