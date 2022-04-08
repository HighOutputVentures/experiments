import { BsonId } from '../../../../types.ts';
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
			const column = await ctx.services.column.controller.create({
				title: args.input.title,
				project: args.input.project,
			});

			const columnCount = await ctx.services.rankedNode.controller.count(
				{ parent: args.input.project },
			);

			await ctx.services.rankedNode.controller.create({
				node: column,
				parent: args.input.project,
				rank: columnCount + 1,
			});

			return column;
		},
		updateColumn(
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
			await ctx.services.rankedNode.controller.delete({
				parent: args.id,
			});
			return ctx.services.column.controller.delete({
				_id: args.id,
			});
		},
	},
};
