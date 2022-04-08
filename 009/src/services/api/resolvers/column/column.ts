import { RankedNodeSchema } from '../../../../types.ts';
import { Context, Node } from '../../types.ts';

export default {
	Column: {
		id(parent: Node) {
			return parent._id;
		},
		cards(parent: RankedNodeSchema, _: never, ctx: Context) {
			return ctx.services.rankedNode.controller.find({
				parent: parent.parent,
			});
		},
	},
};
