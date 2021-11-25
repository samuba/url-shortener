function loadFromNodeEnv(envName: string): string {
	try {
		return process?.env[envName];
	} catch {
		return undefined;
	}
}

// in cloudflare workers envs are available as global variables
export const cfAccount = loadFromNodeEnv('CF_ACCOUNT') ?? CF_ACCOUNT;
export const cfToken = loadFromNodeEnv('CF_TOKEN') ?? CF_TOKEN;
export const kvNamespace = loadFromNodeEnv('KV_NAMESPACE') ?? KV_NAMESPACE;
