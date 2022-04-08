import { Database } from '../../../config/deps.ts';
import Repository from '../../../library/repository.ts';
import { ProjectSchema } from '../../../types.ts';

export default class Project<T = ProjectSchema> extends Repository<T> {
	constructor(db: Database) {
		super(db.collection<T>('project'));
		this.coll.createIndexes({
			indexes: [
				{
					key: { title: 1, creator: 1 },
					name: 'title_1_creator_1',
					unique: true,
					background: true,
				},
			],
		});
	}
}
