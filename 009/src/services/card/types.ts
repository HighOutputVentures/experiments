import { Database } from '../../config/deps.ts';
import Controller from './controllers/card.ts';

export interface ICard {
	db: Database;
	controller: Controller;
}
