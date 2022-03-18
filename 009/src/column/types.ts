import { Bson, Database } from '../config/deps.ts';

export interface IColumn {
	db: Database;
}

export type ColumnSchema = {
	_id: Bson.ObjectId;
	title: string;
	project: Bson.ObjectId;
	cards: Bson.ObjectId[];
	dateTimeCreated: Date;
};
