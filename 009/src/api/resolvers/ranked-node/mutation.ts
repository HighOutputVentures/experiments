import { BsonId, IService } from '../../../types.ts';
import { Context } from '../../types.ts';

export default {
	Mutation: {
		async createRankedNode(
			_: never,
			args: {
				input: { node: BsonId; rank: number };
			},
			ctx: Context,
		) {
			return ctx.services.rankedNode.controller.create(args.input);
		},
		async updateProject(
			_: never,
			args: {
				id: BsonId;
				input: { rank: number };
			},
			ctx: Context,
		) {
			return ctx.services.rankedNode.controller.update(
				args.id,
				args.input,
			);
		},
		async deleteProject(
			_: never,
			args: {
				id: BsonId;
			},
			ctx: Context,
		) {
			return ctx.services.rankedNode.controller.delete(args.id);
		},
	},
};
