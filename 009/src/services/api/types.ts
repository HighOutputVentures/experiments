import { Bson, ParameterizedContext } from '../../config/deps.ts';
import { BsonId, IService } from '../../types.ts';
import loaders from './loaders/mod.ts';
export type Node = {
	_id: Bson.ObjectId;
};

export type Context =
	& {
		services: Omit<IService, 'dbConnection'>;
	}
	& {
		loaders: ReturnType<typeof loaders>;
	}
	& ParameterizedContext<{
		user: { id: BsonId };
	}>;
