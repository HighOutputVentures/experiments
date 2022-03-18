import { Context } from '../../types.ts';

export default {
	Query: {
		me(_: never, __: never, ctx: Context) {
			return ctx.services.account.controller.findOne({
				_id: ctx.state.user.id,
			});
		},
	},
};
