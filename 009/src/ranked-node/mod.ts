import DatabaseConnection from '../config/db.ts';
import Container from '../library/container.ts';
import { IRankedNode } from './types.ts';
import Controller from './controllers/ranked-node.ts';

export default class {
	public controller: Controller;

	constructor(dbConnection: DatabaseConnection) {
		const container = new Container<IRankedNode>({
			db: dbConnection.getDatabase(Deno.env.get('MONGO_DB') || 'deno'),
		});

		this.controller = new Controller(container);
	}
}
