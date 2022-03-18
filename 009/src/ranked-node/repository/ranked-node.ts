import { Database } from '../../config/deps.ts';
import Repository from '../../library/repository.ts';
import { RankedNodeSchema } from '../types.ts';

export default class<T = RankedNodeSchema> extends Repository<T> {
	constructor(db: Database) {
		super(db.collection<T>('ranked-node'));
		this.coll.createIndexes({
			indexes: [
				{
					key: { node: 1 },
					name: 'node_1',
					background: true,
				},
			],
		});
	}
}
