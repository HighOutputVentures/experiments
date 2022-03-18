import { AccountSchema } from '../../../types.ts';
import { Context } from '../../types.ts';

export default {
	Account: {
		projects(parent: AccountSchema, __: never, ctx: Context) {
			return ctx.services.project.controller.find({
				creator: parent._id,
			});
		},
	},
};
