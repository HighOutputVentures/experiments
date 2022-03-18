import { BsonId, IService } from '../../../types.ts';
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
			return ctx.services.project.controller.update(args.id, {
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
			return ctx.services.project.controller.delete(args.id);
		},
	},
};
