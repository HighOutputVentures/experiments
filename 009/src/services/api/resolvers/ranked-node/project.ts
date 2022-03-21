import { ProjectSchema } from '../../../../types.ts';
import { Context } from '../../types.ts';

export default {
	Project: {
		columns(parent: ProjectSchema, _: never, ctx: Context) {
			return ctx.services.rankedNode.controller.find({
				_id: { $in: parent.columns },
			});
		},
	},
};
