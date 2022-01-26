<script lang="ts">
	// import { page } from '$app/stores';
	// import logo from './svelte-logo.svg';
	import { assets } from '$app/paths';
</script>

<header
	class="bg-cover bg-indigo-500 h-64"
	style={`background-image: url('${assets}/cover-photo.jpg')`}
>
	<div class="h-16 flex justify-between py-3 px-7">
		<img src={`${assets}/logo-light.png`} alt="Jamclout Logo" class="h-full w-min object-cover" />
		<img
			src={`${assets}/avatar-sample.png`}
			alt="Jamclout Logo"
			class="h-full w-min object-cover"
		/>
	</div>
</header>

<style>
</style>
