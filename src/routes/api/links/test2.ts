import { KV_NAMESPACE } from '$lib/env';

export async function get() {
	return {
		status: 200,
		body: KV_NAMESPACE
	};
}
