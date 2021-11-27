import { errorResponse, getLinkId } from '$lib/common';
import { readKey } from '$lib/kv';
import type { Link } from 'src/global';

export async function get({ params }) {
	console.log('handled by: [slug].ts');
	try {
		const linkId = getLinkId(params.slug);
		const link = (await readKey(linkId)) as Link;
		if (!link) return errorResponse(`link "${linkId}" not found`, 404);

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
