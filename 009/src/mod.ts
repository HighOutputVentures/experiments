import Server from './services/api/mod.ts';
import Account from './services/account/mod.ts';
import Container from './library/container.ts';
import { IService } from './types.ts';
import DatabaseConnection from './config/db.ts';
import Project from './services/project/mod.ts';
import RankedNode from './services/ranked-node/mod.ts';
import Column from './services/column/mod.ts';

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
