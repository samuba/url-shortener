import fs from 'fs';
import https from 'https';
// this is a hack and should be removed as soon as this is fixed: https://github.com/sveltejs/kit/issues/2606

console.log('inject envs from server...');

https
	.get('https://kurzer-secrets.szb.workers.dev', (res) => {
		let body = '';
		res.on('data', (chunk) => (body += chunk));
		res.on('end', () => {
			try {
				let envs = JSON.parse(body);
				try {
					let filePath = '.svelte-kit/cloudflare/_worker.js';
					fs.writeFileSync(
						filePath,
						fs.readFileSync(filePath, 'utf8').replace(`#CF_ACCOUNT#`, envs.CF_ACCOUNT)
					);
					fs.writeFileSync(
						filePath,
						fs.readFileSync(filePath, 'utf8').replace(`#CF_TOKEN#`, envs.CF_TOKEN)
					);
					fs.writeFileSync(
						filePath,
						fs.readFileSync(filePath, 'utf8').replace(`#KV_NAMESPACE#`, envs.KV_NAMESPACE)
					);
				} catch (err) {
					console.error('error injecting envs', err);
				}
			} catch (error) {
				console.error(error.message);
			}
		});
	})
	.on('error', (error) => {
		console.error(error.message);
	});
