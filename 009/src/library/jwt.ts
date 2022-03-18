import { jsonwebtoken } from '../config/deps.ts';

const key = await crypto.subtle.importKey(
	'raw',
	new TextEncoder().encode(Deno.env.get('SECRET_KEY') || 'secret'),
	{ name: 'HMAC', hash: 'SHA-512' },
	false,
	['sign', 'verify'],
);

export const generateJWT = (id: string) =>
	jsonwebtoken.create({ alg: 'HS512', typ: 'JWT' }, {
		sub: id,
		exp: jsonwebtoken.getNumericDate(30 * 24 * 60 * 60),
	}, key);

export const validateJWT = (
	token: string,
) => jsonwebtoken.verify(token, key) as Promise<{ sub: string }>;
