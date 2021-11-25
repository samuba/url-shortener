import { KV_NAMESPACE, CF_ACCOUNT_ID, CF_TOKEN } from './env';

const kvUrl = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE}`;
const headers = { Authorization: `Bearer ${CF_TOKEN}` };

export async function writeKey(key: string, obj: Record<string, any>) {
	const result = await fetch(`${kvUrl}/values/${key}`, {
		method: 'PUT',
		headers,
		body: JSON.stringify(obj)
	});
	if (result.status !== 200) {
		const reason = await result.json();
		throw new Error(`Error writing key ${key}\n` + JSON.stringify(reason, null, 2));
	}
}

export async function readKey(key: string) {
	const result = await fetch(`${kvUrl}/values/${key}`, {
		method: 'GET',
		headers
	});
	if (result.status === 404) {
		return undefined;
	}
	if (result.status !== 200) {
		const reason = await result.json();
		throw new Error(`Error reading key ${key}\n` + JSON.stringify(reason, null, 2));
	}
	return await result.json();
}

export async function listKeys() {
	return { kv: kvUrl };
	console.log({ CF_ACCOUNT_ID });
	const res = await fetch(`${kvUrl}/keys`, {
		method: 'GET',
		mode: 'no-cors',
		headers
	});
	console.log({ result: res });
	if (res.status === 404) {
		return undefined;
	}
	if (res.status !== 200) {
		const reason = await res.json();
		throw new Error(`Error listing keys\n` + JSON.stringify(reason, null, 2));
	}
	const result = await res.json();
	console.log({ result: result });
	return result;
}
