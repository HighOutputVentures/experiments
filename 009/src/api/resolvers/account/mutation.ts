import { GraphQLError } from '../../../config/deps.ts';
import { generateJWT } from '../../../library/jwt.ts';
import { IService } from '../../../types.ts';
import { Context } from '../../types.ts';

export default {
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
			return ctx.services.account.controller.create({
				email: args.input.email,
				password: args.input.password,
			});
		},
		async authenticateAccount(_: never, args: {
			input: {
				email: string;
				password?: string;
			};
		}, ctx: Context) {
			const account = await ctx.services.account.controller.findOne({
				email: args.input.email,
				password: args.input.password,
			});

			if (!account) {
				throw new GraphQLError('Account not found');
			}

			return generateJWT(account._id.toHexString());
		},
	},
};
