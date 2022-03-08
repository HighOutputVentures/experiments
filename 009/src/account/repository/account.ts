import { Database } from '../../config/deps.ts';
import Repository from '../../library/repository.ts';
import { AccountSchema } from '../types.ts';

export default class Account<T = AccountSchema> extends Repository<T> {
	constructor(db: Database) {
		super(db.collection<T>('account'));
	}
}
