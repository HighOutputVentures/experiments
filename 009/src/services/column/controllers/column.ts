import Container from '../../../library/container.ts';
import Repository from '../repository/column.ts';
import { IColumn } from '../types.ts';
import ObjectId, { ObjectType } from '../../../library/object-id.ts';
import { ColumnSchema } from '../../../types.ts';

export default class {
	public repository: Repository<ColumnSchema>;

	constructor(container: Container<IColumn>) {
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

	public async findOne(
		filter: Parameters<typeof this.repository.findOne>[0],
	) {
		return this.repository.findOne(filter);
	}

	public async find(
		filter: Parameters<typeof this.repository.find>[0],
	) {
		return this.repository.find(filter).toArray();
	}
}
