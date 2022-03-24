// deno-lint-ignore-file require-await
import logger from 'https://deno.land/x/oak_logger@1.0.0/mod.ts';
import {
	Application,
	applyGraphQL,
	Bson,
	GraphQLError,
	oakCors,
	Router,
} from '../../config/deps.ts';
import typeDefs from './type-defs/schema.ts';
import loadResolvers from '../../library/load-resolvers.ts';
import Container from '../../library/container.ts';
import { IService } from '../../types.ts';
import { Context } from './types.ts';
import { validateJWT } from '../../library/jwt.ts';
import uploadFile from '../../library/upload-file.ts';

export default class Server {
	port: number;
	app: Application;
	container: Container<IService>;

	constructor(container: Container<IService>, port?: number) {
		this.port = port || 9090;
		this.app = new Application();
		this.container = container;
		this.initializeMiddlewares();
		this.initializeAuthorization();

		this.initializeSchema();
		this.initializeUploads();
	}

	public initializeMiddlewares() {
		// this.app.use(logger.logger);

		this.app.use(
			oakCors({
				origin: true,
			}),
		);
	}

	public initializeAuthorization() {
		this.app.use(
			async (
				ctx: Omit<Context, 'services'>,
				// deno-lint-ignore no-explicit-any
				next: () => Promise<any>,
			) => {
				const authorization = ctx.request.headers.get('authorization');
				if (!authorization) {
					await next();
					return;
				}

				const [type, token] = authorization.split(' ');

				if (type.toLowerCase() !== 'bearer') {
					throw new GraphQLError(
						`\`${type}\` authorization type is not supported.`,
					);
				}

				try {
					const payload = await validateJWT(token);
					ctx.state.user = {
						id: new Bson.ObjectId(payload.sub),
					};
				} catch (error) {
					throw new GraphQLError(
						error.message,
					);
				}

				await next();
			},
		);
	}

	public initializeUploads() {
		this.app.use(uploadFile);
	}

	public async initializeSchema() {
		const resolvers = await loadResolvers('./src/services/api/resolvers');
		const GraphQLService = await applyGraphQL<Router>({
			Router,
			path: '/graphql',
			typeDefs: typeDefs,
			resolvers,
			context: async (ctx: Context) => {
				ctx.services = {
					account: this.container.get('account'),
					project: this.container.get('project'),
					rankedNode: this.container.get('rankedNode'),
					column: this.container.get('column'),
					card: this.container.get('card'),
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
