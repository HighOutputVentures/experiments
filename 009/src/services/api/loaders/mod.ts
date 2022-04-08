import {
	AccountSchema,
	CardSchema,
	ColumnSchema,
	ProjectSchema,
	RankedNodeSchema,
} from '../../../types.ts';
import { Context } from '../types.ts';
import DataLoader from './common.ts';

export default function (ctx: Context) {
	return {
		Account: DataLoader<AccountSchema>(ctx, 'account'),
		Project: DataLoader<ProjectSchema>(ctx, 'project'),
		RankedNode: DataLoader<RankedNodeSchema>(ctx, 'rankedNode'),
		Column: DataLoader<ColumnSchema>(ctx, 'column'),
		Card: DataLoader<CardSchema>(ctx, 'card'),
	};
}
