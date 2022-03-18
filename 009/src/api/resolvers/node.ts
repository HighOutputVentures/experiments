import ObjectId, { ObjectType } from '../../library/object-id.ts';
import { BsonId } from '../../types.ts';
import { Context, Node } from '../types.ts';

export default {
	Query: {
		async node(_: never, args: { id: BsonId }, ctx: Context) {
			const id = ObjectId.parse(args.id);

			switch (id.type) {
				case ObjectType.ACCOUNT:
					return ctx.services.account.controller.findOne({
						_id: args.id,
					});
				case ObjectType.PROJECT:
					return ctx.services.project.controller.findOne({
						_id: args.id,
					});
				case ObjectType.RANKED_NODE:
					return ctx.services.rankedNode.controller.findOne({
						_id: args.id,
					});
				default:
					return null;
			}
		},
	},
	Node: {
		async __resolveType(node: Node) {
			const id = ObjectId.parse(node._id);
			switch (id.type) {
				case ObjectType.ACCOUNT:
					return 'Account';
				case ObjectType.PROJECT:
					return 'Project';
				case ObjectType.RANKED_NODE:
					return 'RankedNode';
				default:
					return undefined;
			}
		},
	},
};
