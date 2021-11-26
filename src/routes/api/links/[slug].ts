import { getLinkId } from '$lib/common';
import { readKey } from '$lib/kv';

export async function get({ params }) {
	const linkId = getLinkId(params.slug);
	const link = await readKey(linkId);
	if (!link) {
		return { status: 404, body: { error: 'link not found' } };
	}

	try {
		return {
			status: 200,
			body: link
		};
	} catch (error) {
		return { status: 500, body: { error: error.message } };
	}
}
