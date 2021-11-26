export function randomShortId(): string {
	const chars = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789'; // no l, O, 0 to avoid confusion
	return '######'.replace(/[#]/g, () => chars[Math.floor(Math.random() * chars.length)]);
}

export const getLinkId = (shortId: string): string => `link|${shortId}`;
