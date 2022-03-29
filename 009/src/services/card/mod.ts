import DatabaseConnection from '../../config/db.ts';
import Container from '../../library/container.ts';
import { ICard } from './types.ts';
import Controller from './controllers/card.ts';

export class CardService extends Container<Partial<ICard>> {
	public initialize(dbConnection: DatabaseConnection) {
		this.bind('db').to(
			dbConnection.getDatabase(Deno.env.get('MONGO_DB') || 'deno'),
		);
		this.bind('controller').to(
			new Controller(this),
		);
	}

	public get controller() {
		return this.get<Controller>('controller');
	}
}

export default new CardService();
