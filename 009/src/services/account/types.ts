import { Database } from '../../config/deps.ts';
import AccountController from './controllers/account.ts';

export interface IAccount {
	db: Database;
	controller: AccountController;
}
