export * from './services/account/types.ts';
import Account from './services/account/mod.ts';
import DatabaseConnection from './config/db.ts';
import { Bson } from './config/deps.ts';
import Project from './services/project/mod.ts';
import RankedNode from './services/ranked-node/mod.ts';
import Column from './services/column/mod.ts';

export interface IService {
	account: Account;
	project: Project;
	rankedNode: RankedNode;
	column: Column;
	dbConnection: DatabaseConnection;
}

export type BsonId = Bson.ObjectId;

export type ProjectSchema = {
	_id: Bson.ObjectId;
	title: string;
	creator: Bson.ObjectId;
	members: Bson.ObjectId[];
	columns: Bson.ObjectId[];
	dateTimeCreated: Date;
};

export type AccountSchema = {
	_id: Bson.ObjectId;
	email: string;
	password?: string;
	dateTimeCreated: Date;
};

export type RankedNodeSchema = {
	_id: Bson.ObjectId;
	parent: Bson.ObjectId;
	node: Bson.ObjectId;
	rank: number;
	dateTimeCreated: Date;
};
