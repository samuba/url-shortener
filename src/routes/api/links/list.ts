import { listKeys } from '$lib/kv';
import type { Link } from 'src/global';

export async function get() {
	const links = await listKeys();
	if (!links) {
		return { status: 404, body: { error: 'links not found' } };
	}

	try {
		return {
			status: 200,
			body: links
		};
	} catch (error) {
		return { status: 500, body: { error: error.message } };
	}
}
