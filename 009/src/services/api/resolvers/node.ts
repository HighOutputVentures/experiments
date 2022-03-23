import ObjectId, { ObjectType } from '../../../library/object-id.ts';
import { BsonId } from '../../../types.ts';
import retrieveNode from '../library/retrieve-node.ts';
import { Context, Node } from '../types.ts';

export default {
	Query: {
		async node(_: never, args: { id: BsonId }, ctx: Context) {
			return retrieveNode(ObjectId.parse(args.id), ctx);
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
				case ObjectType.COLUMN:
					return 'Column';
				case ObjectType.CARD:
					return 'Card';
				default:
					return undefined;
			}
		},
	},
};
