export * from './account/types.ts';
import Account from './account/mod.ts';
import DatabaseConnection from './config/db.ts';
import { Bson } from './config/deps.ts';

export interface IService {
	account: Account;
	dbConnection: DatabaseConnection;
}

export type BsonId = Bson.ObjectId;
