import AccountRepository from '../repository/account.ts';
import ObjectId, { ObjectType } from '../../../library/object-id.ts';
import { AccountSchema } from '../../../types.ts';
import Account from '../mod.ts';

export default class AccountController {
	public repository: AccountRepository<AccountSchema>;

	constructor(container: typeof Account) {
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

	public deleteMany(
		filter: Parameters<typeof this.repository.deleteMany>[0],
	) {
		return this.repository.deleteMany(filter);
	}
}
