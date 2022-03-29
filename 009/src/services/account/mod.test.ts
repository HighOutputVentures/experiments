import { assertEquals } from 'https://deno.land/std@0.132.0/testing/asserts.ts';
import { R } from '../../config/deps.ts';
import DatabaseConnection from '../../config/db.ts';
import AccountController from './controllers/account.ts';
import Account from './mod.ts';

Deno.test('Account', {
	sanitizeExit: false,
	sanitizeResources: false,
	sanitizeOps: false,
}, async function (ctx) {
	const dbConnection = new DatabaseConnection();
	await dbConnection.connect('mongodb://localhost:27017/test');
	Account.initialize(dbConnection);
	const controller = Account.get<AccountController>('controller');

	await ctx.step('create', async function () {
		await controller.create({
			email: 'test@email.com',
			password: 'password',
		});
		assertEquals(
			{
				email: 'test@email.com',
				password: 'password',
			},
			R.pick(['email', 'password'])(
				await controller.findOne({ email: 'test@email.com' }),
			),
		);
	});

	await controller.deleteMany({});
	await dbConnection.stop();
});
