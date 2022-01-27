<script lang="ts" context="module">
	import { client } from '$lib/client';
	import type { Load } from '@sveltejs/kit';
	import { GET_CREATOR_POSTS_WITHOUT_AUTH } from '../../../graphql/queries/creator';

	let creatorProfile;

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ params }) => {
		const creatorUsername = params.username;

		creatorProfile = await client.query(GET_CREATOR_POSTS_WITHOUT_AUTH, {
			variables: {
				username: creatorUsername
			},
			fetchPolicy: 'no-cache'
		});

		return {
			props: { creatorProps: creatorProfile, creatorUname: creatorUsername }
		};
	};
</script>

<script lang="ts">
	export let creatorProps;
	console.log('🚀 ~ file: index.svelte ~ line 33 ~ creatorProps', creatorProps);
	export let creatorUname;
	console.log('🚀 ~ file: index.svelte ~ line 34 ~ creatorUname', creatorUname);
</script>

{#if creatorProps}
	{#if $creatorProps.loading}
		Loading... {creatorUname}
	{:else if $creatorProps.error}
		Error: {$creatorProps.error.message}
	{:else}
		<ul>
			{#if $creatorProps.data && $creatorProps.data.creatorAccount}
				<!-- {console.log($creatorProps.data.creatorAccount.posts.edges)} -->
				{#each $creatorProps.data.creatorAccount.posts.edges as node}
					<li>
						{node.node.id}
					</li>
				{/each}
			{/if}
		</ul>
	{/if}
{/if}

<style>
</style>
