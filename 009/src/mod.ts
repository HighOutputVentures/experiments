import Server from './api/mod.ts';
import Account from './account/mod.ts';
import Container from './library/container.ts';
import { IService } from './types.ts';
import DatabaseConnection from './config/db.ts';
import Project from './project/mod.ts';
import RankedNode from './ranked-node/mod.ts';
import Column from './column/mod.ts';

(async () => {
	const dbConnection = new DatabaseConnection();
	await dbConnection.connect();
	const container = new Container<IService>({
		account: new Account(dbConnection),
		project: new Project(dbConnection),
		rankedNode: new RankedNode(dbConnection),
		column: new Column(dbConnection),
		dbConnection,
	});

	await new Server(container).start();
})();
