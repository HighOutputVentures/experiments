import { serve } from 'https://deno.land/std@0.136.0/http/server.ts';
serve(() =>
	new Response('Hello World\n', {
		headers: {
			'Content-Type': 'text/plain',
		},
	}), { port: 8000 });
console.log('http://localhost:8000/');
