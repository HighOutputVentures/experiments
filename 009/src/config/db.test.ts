import { assertEquals } from 'https://deno.land/std@0.132.0/testing/asserts.ts';
import DatabaseConnection from './db.ts';
import chai from 'https://cdn.skypack.dev/chai@4.3.4?dts';

Deno.test(
	'Database',
	{ only: true, permissions: { env: false } },
	async function (ctx) {
		const conn = new DatabaseConnection();
		await conn.connect();
		const db = conn.getDatabase('deno');
		const coll = db.collection('test');
		const expect = chai.expect;

		await ctx.step({
			name: '#create',
			fn: async function () {
				expect(
					await coll.insertOne({
						email: 'test@email.com',
					}),
				).to.be.ok;
				assertEquals(1, 1);
			},
		});
		await ctx.step({
			name: '#update',
			fn: async function () {
				expect(
					await coll.updateOne({
						email: 'test@email.com',
					}, { password: 'password' }),
				).to.be.ok;
			},
		});

		await coll.deleteMany({});
		conn.stop();
	},
);

Deno.test('Database1', async function (ctx) {
	const conn = new DatabaseConnection();
	await conn.connect();
	const db = conn.getDatabase('deno');
	const coll = db.collection('test');
	const expect = chai.expect;

	await ctx.step({
		name: '#create',
		fn: async function () {
			expect(
				await coll.insertOne({
					email: 'test@email.com',
				}),
			).to.be.ok;
			assertEquals(1, 1);
		},
	});
	await ctx.step({
		name: '#update',
		fn: async function () {
			expect(
				await coll.updateOne({
					email: 'test@email.com',
				}, { password: 'password' }),
			).to.be.ok;
		},
	});

	await coll.deleteMany({});
	conn.stop();
});
