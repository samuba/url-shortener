import { getLinkId, randomShortId } from '$lib/common';
import { readKey, writeKey } from '$lib/kv';
import type { Link, NewLink } from 'src/global';

export async function post(request) {
	console.log('body', request);
	const body = request.body as NewLink;
	if (!body.url) {
		return { status: 400, body: { error: 'url is required' } };
	}

	const shortUrl = await uniqueId();
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
		return { status: 500, body: { error: error.message } };
	}

	return {
		status: 200,
		body: {
			shortUrl
		}
	};
}

async function uniqueId() {
	let id = randomShortId();
	while ((await readKey(getLinkId(id))) !== undefined) {
		id = randomShortId();
	}
	return id;
}
