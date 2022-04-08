import DatabaseConnection from '../../config/db.ts';
import Container from '../../library/container.ts';
import { IAccount } from './types.ts';
import AccountController from './controllers/account.ts';

export class AccountService extends Container<Partial<IAccount>> {
	public initialize(dbConnection: DatabaseConnection) {
		const db = dbConnection.getDatabase(Deno.env.get('MONGO_DB') || 'deno');
		this.bind('db').to(db);
		this.bind('controller').to(
			new AccountController(this),
		);
	}

	public get controller() {
		return this.get<AccountController>('controller');
	}
}

export default new AccountService();
