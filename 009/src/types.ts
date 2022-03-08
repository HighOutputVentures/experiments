export * from './account/types.ts';
import Account from './account/mod.ts';
import DatabaseConnection from './config/db.ts';

export interface IService {
	account: Account;
	dbConnection: DatabaseConnection;
}
