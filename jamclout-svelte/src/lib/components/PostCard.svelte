<script>
	import { assets } from '$app/paths';
	import { XIcon } from 'svelte-feather-icons';
	import { fade } from 'svelte/transition';

	let showModal = false;
	export let postData;

	function toggleModal() {
		showModal = !showModal;
	}
</script>

<div
	on:click={toggleModal}
	class="w-[250px] h-[332px] bg-[#A54ED5] justify-self-center rounded-lg bg-cover"
	style={`background-image: url('${
		postData.node.thumbnail ? postData.node.thumbnail.url : `${assets}/blur.png`
	} ')`}
>
	{postData.node.id}
</div>

{#if showModal}
	<div
		transition:fade
		class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none flex flex-row"
	>
		<div class="grow bg-[#191B1C]">
			<button
				class="h-[40px] w-[40px] rounded-full bg-[#1C121C] mt-[24px] ml-[24px] opacity-70 text-white active:bg-[#A54ED5] font-bold uppercase text-base shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
				type="button"
				on:click={toggleModal}
			>
				<XIcon class="h-[24px]" />
			</button>
		</div>
		<div class="flex-none w-[398px] bg-white">wew</div>
	</div>
	<div class="opacity-80 fixed inset-0 z-40 bg-black" transition:fade />
{/if}
