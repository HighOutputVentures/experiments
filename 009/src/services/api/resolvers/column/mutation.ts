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

			const node = await ctx.services.rankedNode.controller.create({
				node: column,
				parent: args.input.project,
				rank: columnCount + 1,
			});

			await ctx.services.project.controller.addColumn(
				args.input.project,
				node,
			);

			return column;
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
