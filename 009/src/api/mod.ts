// deno-lint-ignore-file require-await
import logger from 'https://deno.land/x/oak_logger@1.0.0/mod.ts';
import { Application, applyGraphQL, Router } from '../config/deps.ts';
import { typeDefs } from './type-defs/index.ts';
import { resolvers } from './resolvers/index.ts';
import Container from '../library/container.ts';
import { IService } from '../types.ts';
import { Context } from './types.ts';

export default class Server {
	port: number;
	app: Application;
	container: Container<IService>;

	constructor(container: Container<IService>, port?: number) {
		this.port = port || 8080;
		this.app = new Application();
		this.container = container;
		this.initializeMiddlewares();
		this.initializeSchema();
	}
	public initializeDb() {
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
			context: (ctx: Context) => {
				ctx.services = {
					account: this.container.get('account'),
				};
				return ctx;
			},
		});

		this.app.use(GraphQLService.routes(), GraphQLService.allowedMethods());
	}

	public async start() {
		console.log(`http://localhost:${this.port}/graphql`);
		await this.app.listen(`localhost:${this.port}`);
	}
}
