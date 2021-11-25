import dotenv from 'dotenv';
dotenv.config();

function loadEnv(envName: string): string {
	try {
		return process?.env[envName];
		// return (import.meta?.env?.[envName] as string) ?? eval(envName);
	} catch (e) {
		console.log('process is not defined', e);
	}
	return eval(envName); // cloudflare worker puts envs in global namespace as variables
	// console.log('asd');
	// if (eval('process') && process?.env) {
	// 	return process.env[envName];
	// } else {
	// }
}

export const CF_ACCOUNT_ID = loadEnv('CF_ACCOUNT');
export const KV_NAMESPACE = loadEnv('KV_NAMESPACE');
export const CF_TOKEN = loadEnv('CF_TOKEN');
