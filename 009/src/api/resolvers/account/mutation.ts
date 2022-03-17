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
	},
};
