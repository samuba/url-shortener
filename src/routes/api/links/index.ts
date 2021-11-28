import { errorResponse, getLinkId, randomShortId } from '$lib/common';
import { readKey, writeKey } from '$lib/kv';
import type { Link, NewLink } from 'src/global';

export async function post(request) {
	const body = request.body as NewLink;
	if (!body.url) {
		return errorResponse('url is required', 400);
	}

	if (body.customSlug && (await shortUrlExists(body.customSlug))) {
		return errorResponse('shortUrl already exists', 409);
	}

	const shortUrl = body.customSlug ?? (await uniqueId());
	const id = getLinkId(shortUrl);
	try {
		await writeKey(id, {
			url: body.url.trim(),
			shortUrl,
			id,
			description: body.description,
			userId: undefined,
			createdAt: new Date()
		} as Link);
	} catch (error) {
		return errorResponse(error.message, 500);
	}

	return {
		status: 200,
		body: {
			shortUrl
		}
	};
}

async function shortUrlExists(shortUrl: string) {
	return (await readKey(getLinkId(shortUrl))) !== undefined;
}

async function uniqueId() {
	let id = randomShortId();
	while ((await readKey(getLinkId(id))) !== undefined) {
		id = randomShortId();
	}
	return id;
}
