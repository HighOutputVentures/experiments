import Repository from '../repository/ranked-node.ts';
import ObjectId, { ObjectType } from '../../../library/object-id.ts';
import { BsonId, RankedNodeSchema } from '../../../types.ts';
import { RankedNodeService } from '../mod.ts';

export default class {
	public repository: Repository<RankedNodeSchema>;

	constructor(container: RankedNodeService) {
		this.repository = new Repository(
			container.get('db'),
		);
	}

	public generateId() {
		return ObjectId.generate(ObjectType.RANKED_NODE);
	}

	public async create(
		params: Omit<RankedNodeSchema, '_id' | 'dateTimeCreated'>,
	): Promise<BsonId> {
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
		await this.repository.deleteOne(...args);
		return true;
	}

	public async findOne(
		...args: Parameters<typeof this.repository.findOne>
	) {
		return this.repository.findOne(...args);
	}

	public async find(
		filter: Parameters<typeof this.repository.find>[0],
	) {
		return this.repository.find(filter).sort({ rank: 1 }).toArray();
	}

	public async count(
		filter: Parameters<typeof this.repository.countDocuments>[0],
	) {
		return this.repository.countDocuments(filter);
	}
}
