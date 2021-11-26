import { getLinkId } from '$lib/common';
import { readKey } from '$lib/kv';
import type { Link } from 'src/global';

export async function get({ params }) {
	try {
		const linkId = getLinkId(params.slug);
		const link = (await readKey(linkId)) as Link;
		if (!link) {
			return { status: 404, body: { error: 'link not found' } };
		}

		return {
			status: 301,
			headers: {
				Location: link.url
			}
		};
	} catch (error) {
		return { status: 500, body: { error: error.message } };
	}
}
