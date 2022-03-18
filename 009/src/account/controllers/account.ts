import Container from '../../library/container.ts';
import AccountRepository from '../repository/account.ts';
import { AccountSchema, IAccount } from '../types.ts';
import ObjectId, { ObjectType } from '../../library/object-id.ts';
import { BsonId } from '../../types.ts';

export default class AccountController {
	public repository: AccountRepository<AccountSchema>;

	constructor(container: Container<IAccount>) {
		this.repository = new AccountRepository(
			container.get('db'),
		);
	}

	public generateId() {
		return ObjectId.generate(ObjectType.ACCOUNT);
	}

	public async create(
		params: Omit<AccountSchema, '_id' | 'dateTimeCreated'>,
	) {
		const id = this.generateId().oid;
		await this.repository.insertOne({
			...params,
			_id: id,
			dateTimeCreated: new Date(),
		});
		return id;
	}

	public async findOne(
		filter: Parameters<typeof this.repository.findOne>[0],
	) {
		return this.repository.findOne(filter);
	}
}
