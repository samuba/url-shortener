function loadFromNodeEnv(envName: string): string {
	try {
		return process?.env[envName];
	} catch {
		return undefined;
	}
}

// in cloudflare workers envs are available as global variables
declare global {
	const KV_NAMESPACE: string;
	const CF_ACCOUNT: string;
	const CF_TOKEN: string;
	const myKVNamespace: KVNamespace;
}

// this is a hack and should be removed as soon as this is fixed: https://github.com/sveltejs/kit/issues/2606
// see injectEnvs.js
export const cfAccount = loadFromNodeEnv('CF_ACCOUNT') ?? '#CF_ACCOUNT#';
export const cfToken = loadFromNodeEnv('CF_TOKEN') ?? '#CF_TOKEN#';
export const kvNamespace = loadFromNodeEnv('KV_NAMESPACE') ?? '#KV_NAMESPACE#';
