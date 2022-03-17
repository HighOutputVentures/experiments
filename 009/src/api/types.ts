import { Bson, ParameterizedContext } from '../config/deps.ts';
import Account from '../account/mod.ts';

export type Node = {
	_id: Bson.ObjectId;
};

export type Context = {
	services: {
		account: Account;
	};
} & ParameterizedContext;
