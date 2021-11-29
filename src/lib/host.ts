import { dev } from '$app/env';

export function getHost(): string {
	if (dev) {
		return 'http://localhost:3000';
	}
	return 'https://samu.bar';
}
