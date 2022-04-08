import DatabaseConnection from '../../config/db.ts';
import Container from '../../library/container.ts';
import { IProject } from './types.ts';
import Controller from './controllers/project.ts';

export class ProjectService extends Container<IProject> {
	public initialize(dbConnection: DatabaseConnection) {
		this.bind('db').to(
			dbConnection.getDatabase(Deno.env.get('MONGO_DB') || 'deno'),
		);
		this.bind('controller').to(
			new Controller(this),
		);
	}

	public get controller() {
		return this.get<Controller>('controller');
	}
}

export default new ProjectService();
