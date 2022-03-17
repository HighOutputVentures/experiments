import { path } from '../config/deps.ts';

export default async function loadResolvers(
	pattern: string,
): Promise<Record<string, unknown>> {
	let resolvers: Record<string, unknown> = {};
	for await (const file of Deno.readDir(pattern)) {
		if (file.isDirectory) {
			resolvers = {
				...resolvers,
				...await loadResolvers(path.join(pattern, file.name)),
			};
			continue;
		}

		const fileName = path.join(
			'file:///',
			Deno.cwd(),
			pattern,
			file.name,
		);
		const result = await import(fileName);
		resolvers = { ...resolvers, ...result.default };
	}
	return resolvers;
}
