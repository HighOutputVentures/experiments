import DatabaseConnection from '../../config/db.ts';
import Container from '../../library/container.ts';
import { IProject } from './types.ts';
import ProjectController from './controllers/project.ts';

export default class Project {
	public controller: ProjectController;

	constructor(dbConnection: DatabaseConnection) {
		const container = new Container<IProject>({
			db: dbConnection.getDatabase(Deno.env.get('MONGO_DB') || 'deno'),
		});

		this.controller = new ProjectController(container);
	}
}
