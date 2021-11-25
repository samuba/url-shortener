export async function get(req) {
	return {
		status: 200,
		body: JSON.stringify(req, null, 2)
	};
}
