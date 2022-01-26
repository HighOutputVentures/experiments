<script lang="ts">
	import { assets } from '$app/paths';
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<Header />

<main class="container mx-auto h-full">
	<div class="flex">
		<div class="flex-none w-1/5 relative">
			<div class="absolute -top-20 h-44 inset-x-0 text-center">
				<img src={`${assets}/dp-sample.png`} alt="Jamclout Logo" class="mx-auto w-44" />
				<p class="font-bold text-2xl my-2">@WilliamLaurent</p>
				<div class="flex flex-row items-center justify-center">
					<div class="flex flex-col mx-2">
						<p class="flex-none font-bold text-xl">2.8k</p>
						<p class="flex-none text-sm text-[#A5A5A5]">Followers</p>
					</div>
					<div class="flex flex-col mx-2">
						<p class="flex-none font-bold text-xl">53</p>
						<p class="flex-none text-sm text-[#A5A5A5]">Following</p>
					</div>
				</div>
				<button class="my-4 h-14 bg-[#A54ED5] text-white w-full rounded-full">Support</button>
				<div class="text-left mb-7">
					<p class="flex-none font-bold text-xl mb-4">About</p>
					<p class="flex-none text-sm">
						Tokyo/NYC 📍Canvas artist, photographer, writer, designer MarchOG ✅ CoFounder
						@CloutMafia / 💎 williamlaurent.com 💎 NFTs and real paintings🎨 💕
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
