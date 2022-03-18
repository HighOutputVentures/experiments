import { Bson, ParameterizedContext } from '../config/deps.ts';
import Account from '../account/mod.ts';
import { BsonId } from '../types.ts';
import Project from '../project/mod.ts';
import RankedNode from '../ranked-node/mod.ts';

export type Node = {
	_id: Bson.ObjectId;
};

export type Context =
	& {
		services: {
			account: Account;
			project: Project;
			rankedNode: RankedNode;
		};
	}
	& ParameterizedContext<{
		user: { id: BsonId };
	}>;
