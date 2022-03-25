import { CardSchema } from '../../../../types.ts';
import { Context, Node } from '../../types.ts';

export default {
	Card: {
		id(parent: Node) {
			return parent._id;
		},
		assignee(parent: CardSchema, _: never, ctx: Context) {
			if (!parent.assignee) return null;
			return ctx.loaders.Account.load(parent.assignee);
		},
		reporter(parent: CardSchema, _: never, ctx: Context) {
			return ctx.loaders.Account.load(parent.reporter);
		},
	},
};
