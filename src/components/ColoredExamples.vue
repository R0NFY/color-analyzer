<template>
    <div class="max-w-[min(90%,1728px)] mx-auto grid justify-items-center mb-12">
        <h1 class="heading margin text-center" id="example-heading">Your color in the wild</h1>
        <div class="margin lg:gap-0 grid lg:grid-flow-col lg:grid-cols-[max-content,min(30%,_600px),min(35%,500px)] lg:justify-between gap-8 place-items-center" id="examples">
            <button class="p-[1em] text-2xl app-el w-max font-medium sm:text-3xl xl:text-4xl h-max transition-colors 2xl:text-5xl hover:bg-transparent" :style="`background-color: ${exampleColor.hex}; color: ${lightOrDark};`">click me</button>
            <p class="p-[1.1em] max-w-[80%] sm:max-w-[60%] lg:max-w-full text-xl sm:text-2xl xl:text-3xl leading-normal sm:leading-normal lg:leading-normal xl:leading-normal 2xl:leading-normal app-el transition-colors h-max" :style="`background-color: ${exampleColor.hex}; color: ${lightOrDark};`"><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam tellus in nulla leo quam lorem. Eget eu egestas nec, libero suspendisse hac imperdiet a et.</span></p>
            <div class="app-el h-max p-6 lg:p-8">
                <div class="w-[105%] relative right-[2.5%] h-[150px] sm:h-[175px] xl:h-[200px] 2xl:h-[250px] rounded-[calc(min(1vw_+_1vh,_2rem))] transition-colors" :style="`background-color: ${exampleColor.hex}; color: ${lightOrDark};`"></div>
                <div class="relative">
                    <h1 class="font-medium text-xl sm:text-2xl xl:text-3xl 2xl:text-4xl mt-[0.7em]">Your awesome image</h1>
                    <p class="text-md lg:text-lg xl:text-xl 2xl:text-2xl mt-[0.5em] relative left-[0.25em]">is in the process of loading...</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { onMounted, ref, watch } from '@vue/runtime-core'
import gsap from 'gsap'

gsap.defaults({
    ease: 'sine.easeInOut',
    duration: 0.75, 
    autoAlpha: 0, 
    delay: 0.33
})

onMounted(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (window.innerWidth > 768) {
            gsap.from('#example-heading', {y:50})
            gsap.from('#examples', {x: 50})
        }
        else {
            gsap.from('#example-heading', {y:25})
            gsap.from('#examples', {x: 25})
        }
    }
})

const props = defineProps({
    exampleColor: Object
})

let lightOrDark = ref('#191919')

watch(
    () => props.exampleColor,
    () => {
        props.exampleColor.hsl[2] > 0.6 ? lightOrDark.value = '#191919' : lightOrDark.value = 'rgba(255, 255, 255, 0.94)'
    }
)


</script>