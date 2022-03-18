import Server from './api/mod.ts';
import Account from './account/mod.ts';
import Container from './library/container.ts';
import { IService } from './types.ts';
import DatabaseConnection from './config/db.ts';
import Project from './project/mod.ts';

(async () => {
	const dbConnection = new DatabaseConnection();
	await dbConnection.connect();
	const container = new Container<IService>({
		account: new Account(dbConnection),
		project: new Project(dbConnection),
		dbConnection,
	});

	await new Server(container).start();
})();
