import DatabaseConnection from '../../config/db.ts';
import Container from '../../library/container.ts';
import { ICard } from './types.ts';
import Controller from './controllers/card.ts';

export default class {
	public controller: Controller;

	constructor(dbConnection: DatabaseConnection) {
		const container = new Container<ICard>({
			db: dbConnection.getDatabase(Deno.env.get('MONGO_DB') || 'deno'),
		});

		this.controller = new Controller(container);
	}
}
