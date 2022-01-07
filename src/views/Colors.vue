<template>
    <div v-if="source.length" class="font-poppins text-dark select-none">
        <img :src="source" alt="image uploaded by user" class="app-el margin h-[40vw] max-w-[90%] max-h-[35rem] mx-auto object-cover" id="img">
        <div class="margin lg:mt-16 w-10/12 md:w-4/5 xl:w-[64rem] mx-auto relative">
            <div class="relative text-sm sm:text-lg lg:text-2xl flex gap-1 justify-end right-[.5em] mb-[0.5em]" id="tip">
                <p class="md:block hidden">click + ctrl (control) to copy | click to pick color</p>
                <p class="block md:hidden">tap to pick color</p>
                <img class="w-5 lg:w-6" src="@/assets/help-circle-outline.svg" alt="tip icon">
            </div>
            <div class="app-el grid grid-flow-col bg-white p-[min(3.5vw,_2.8125rem)] gap-[min(5%,_3rem)]" id="palette">
                <Color v-for="color in colors.value" :hexValue="color.hex" :key="color" />
            </div>
        </div>
    </div>
</template>

<script setup>

import { useStore } from 'vuex'
import * as Vibrant from 'node-vibrant'
import { reactive } from '@vue/reactivity'
import { gsap } from 'gsap'
import { onMounted } from '@vue/runtime-core'
import Color from '@/components/Color.vue'

// animations 
gsap.defaults({
  duration: 0.75, 
  opacity: 0, 
  delay: 0.5
})

onMounted(() => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            if (window.innerWidth > 800) {
                gsap.from('#img', {opacity: 0, delay: 0.2})
                gsap.from('#palette', {x: 75})
                gsap.from('#tip', {x: 75, y: 25})
            }
            else {
                gsap.from('#img', {opacity: 0, delay: 0.2})
                gsap.from('#palette', {x: 35})
                gsap.from('#tip', {x: 35, y:15})
            }
        }
    })

// main logic

const store = useStore()
let colors = reactive({})

let source = store.state.path

if (source) {
    Vibrant.from(source).getPalette().then(palette => {
        colors.value = palette
    })
}   
</script>