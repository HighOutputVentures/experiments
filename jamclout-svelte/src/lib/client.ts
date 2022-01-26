import { InMemoryCache } from '@apollo/client/core';
import { SvelteApolloClient } from 'svelte-apollo-client';

export const client = SvelteApolloClient({
	uri: 'https://beta-api.jamclout.com/graphql',
	cache: new InMemoryCache()
});
