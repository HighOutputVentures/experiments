import DatabaseConnection from '../config/db.ts';
import Container from '../library/container.ts';
import { IAccount } from './types.ts';
import AccountController from './controllers/account.ts';

export default class Account {
	public controller: AccountController;

	constructor(dbConnection: DatabaseConnection) {
		const container = new Container<IAccount>({
			db: dbConnection.getDatabase(Deno.env.get('MONGO_DB') || 'deno'),
		});

		this.controller = new AccountController(container);
	}
}
