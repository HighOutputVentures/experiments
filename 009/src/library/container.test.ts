import { assertEquals } from 'https://deno.land/std@0.132.0/testing/asserts.ts';
import Container from './container.ts';

Deno.test('Container', async function (ctx) {
	class Test<T> extends Container<T> {
		constructor(deps: T) {
			super(deps);
		}
	}
	const test = new Test<Partial<{ test: number; hello: string }>>({
		test: 1,
	});

	await ctx.step('get the dependency', function () {
		assertEquals(test.get('test'), 1);
	});

	await ctx.step('bind new dependency', function () {
		test.bind('hello').to('world');
		assertEquals(test.get('hello'), 'world');
	});

	await ctx.step('rebind dependency', function () {
		test.rebind<number>('test').to(2);
		assertEquals(test.get('test'), 2);
	});
});
