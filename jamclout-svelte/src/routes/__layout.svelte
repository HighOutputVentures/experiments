<script lang="ts" context="module">
	import { client } from '$lib/client';
	import Header from '$lib/header/Header.svelte';
	import type { Load } from '@sveltejs/kit';
	import '../app.css';
	import { GET_PROFILE } from '../graphql/queries/profile';

	let creatorProfile;

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ params }) => {
		const creatorUsername = params.username;

		creatorProfile = await client.query(GET_PROFILE, {
			variables: {
				username: creatorUsername
			},
			fetchPolicy: 'no-cache'
		});

		return {
			props: { creatorProps: creatorProfile }
		};
	};
</script>

<script lang="ts">
	export let creatorProps;
</script>

<Header />

<main class="container mx-auto h-full">
	<div class="flex">
		<div class="flex-none w-1/5 relative">
			{#if creatorProps}
				{#if $creatorProps.loading}
					Loading...
				{:else if $creatorProps.error}
					Error: {$creatorProps.error.message}
				{:else}
					<div class="absolute -top-20 h-auto inset-x-0 text-center">
						<img
							src={$creatorProps.data.creatorAccount.image_next.url}
							alt={$creatorProps.data.creatorAccount.username}
							class="mx-auto w-44 h-44 rounded-full outline outline-4 outline-offset-0 outline-white"
						/>
						<p class="font-bold text-2xl my-2">@{$creatorProps.data.creatorAccount.username}</p>
						<div class="flex flex-row items-center justify-center">
							<div class="flex flex-col mx-2">
								<p class="flex-none font-bold text-xl">
									{$creatorProps.data.creatorAccount.followersCount}
								</p>
								<p class="flex-none text-sm text-[#A5A5A5]">Followers</p>
							</div>
							<div class="flex flex-col mx-2">
								<p class="flex-none font-bold text-xl">
									{$creatorProps.data.creatorAccount.followingCount}
								</p>
								<p class="flex-none text-sm text-[#A5A5A5]">Following</p>
							</div>
						</div>
						<button class="my-4 h-14 bg-[#A54ED5] text-white w-full rounded-full">Support</button>
						<div class="text-left mb-7">
							<p class="flex-none font-bold text-xl mb-4">About</p>
							<p class="flex-none text-sm">
								{$creatorProps.data.creatorAccount.description}
							</p>
						</div>
						<div class="text-left mb-7">
							<p class="flex-none font-bold text-xl mb-4">Links</p>
							<div class="flex justify-between">
								<div class="flex-none w-8 h-8">01</div>
								<div class="grow">Bitclout</div>
								<div class="grow">14k followers</div>
								<div class="flex-none w-12 h-8">02</div>
							</div>
							<div class="flex justify-between">
								<div class="flex-none w-8 h-8">01</div>
								<div class="grow">Instagram</div>
								<div class="grow">12k followers</div>
								<div class="flex-none w-12 h-8">02</div>
							</div>
							<div class="flex justify-between">
								<div class="flex-none w-8 h-8">01</div>
								<div class="grow">Twitter</div>
								<div class="grow">11k followers</div>
								<div class="flex-none w-12 h-8">02</div>
							</div>
						</div>
						<div class="text-left">
							<p class="flex-none font-bold text-xl mb-4">Fans</p>
						</div>
					</div>
				{/if}
			{/if}
		</div>
		<div class="grow">
			<slot />
		</div>
	</div>
</main>

<!-- <footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer> -->
<style>
	/* main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	} */
</style>
