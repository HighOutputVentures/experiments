import Server from './services/api/mod.ts';
import Account from './services/account/mod.ts';
import Container from './library/container.ts';
import { IService } from './types.ts';
import DatabaseConnection from './config/db.ts';
import Project from './services/project/mod.ts';
import RankedNode from './services/ranked-node/mod.ts';
import Column from './services/column/mod.ts';
import Card from './services/card/mod.ts';

(async () => {
	const dbConnection = new DatabaseConnection();
	await dbConnection.connect();

	[Account, Project, RankedNode, Column, Card].forEach((service) =>
		service.initialize(dbConnection)
	);

	const container = new Container<IService>({
		account: Account,
		project: Project,
		rankedNode: RankedNode,
		column: Column,
		card: Card,
		dbConnection,
	});

	await new Server(container, Deno.env.get('PORT')).start();
})();
