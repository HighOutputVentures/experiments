/** @type {import('houdini').ConfigFile} */
const config = {
	schemaPath: './schema.graphql',
	sourceGlob: 'src/**/*.svelte',
	module: 'esm',
	framework: 'kit',
	apiUrl: 'https://beta-api.jamclout.com/graphql'
}

export default config
