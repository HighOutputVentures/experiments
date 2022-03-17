import { Collection } from '../config/deps.ts';

export default class Repository<T> {
	public coll: Collection<T>;
	constructor(coll: Collection<T>) {
		this.coll = coll;
	}

	public insertOne(...args: Parameters<Collection<T>['insertOne']>) {
		return this.coll.insertOne(...args);
	}

	public insertMany(...args: Parameters<Collection<T>['insertMany']>) {
		return this.coll.insertMany(...args);
	}

	public updateOne(...args: Parameters<Collection<T>['updateOne']>) {
		return this.coll.updateOne(...args);
	}

	public updateMany(...args: Parameters<Collection<T>['updateMany']>) {
		return this.coll.updateMany(...args);
	}

	public deleteOne(...args: Parameters<Collection<T>['deleteOne']>) {
		return this.coll.deleteOne(...args);
	}

	public deleteMany(...args: Parameters<Collection<T>['deleteMany']>) {
		return this.coll.deleteMany(...args);
	}

	public find(...args: Parameters<Collection<T>['find']>) {
		return this.coll.find(...args);
	}

	public findOne(...args: Parameters<Collection<T>['findOne']>) {
		return this.coll.findOne(...args);
	}
}
