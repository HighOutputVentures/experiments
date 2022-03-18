export * from './account/types.ts';
import Account from './account/mod.ts';
import DatabaseConnection from './config/db.ts';
import { Bson } from './config/deps.ts';
import Project from './project/mod.ts';

export interface IService {
	account: Account;
	project: Project;
	dbConnection: DatabaseConnection;
}

export type BsonId = Bson.ObjectId;

export type ProjectSchema = {
	_id: Bson.ObjectId;
	title: string;
	creator: Bson.ObjectId;
	members: Bson.ObjectId[];
	dateTimeCreated: Date;
};
