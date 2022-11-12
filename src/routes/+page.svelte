<script>
	// Library Imports
	import { setScene } from '$lib/ThreeObject.js';
	// import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
    
	// Create a new wavy sphere scene
	let ThreeObject;

	// On site load
    onMount(async () => {
		// Set the threejs scene
		await setScene(ThreeObject)

        // Custom Cursor
        const CUSTOM_CURSOR = document.querySelector('.cursor');
        document.addEventListener('mousemove', (e) => 
            CUSTOM_CURSOR.style.cssText =`left: ${e.clientX - 11.5}px; top: ${e.clientY - 13}px;`, false
        );
    });
</script>

<!-- Header -->
<div id="wrapper" class="h-screen text-center flex items-center text-white justify-center flex-col relative z-10 pointer-events-none">
	<h2 class="text-4xl font-thin tracking-[0.25em] italic m-9 point">Apollo</h2>
	<h1 class="text-6xl font-thin m-3 tracking-[0.25em] mb-4">θεός των πάντων</h1>
	<p class="text-lg font-thin m-3 tracking-[0.25em] w-[90rem]">Apollo is one of the Olympian deities in classical Greek and Roman religion and Greek and Roman mythology. The national divinity of the Greeks, Apollo has been recognized as a god of archery, music and dance, truth and prophecy, healing and diseases, the Sun and light, poetry, and more. One of the most important and complex of the Greek gods, he is the son of Zeus and Leto, and the twin brother of Artemis, goddess of the hunt. Seen as the most beautiful god and the ideal of the kouros (ephebe, or a beardless, athletic youth), Apollo is considered to be the most Greek of all the gods. Apollo is known in Greek-influenced Etruscan mythology as Apulu.</p>
</div>

<!-- Custom Cursor -->
<div class="cursor fixed pointer-events-none border-2 border-white p-[0.6rem] rounded-full mix-blend-difference z-10 ease-linear"></div>

<!-- The 3D Wave Sphere -->
<canvas id="statue" bind:this={ThreeObject} class="pointer-events-none fixed top-0 left-0 outline-none z-0 h-[100vh] w-[100vw] bg-black"/>

<!-- Styling -->
<style>
	#statue { background: radial-gradient(circle at center center, #171717 0, #050505 58%); }
	#wrapper { background: linear-gradient(0deg, rgba(5, 5, 5, 1) 15%, rgba(39, 39, 39, 0) 80%); }
</style>