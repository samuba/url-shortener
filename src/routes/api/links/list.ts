import { listKeys } from '$lib/kv';

export async function get() {
	try {
		return {
			status: 200,
			body: await listKeys()
		};
	} catch (error) {
		return { status: 500, body: { error: error.message } };
	}
}
