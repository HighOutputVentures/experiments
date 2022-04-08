import { Database } from '../../config/deps.ts';
import Controller from './controllers/project.ts';
export interface IProject {
	db: Database;
	controller: Controller;
}
