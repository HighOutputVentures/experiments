// deno-lint-ignore-file require-await
import logger from 'https://deno.land/x/oak_logger@1.0.0/mod.ts';
import { Application, applyGraphQL, Router } from './config/deps.ts';
import { typeDefs } from './type-defs/index.ts';
import { resolvers } from './resolvers/index.ts';

export default class Server {
	port: number;
	app: Application;
	constructor(port?: number) {
		this.port = port || 8080;
		this.app = new Application();

		this.initializeMiddlewares();
		this.initializeSchema();
	}

	public initializeMiddlewares() {
		this.app.use(logger.logger);
		// this.app.use(logger.responseTime);
	}

	public async initializeSchema() {
		const GraphQLService = await applyGraphQL<Router>({
			Router,
			path: '/graphql',
			typeDefs,
			resolvers,
			// deno-lint-ignore no-explicit-any
			context: (ctx: any) => {},
		});

		this.app.use(GraphQLService.routes(), GraphQLService.allowedMethods());
	}

	public async start() {
		console.log(`http://localhost:${this.port}/graphql`);
		await this.app.listen(`localhost:${this.port}`);
	}
}
