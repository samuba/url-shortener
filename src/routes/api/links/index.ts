import { writeKey } from '$lib/kv';
import type { Link, NewLink } from 'src/global';

const uniqueId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

/* coffee script
alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("")
base = alphabet.length

exports.encode = (i) ->
  return alphabet[0] if i is 0
  s = ""
  while i > 0
    s += alphabet[i % base]
    i = parseInt(i / base, 10)

  s.split("").reverse().join("")


exports.decode = (s) ->
  i = 0
  for c in s
    i = i * base + alphabet.indexOf c
  i


# Poor man's test case
if require.main is module
  for i in [0..100000]
    if exports.decode(exports.encode(i)) isnt i
      console.log exports.encode(i), i, "is not", exports.decode(exports.encode(i))
      console.log "error"
      break

  console.log "done"

*/
export async function post(request) {
	console.log('body', request);
	const body = request.body as NewLink;
	if (!body.url) {
		return { status: 400, body: { error: 'url is required' } };
	}

	const id = uniqueId();
	const shortUrl = id;
	try {
		await writeKey(id, {
			url: body.url,
			shortUrl,
			id,
			description: body.description,
			userId: undefined
		} as Link);
	} catch (error) {
		return { status: 500, body: { error: error.message } };
	}

	return {
		status: 200,
		body: {
			shortUrl: id
		}
	};
}
