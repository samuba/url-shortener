import { errorResponse, getLinkId } from '$lib/common';
import { readKey } from '$lib/kv';

export async function get({ params }) {
	const linkId = getLinkId(params.slug);
	const link = await readKey(linkId);
	if (!link) {
		return errorResponse(`link "${linkId}" not found`, 404);
	}

	try {
		return {
			status: 200,
			body: link
		};
	} catch (error) {
		return errorResponse(error, 500);
	}
}
