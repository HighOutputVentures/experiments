import ObjectId from '../../../../library/object-id.ts';
import { RankedNodeSchema } from '../../../../types.ts';
import retrieveNode from '../../library/retrieve-node.ts';
import { Context, Node } from '../../types.ts';

export default {
	RankedNode: {
		id(parent: Node) {
			return parent._id;
		},
		node(parent: RankedNodeSchema, _: never, ctx: Context) {
			return retrieveNode(ObjectId.parse(parent.node), ctx);
		},
		parent(parent: RankedNodeSchema, _: never, ctx: Context) {
			return retrieveNode(ObjectId.parse(parent.node), ctx);
		},
	},
};
