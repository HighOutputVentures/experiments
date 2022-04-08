import { Database } from '../../../config/deps.ts';
import Repository from '../../../library/repository.ts';
import { CardSchema } from '../../../types.ts';

export default class<T = CardSchema> extends Repository<T> {
	constructor(db: Database) {
		super(db.collection<T>('card'));
		this.coll.createIndexes({
			indexes: [
				{
					key: { title: 1, project: 1 },
					name: 'title_1_project_1',
					background: true,
					unique: true,
				},
			],
		});
	}
}
