import { BsonId } from '../../../types.ts';
import { Context } from '../../types.ts';

export default {
	Mutation: {
		async createColumn(
			_: never,
			args: {
				input: { title: string; project: BsonId };
			},
			ctx: Context,
		) {
			return ctx.services.column.controller.create({
				title: args.input.title,
				project: args.input.project,
			});
		},
		async updateColumn(
			_: never,
			args: {
				id: BsonId;
				input: { title: string };
			},
			ctx: Context,
		) {
			return ctx.services.column.controller.update(args.id, {
				title: args.input.title,
			});
		},
		async deleteColumn(
			_: never,
			args: {
				id: BsonId;
			},
			ctx: Context,
		) {
			return ctx.services.column.controller.delete(args.id);
		},
	},
};
