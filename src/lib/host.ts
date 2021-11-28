import { dev } from '$app/env';

export function getHost(): string {
	if (dev) {
		return 'http://localhost:3000';
	} else {
		return `https://samu.bar`; // when running via svelte-kit preview you need to change this to localhost also
	}
}
