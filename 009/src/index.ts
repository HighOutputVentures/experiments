import Server from './server.ts';
(async () => {
	const server = new Server();
	await server.start();
})();
