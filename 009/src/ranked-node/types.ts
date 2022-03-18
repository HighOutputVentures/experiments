import { Bson, Database } from '../config/deps.ts';

export interface IRankedNode {
	db: Database;
}

export type RankedNodeSchema = {
	_id: Bson.ObjectId;
	parent: Bson.ObjectId;
	child: Bson.ObjectId;
	rank: number;
	dateTimeCreated: Date;
};
