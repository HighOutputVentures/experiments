import { DataLoader, R } from '../../../config/deps.ts';
import { BsonId } from '../../../types.ts';
import { Context } from '../types.ts';

export default function <T = { _id: BsonId }>(
	ctx: Context,
	service: keyof Context['services'],
) {
	return new DataLoader<BsonId, T>(async (ids) => {
		const map = R.reduce(
			(accum: Record<string, T>, doc: { _id: BsonId }) => {
				return {
					...accum,
					[doc._id.toHexString()]: doc,
				};
			},
			{},
		)(
			await ctx.services[service].get<
				{ find: (args: unknown) => Promise<{ _id: BsonId }[]> }
			>('controller').find({
				_id: { $in: ids as BsonId[] },
			}),
		);
		return ids.map((id) => map[id.toHexString()]);
	});
}
