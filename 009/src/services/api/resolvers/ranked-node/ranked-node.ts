import ObjectId from '../../../../library/object-id.ts';
import { RankedNodeSchema } from '../../../../types.ts';
import retrieveNode from '../../library/retrieve-node.ts';
import { Context } from '../../types.ts';

export default {
	RankedNode: {
		node(parent: RankedNodeSchema, _: never, ctx: Context) {
			return retrieveNode(ObjectId.parse(parent.node), ctx);
		},
		parent(parent: RankedNodeSchema, _: never, ctx: Context) {
			return retrieveNode(ObjectId.parse(parent.node), ctx);
		},
	},
};
