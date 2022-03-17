import ObjectId, { ObjectType } from '../../library/object-id.ts';
import { BsonId } from '../../types.ts';
import { Context, Node } from '../types.ts';

export default {
	Query: {
		async node(_: never, args: { id: BsonId }, ctx: Context) {
			const node = await ctx.services.account.controller.findById(
				args.id,
			);
			if (!node) return null;
			return {
				...node,
				id: node._id,
			};
		},
	},
	Node: {
		async __resolveType(node: Node) {
			const id = ObjectId.parse(node._id);
			switch (id.type) {
				case ObjectType.ACCOUNT:
					return 'Account';
				default:
					return undefined;
			}
		},
	},
};
