import { ProjectSchema } from '../../../types.ts';
import { Context, Node } from '../../types.ts';

export default {
	Project: {
		id(parent: Node) {
			return parent._id;
		},
		creator(parent: ProjectSchema, _: never, ctx: Context) {
			return ctx.services.account.controller.findOne({
				_id: parent.creator,
			});
		},
		members(parent: ProjectSchema, _: never, ctx: Context) {
			return ctx.services.account.controller.find({
				_id: { $in: parent.members },
			});
		},
	},
};
