export async function get() {
	return {
		status: 200,
		body: KV_NAMESPACE
	};
}
