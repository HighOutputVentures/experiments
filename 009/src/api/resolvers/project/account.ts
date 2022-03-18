import { Context } from '../../types.ts';

export default {
	Account: {
		projects(_: never, __: never, ctx: Context) {
			return ctx.services.project.controller.retrieveProjects({});
		},
	},
};
