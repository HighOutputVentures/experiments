import ObjectId, { ObjectType } from '../../../library/object-id.ts';
import { Context } from '../types.ts';

export default function retrieveNode(id: ObjectId, ctx: Context) {
	switch (id.type) {
		case ObjectType.ACCOUNT:
			return ctx.loaders.Account.load(id.oid);
		case ObjectType.PROJECT:
			return ctx.loaders.Project.load(id.oid);
		case ObjectType.RANKED_NODE:
			return ctx.loaders.RankedNode.load(id.oid);
		case ObjectType.COLUMN:
			return ctx.loaders.Column.load(id.oid);
		case ObjectType.CARD:
			return ctx.loaders.Card.load(id.oid);
		default:
			return null;
	}
}
