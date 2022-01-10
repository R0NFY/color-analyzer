<template>
    <div class="bg-pattern h-full w-screen absolute z-[-1] bg-cover bg-center blur-[calc(4.5vw_+_4.5vh)] top-0" id="pattern"></div>
</template>

<script setup>
    import { onMounted } from '@vue/runtime-core'
    import { gsap } from 'gsap'
    onMounted(() => {
        gsap.from('#pattern', {duration: 0.5, ease: 'sine.easeInOut', opacity: 0})
    })
</script>