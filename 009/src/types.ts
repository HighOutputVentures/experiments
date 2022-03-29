export * from './services/account/types.ts';
import { AccountService } from './services/account/mod.ts';
import DatabaseConnection from './config/db.ts';
import { Bson } from './config/deps.ts';
import { ProjectService } from './services/project/mod.ts';
import { RankedNodeService } from './services/ranked-node/mod.ts';
import { ColumnService } from './services/column/mod.ts';
import { CardService } from './services/card/mod.ts';

export interface IService {
	account: AccountService;
	project: ProjectService;
	rankedNode: RankedNodeService;
	column: ColumnService;
	card: CardService;
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

export type ColumnSchema = {
	_id: Bson.ObjectId;
	title: string;
	project: Bson.ObjectId;
	dateTimeCreated: Date;
};

export type CardSchema = {
	_id: Bson.ObjectId;
	title: string;
	description?: string;
	assignee?: Bson.ObjectId;
	reporter: Bson.ObjectId;
	project: Bson.ObjectId;
	dateTimeStarted?: Date;
	dateTimeFinished?: Date;
	dateTimeCreated: Date;
};
