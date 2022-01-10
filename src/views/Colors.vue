<template>
    <div class="fixed z-50 top-4 left-4 w-9 h-6 rounded md:w-12 md:h-8 md:rounded-md" id="fixed"></div>
    <div v-if="source.length" class="font-poppins text-dark select-none">
        <div v-if="size < 1024 || allowed" class="relative grid place-items-center margin">
            <input accept="image/*" type="file" class="absolute w-[0.1px] h-[0.1px] opacity-0 overflow-hidden z-[-1]" id="reupload" @change="reupload">
            <label for="reupload" class="grid place-items-center relative state hover:darken hover:cursor-pointer" id="wrapper">
                <img @load="backupAnimation" :src="source" alt="image uploaded by user" class="relative app-el h-[40vw] max-w-[90%] max-h-[30rem] mx-auto object-cover" id="img">
                <div class="flex items-center gap-1 absolute invisible show transition-opacity z-50" id="upload-again">
                    <img src="@/assets/repeat-outline.svg" class="text-light white w-6 sm:w-7 md:w-8 lg:w-10">
                    <p class="text-light font-medium text-base sm:text-xl md:text-2xl lg:text-3xl">new?</p>
                </div>
            </label>
        </div>
        <div v-else class="text-center mt-12 max-w-[80%] mx-auto text-xs sm:text-sm md:text-base" id="warning">
            <p>Your image file is pretty big, app may work uncorrectly. Click this button if you want to display it:</p>
            <button class="transition-colors text-md font-poppins md:text-lg border-2 border-solid border-dark p-2 rounded-lg font-medium mt-4 active:bg-darkActive active:text-light hover:bg-dark hover:text-light" @click="allowImg">Display your image</button>
        </div>
        <p class="text-red-300 text-sm sm:text-base lg:text-xl lg:max-w-[20rem] text-center absolute max-w-[15rem] left-1/2 -translate-x-1/2" v-if="!valid">Something is wrong with your image. Upload another one</p>
        <div class="margin lg:mt-16 w-10/12 md:w-4/5 xl:w-[64rem] mx-auto relative">
            <div class="relative text-sm sm:text-lg lg:text-2xl flex gap-1 justify-end right-[.5em] mb-[0.5em]" id="tip">
                <p class="md:block hidden">click + ctrl (control) to copy | click to pick color</p>
                <p class="block md:hidden">tap to pick color</p>
                <img class="w-5 lg:w-6" src="@/assets/help-circle-outline.svg" alt="tip icon">
            </div>
            <div class="app-el grid grid-flow-col bg-white p-[min(3.5vw,_2.8125rem)] gap-[min(5%,_3rem)]" id="palette">
                <Color v-for="(color, index) in colors.value" :hexValue="color.hex" @click.exact="setColor(color)" @click.ctrl="copyToClipboard(color.hex)" :key="index" />
            </div>
        </div>
        <ColoredExamples :exampleColor="{hsl:activeColor.hsl, hex: activeColor.hex}" />
    </div>
</template>

<script setup>

// components 

import Color from '@/components/Color.vue'
import ColoredExamples from '@/components/ColoredExamples.vue'

// vue core

import { useStore } from 'vuex'
import { reactive, ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'
import { useRouter } from 'vue-router'

// libraries

import * as Vibrant from 'node-vibrant'
import gsap from 'gsap'
import Swal from 'sweetalert2'
import copy from 'copy-to-clipboard'
import 'animate.css'

// animations 

gsap.defaults({
    ease: 'sine.easeInOut',
    duration: 0.75, 
    opacity: 0, 
    delay: 0.33
})

onMounted(() => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            let img = document.getElementById('img')
            let warning = document.getElementById('warning')
            let again = document.getElementById('upload-again')
            if (window.innerWidth > 768) {
                gsap.from('#fixed', {y: -35})
                img ? gsap.from('#img', {y: 50}) : ''
                gsap.from('#palette', {x: 75})
                gsap.from('#tip', {x: 75, y: 25})
                again ? gsap.from('#upload-again', {y:25, opacity: 1}) : ''
                warning ? gsap.from('#warning', {y: 30}) : ''
            }
            else {
                img ? gsap.from('#img', {y: -30}) : ''
                gsap.from('#fixed', {y:-15, delay: 0.15})
                gsap.from('#palette', {x: 24})
                gsap.from('#tip', {x: 35, y:15})
                again ? gsap.from('#upload-again', {y:15, opacity: 1}) : ''
                warning ? gsap.from('#warning', {y: 20}) : ''
            }
        }
    })

// main logic

const store = useStore()
let colors = reactive({})
let allowed = ref(false)
let valid = ref(true)
let activeColor = ref('')
let loaded = ref(true)
let size = store.state.size ? store.state.size / 1024 : 0

let backupAnimation = () => {
    if (size > 1024 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let img = document.getElementById('img')
        img ? gsap.from('#img', {delay: 0, opacity: 0, duration: 1}) : ''
    }
}

let allowImg = () => {
    allowed.value = true
}

let source = store.state.path

if (source) {
    Vibrant.from(source).getPalette().then(palette => {
        colors.value = palette
        activeColor.value = colors.value.Vibrant
    })
}

const router = useRouter()

let reupload = el => {
    let file = el.target.files[0]
    store.commit('setSize', file.size)
    if (file.type.includes('image')) {
        const fileReader = new FileReader() 
        fileReader.readAsDataURL(file)
        loaded.value = true
        fileReader.onload = e => {
        store.commit('setPath', e.target.result)
        router.push('colors')
        
        }
        valid.value = true
        location.reload()
    }
    else {
        valid.value = false
    }
}

let setColor = colorValue => {
    activeColor.value = colorValue
}

let copyToClipboard = colorValue => {
    copy(colorValue)
    Swal.fire({
        position: 'top-end',
        title: 'Copied to clipboard',
        showConfirmButton: false,
        timer: 1000, 
        backdrop: false,
        width: '25rem',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}

watch (
    () => activeColor.value, 
    () => {
        if (loaded.value) {
            gsap.to('#fixed', {backgroundColor: activeColor.value.hex, opacity: 1})
            loaded.value = false
        }
        else {
            gsap.to('#fixed', {backgroundColor: activeColor.value.hex, opacity: 1, delay: 0, duration: 0.15})
        }
    }
)

</script>

<style>

/* for animate.css */ 

:root {
  --animate-duration: 350ms;
  overflow-x: hidden;
}

</style>