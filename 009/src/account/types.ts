import { Bson, Database } from '../config/deps.ts';

export interface IAccount {
	db: Database;
}

export type AccountSchema = {
	_id: Bson.ObjectId;
	email: string;
	password?: string;
	dateTimeCreated: Date;
};
