import { Database } from '../../config/deps.ts';
import Controller from './controllers/ranked-node.ts';

export interface IRankedNode {
	db: Database;
	controller: Controller;
}
