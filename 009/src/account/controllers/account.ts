import Container from '../../library/container.ts';
import AccountRepository from '../repository/account.ts';
import { AccountSchema, IAccount } from '../types.ts';
import ObjectId, { ObjectType } from '../../library/object-id.ts';

export default class AccountController {
	private repository: AccountRepository<AccountSchema>;

	constructor(container: Container<IAccount>) {
		this.repository = new AccountRepository(
			container.get('db'),
		);
	}

	public generateId() {
		return ObjectId.generate(ObjectType.ACCOUNT).oid;
	}

	public async create(
		params: Omit<AccountSchema, '_id' | 'dateTimeCreated'>,
	) {
		return this.repository.insertOne({
			...params,
			_id: this.generateId(),
			dateTimeCreated: new Date(),
		});
	}

	public async findById(id: string) {
		return this.repository.findOne({ id });
	}
}
