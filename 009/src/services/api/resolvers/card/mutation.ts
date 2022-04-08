import { GraphQLError } from '../../../../config/deps.ts';
import { BsonId } from '../../../../types.ts';
import { Context } from '../../types.ts';

export default {
	Mutation: {
		async createCard(
			_: never,
			args: {
				input: {
					title: string;
					description?: string;
					assignee?: BsonId;
					project: BsonId;
					dateTimeStarted?: Date;
					dateTimeFinished?: Date;
				};
			},
			ctx: Context,
		) {
			const project = await ctx.services.project.controller.findOne({
				_id: args.input.project,
			});
			if (!project) {
				throw new GraphQLError('Project does not exists');
			}

			const firstColumn = await ctx.services.rankedNode.controller
				.findOne(
					{ parent: args.input.project },
					{ sort: { rank: -1 } },
				);

			if (!firstColumn) {
				throw new GraphQLError('Project has no columns');
			}

			const node = await ctx.services.card.controller.create({
				...args.input,
				reporter: ctx.state.user.id,
			});

			const count = await ctx.services.rankedNode.controller.count({
				parent: firstColumn._id,
				node: node,
			});

			await ctx.services.rankedNode.controller.create({
				parent: firstColumn._id,
				node: node,
				rank: count + 1,
			});

			return node;
		},
		updateCard(
			_: never,
			args: {
				id: BsonId;
				input: Partial<{
					title?: string;
					description?: string;
					assignee?: BsonId;
					dateTimeStarted?: Date;
					dateTimeFinished?: Date;
				}>;
			},
			ctx: Context,
		) {
			return ctx.services.card.controller.update(
				{ _id: args.id },
				args.input,
			);
		},
		deleteCard(
			_: never,
			args: {
				id: BsonId;
			},
			ctx: Context,
		) {
			return ctx.services.card.controller.delete({
				_id: args.id,
			});
		},
	},
};
