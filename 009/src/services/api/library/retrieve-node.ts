import ObjectId, { ObjectType } from '../../../library/object-id.ts';
import { Context } from '../types.ts';

export default function retrieveNode(id: ObjectId, ctx: Context) {
	switch (id.type) {
		case ObjectType.ACCOUNT:
			return ctx.services.account.controller.findOne({
				_id: id.oid,
			});
		case ObjectType.PROJECT:
			return ctx.services.project.controller.findOne({
				_id: id.oid,
			});
		case ObjectType.RANKED_NODE:
			return ctx.services.rankedNode.controller.findOne({
				_id: id.oid,
			});
		case ObjectType.COLUMN:
			return ctx.services.column.controller.findOne({
				_id: id.oid,
			});
		case ObjectType.CARD:
			return ctx.services.card.controller.findOne({
				_id: id.oid,
			});
		default:
			return null;
	}
}
