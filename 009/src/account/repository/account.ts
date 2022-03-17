import { Collection, Database } from '../../config/deps.ts';
import Repository from '../../library/repository.ts';
import { AccountSchema } from '../types.ts';

export default class Account<T = AccountSchema> extends Repository<T> {
	constructor(db: Database) {
		super(db.collection<T>('account'));
		this.coll.createIndexes({
			indexes: [
				{
					key: { email: 1 },
					name: 'email_1',
					unique: true,
					background: true,
				},
			],
		});
	}
}
