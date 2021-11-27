export function randomShortId(): string {
	const chars = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789'; // no l, O, 0 to avoid confusion
	return '#####'.replace(/[#]/g, () => chars[Math.floor(Math.random() * chars.length)]);
}

export const getLinkId = (shortId: string): string => `link|${shortId}`;

export const errorResponse = (err: string | Error, status = 400) => {
	if (typeof err === 'string') {
		console.error(err);
		return {
			status,
			body: err
		};
	}
	return {
		status,
		body: err.message
	};
};
