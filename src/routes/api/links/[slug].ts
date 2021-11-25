import { readKey } from '$lib/kv';
import type { Link } from 'src/global';

export async function get({ params }) {
	const shortUrl = params.slug;
	if (!shortUrl) {
		return { status: 400, body: { error: 'shortUrl is required' } };
	}

	const link = await readKey(shortUrl);
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
