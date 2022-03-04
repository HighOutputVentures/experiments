import { MongoClient } from './deps.ts';

export default class DatabaseConnection {
	public client: MongoClient;

	constructor() {
		this.client = new MongoClient();
	}

	public async connect(uri?: string) {
		return this.client.connect(
			uri || Deno.env.get('MONGODB_URI') ||
				'mongodb://localhost:27017/deno',
		);
	}

	public async stop() {
		return this.client.close();
	}

	public getDatabase(name: string) {
		return this.client.database(name);
	}
}
