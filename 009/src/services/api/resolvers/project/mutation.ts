import { BsonId, IService } from '../../../../types.ts';
import { Context } from '../../types.ts';

export default {
	Mutation: {
		async createProject(
			_: never,
			args: {
				input: { title: string };
			},
			ctx: Context,
		) {
			return ctx.services.project.controller.create({
				title: args.input.title,
				creator: ctx.state.user.id,
			});
		},
		async updateProject(
			_: never,
			args: {
				id: BsonId;
				input: { title: string };
			},
			ctx: Context,
		) {
			return ctx.services.project.controller.update({ _id: args.id }, {
				title: args.input.title,
			});
		},
		async deleteProject(
			_: never,
			args: {
				id: BsonId;
			},
			ctx: Context,
		) {
			await ctx.services.column.controller.delete({
				project: args.id,
			});
			await ctx.services.card.controller.delete({
				project: args.id,
			});
			await ctx.services.rankedNode.controller.delete({
				parent: args.id,
			});
			return ctx.services.project.controller.delete(args.id);
		},
		async addProjectMember(
			_: never,
			args: {
				input: {
					project: BsonId;
					member: BsonId;
				};
			},
			ctx: Context,
		) {
			await ctx.services.project.controller.addMember(
				args.input.project,
				args.input.member,
			);

			return true;
		},
	},
};
