import { DataLoader, R } from '../../../config/deps.ts';
import { AccountSchema, BsonId } from '../../../types.ts';
import { Context } from '../types.ts';

export default function (ctx: Context) {
	return new DataLoader<BsonId, AccountSchema>(async (ids) => {
		const map = R.reduce(
			(accum: Record<string, AccountSchema>, file: AccountSchema) => {
				return {
					...accum,
					[file._id.toHexString()]: file,
				};
			},
			{},
		)(
			await ctx.services.account.controller.find({
				_id: { $in: ids as BsonId[] },
			}),
		);
		return ids.map((id) => map[id.toHexString()]);
	});
}
