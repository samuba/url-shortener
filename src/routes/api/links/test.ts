import { listKeys } from '$lib/kv';

export async function get() {
	return {
		status: 200,
		body: await listKeys()
	};
}