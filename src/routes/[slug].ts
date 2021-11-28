import { errorResponse, getLinkId } from '$lib/common';
import { readKey } from '$lib/kv';
import type { Link } from 'src/global';

export async function get({ params }) {
	console.log('handled by: [slug].ts');
	try {
		const linkId = getLinkId(params.slug);
		const link = (await readKey(linkId)) as Link;
		if (!link)
			return errorResponse(
				`Link not found. If you just created this link, try again in 3 seconds. Creating the link can sometimes takes a couple of seconds.`,
				404
			);

		return {
			status: 301,
			headers: {
				Location: link.url
			}
		};
	} catch (error) {
		return errorResponse(error, 500);
	}
}
