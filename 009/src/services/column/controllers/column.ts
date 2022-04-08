import Repository from '../repository/column.ts';
import ObjectId, { ObjectType } from '../../../library/object-id.ts';
import { ColumnSchema } from '../../../types.ts';
import { ColumnService } from '../mod.ts';

export default class {
	public repository: Repository<ColumnSchema>;

	constructor(container: ColumnService) {
		this.repository = new Repository(
			container.get('db'),
		);
	}

	public generateId() {
		return ObjectId.generate(ObjectType.COLUMN);
	}

	public async create(
		params: Omit<ColumnSchema, '_id' | 'dateTimeCreated' | 'cards'>,
	) {
		const id = this.generateId().oid;
		await this.repository.insertOne({
			...params,
			_id: id,
			dateTimeCreated: new Date(),
		});
		return id;
	}

	public async update(...args: Parameters<typeof this.repository.updateOne>) {
		await this.repository.updateOne(args[0], { $set: args[1] });
		return true;
	}

	public async delete(...args: Parameters<typeof this.repository.deleteOne>) {
		await this.repository.deleteOne(args);
		return true;
	}

	public findOne(
		filter: Parameters<typeof this.repository.findOne>[0],
	) {
		return this.repository.findOne(filter);
	}

	public find(
		filter: Parameters<typeof this.repository.find>[0],
	) {
		return this.repository.find(filter).toArray();
	}
}
