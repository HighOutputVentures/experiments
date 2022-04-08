import { ProjectSchema } from '../../../../types.ts';
import { Context, Node } from '../../types.ts';

export default {
	Project: {
		id(parent: Node) {
			return parent._id;
		},
		creator(parent: ProjectSchema, _: never, ctx: Context) {
			return ctx.loaders.Account.load(parent.creator);
		},
		members(parent: ProjectSchema, _: never, ctx: Context) {
			return ctx.loaders.Account.loadMany(parent.members);
		},
		columns(parent: ProjectSchema, _: never, ctx: Context) {
			return ctx.services.rankedNode.controller.find({
				parent: parent._id,
			});
		},
	},
};
