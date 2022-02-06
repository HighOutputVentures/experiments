<script lang="ts">
	import { fade } from 'svelte/transition';

	let showModal = false;
	export let creatorData;

	function toggleModal() {
		showModal = !showModal;
	}
</script>

<button
	class="my-4 h-14 bg-[#A54ED5] text-white w-full rounded-full"
	type="button"
	on:click={toggleModal}>Support</button
>
{#if showModal}
	<div
		class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
	>
		<div transition:fade class="relative w-auto my-6 mx-auto max-w-[600px]">
			<div
				class="relative flex flex-col  border-0 rounded-lg shadow-lg bg-white outline-none focus:outline-none"
			>
				<button class="absolute top-0 right-0" type="button" on:click={toggleModal}> close</button>
				<div class="grow">
					<img
						src={creatorData.image_next.url}
						alt={creatorData.username}
						class="mx-auto w-[125px] h-[125px] rounded-full outline outline-4 outline-offset-0 outline-white bg-white"
					/>
				</div>
				<div class="flex-none">Support @Arriele</div>
				<div class="flex-none p-[64px]">
					<div class="flex flex-row">
						<div class="flex-none">icon</div>
						<div class="flex-none">
							<div class="flex flex-col">
								<div class="flex-none">Follow</div>
								<div class="flex-none">
									Get exclusive followers-only content straight to your inbox
								</div>
							</div>
						</div>
						<div class="flex-none">Follow</div>
					</div>
					<div class="flex flex-row">
						<div class="flex-none">icon</div>
						<div class="flex-none">
							<div class="flex flex-col">
								<div class="flex-none">Send a tip</div>
								<div class="flex-none">Support a creator with a one-time tip</div>
							</div>
						</div>
						<div class="flex-none">Send a tip</div>
					</div>
					<div class="flex flex-row">
						<div class="flex-none">icon</div>
						<div class="flex-none">
							<div class="flex flex-col">
								<div class="flex-none">Buy creator coin</div>
								<div class="flex-none">
									Get exclusive followers-only content straight to your inbox
								</div>
							</div>
						</div>
						<div class="flex-none">Buy Coin</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="opacity-25 fixed inset-0 z-40 bg-black" />
{/if}

<style>
</style>
