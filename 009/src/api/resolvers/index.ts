import { IService } from '../../types.ts';
import { Context } from '../types.ts';

export const resolvers = {
	Query: {
		async account(_: never, args: { id: string }, ctx: Context) {
			const account = await ctx.services.account.controller.findById(
				args.id,
			);
			console.log(account);
			return account;
		},
	},
	Mutation: {
		async createAccount(
			_: never,
			args: {
				input: Parameters<
					IService['account']['controller']['create']
				>[0];
			},
			ctx: Context,
		) {
			await ctx.services.account.controller.create({
				email: args.input.email,
				password: args.input.password,
			});
			return true;
		},
	},
};
