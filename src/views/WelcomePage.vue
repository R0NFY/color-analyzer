<template>
  <div class="font-poppins text-center h-[97vh] grid place-items-center text-dark select-none">
    <div class="grid gap-5 sm:gap-6 md:gap-8 w-10/12 xl:w-10/12 max-w-[25rem] sm:max-w-[30rem] md:max-w-[38rem] xl:max-w-[840px] relative">
      <h1 class="heading" id="title">Get a bit more than just a palette</h1>
      <p class="text-xl sm:text-2xl md:text-3xl xl:text-[44px] xl:leading-normal" id="desc">It's easier to pick the right color when you see it in context. </p>
      <div>
        <input type="file" accept="image/*" id="file" class="absolute w-[0.1px] h-[0.1px] opacity-0 overflow-hidden z-[-1]" @change="setPath">
        <label class="block leading-tight text-[22px] sm:text-[28px] md:text-[34px] xl:text-[44px] font-semibold py-[0.7em] px-[0.95em] bg-dark text-light rounded-2xl xl:rounded-[2rem] w-max mx-auto cursor-pointer hover:bg-darkActive hover:text-light active:bg-darkActive active:text-light transition-colors" id="upload" for="file">Upload your image</label>
        <p class="text-red-300 mt-6 text-sm sm:text-base lg:text-xl absolute left-1/2 -translate-x-1/2" v-if="!valid">Something is wrong with your image. Upload another one</p>
      </div>
    </div>
  </div>
</template>

<script setup>

import { onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'


// animations

gsap.defaults({
  ease: 'sine.easeInOut',
  duration: 0.75, 
  opacity: 0, 
  delay: 0.33
})

let mainAnimation = direction => {
  if (direction == 1) {
    gsap.defaults({
      duration: 0.75, 
      delay: 0.33, 
    })
    if (window.innerWidth > 768) {
      gsap.from('#title', {x: 50})
      gsap.from('#desc', {x: -100})
      gsap.from('#upload', {y: 75})
    }
    else {
      gsap.from('#title', {x:25})
      gsap.from('#desc', {x: -50})
      gsap.from('#upload', {y: 33})
    }
    gsap.to('#title', {opacity: 1})
    gsap.to('#desc', {opacity: 1})
    gsap.to('#upload', {opacity: 1})
  }
  else {
    gsap.defaults({
      duration: 0.5, 
      delay: 0
    })
    if (window.innerWidth > 768) {
      gsap.to('#title', {x: 50})
      gsap.to('#desc', {x: -100})
      gsap.to('#upload', {y: 75})
    }
    else {
      gsap.to('#title', {x:25})
      gsap.to('#desc', {x: -50})
      gsap.to('#upload', {y: 33})
    }
  }
}

onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('it is MOUNTED');
    mainAnimation(1)
  }
})

// main logic

let valid = ref(true)
const store = useStore()
const router = useRouter()

let setPath = (el) => {
  let file = el.target.files[0]
  store.commit('setSize', file.size)
  if (file.type.includes('image')) {
    const fileReader = new FileReader() 
    fileReader.readAsDataURL(file)
    fileReader.onload = e => {
      store.commit('setPath', e.target.result)
      mainAnimation(-1)
      setTimeout(() => {
        router.push('colors')
      }, 500)
    }
    valid.value = true
  }
  else {
    valid.value = false
  }
}
</script>