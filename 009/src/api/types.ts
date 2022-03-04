import { ParameterizedContext } from '../config/deps.ts';
import Account from '../account/mod.ts';

export type Context = {
	services: {
		account: Account;
	};
} & ParameterizedContext;
