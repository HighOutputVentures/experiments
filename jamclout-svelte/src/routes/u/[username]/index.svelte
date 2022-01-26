<script lang="ts">
	import { client } from '$lib/client';
	import { gql } from '@apollo/client/core';

	let creatorProfile;

	async function getCreatorProfile() {
		console.log('🚀 ~ file: index.svelte ~ line 8 ~ getCreatorProfile ~ getCreatorProfile');

		creatorProfile = await client.query(
			gql`
				query GetCreatorPostsWithOutAuth($username: String!) {
					creatorAccount(username: $username) {
						following
						username
						id
						image_next {
							id
							url
							blurhash
						}
						posts {
							edges {
								node {
									... on Post {
										id
										message
										embed
										thumbnail {
											id
											url
											blurhash
										}
										contents {
											id
											url
											mimetype
											blurhash
											thumbnail {
												id
												url
											}
										}
										likesCount
										comments {
											totalCount
										}
										visibilityType
									}
								}
							}
						}
					}
				}
			`,
			{
				variables: {
					username: 'Arriele'
				},
				fetchPolicy: 'no-cache'
			}
		);
	}
</script>

<button on:click={getCreatorProfile}>Get Profile</button>

{#if creatorProfile}
	{#if $creatorProfile.loading}
		Loading...
	{:else if $creatorProfile.error}
		Error: {$creatorProfile.error.message}
	{:else}
		<ul>
			{console.log(creatorProfile.data)}
			<!-- {#each $creatorProfile.data.creatorProfile.slice(0, 5) as rate}
				<li>
					1 USD = {rate.rate}
					{rate.currency}
				</li>
			{/each} -->
		</ul>
	{/if}
{/if}

<style>
</style>
