import { Context } from '../../types.ts';

export default {
	Query: {
		projects(_: never, __: never, ctx: Context) {
			return ctx.services.project.controller.find({});
		},
	},
};
