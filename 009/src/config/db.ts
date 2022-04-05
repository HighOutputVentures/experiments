import { MongoClient } from './deps.ts';

export default class DatabaseConnection {
	public client: MongoClient;

	constructor() {
		this.client = new MongoClient();
	}

	public connect(uri?: string) {
		const mongoURI = uri || Deno.env.get('MONGODB_URI') ||
			'mongodb://localhost:27017/deno';
		console.log('uri', mongoURI);
		return this.client.connect(mongoURI);
	}

	public stop() {
		return this.client.close();
	}

	public getDatabase(name: string) {
		return this.client.database(name);
	}
}
