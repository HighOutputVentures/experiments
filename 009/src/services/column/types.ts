import { Database } from '../../config/deps.ts';
import Controller from './controllers/column.ts';
export interface IColumn {
	db: Database;
	controller: Controller;
}
