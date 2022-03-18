import { Database } from '../../config/deps.ts';
import Repository from '../../library/repository.ts';
import { RankedNodeSchema } from '../types.ts';

export default class<T = RankedNodeSchema> extends Repository<T> {
	constructor(db: Database) {
		super(db.collection<T>('ranked-node'));
		this.coll.createIndexes({
			indexes: [
				{
					key: { parent: 1, child: 1 },
					name: 'parent_1_child_1',
					background: true,
					unique: true,
				},
				{
					key: { parent: 1 },
					name: 'parent_1',
					background: true,
				},
			],
		});
	}
}
