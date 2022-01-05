<template>
  <div class="font-poppins text-center h-[97vh] grid place-items-center text-dark select-none">
    <div class="grid gap-5 sm:gap-6 md:gap-8 w-10/12 xl:w-10/12 max-w-[25rem] sm:max-w-[30rem] md:max-w-[38rem] xl:max-w-[840px] relative">
      <h1 class="text-4xl leading-tight sm:leading-tight sm:text-5xl md:text-6xl md:leading-tight xl:text-7xl font-semibold xl:leading-tight" id="title">Get a bit more than just a palette</h1>
      <p class="text-xl sm:text-2xl md:text-3xl xl:text-[44px] xl:leading-normal" id="desc">It's easier to pick the right color when you can see them in context. </p>
      <div>
        <input type="file" accept="image/*" id="file" class="absolute w-[0.1px] h-[0.1px] opacity-0 overflow-hidden z-[-1]" @change="setPath">
        <label class="block leading-tight text-[22px] sm:text-[28px] md:text-[34px] xl:text-[44px] font-semibold py-[0.625em] px-[0.9375em] border-dark border-[3px] md:border-4 xl:border-[5px] rounded-2xl xl:rounded-[2rem] w-max mx-auto cursor-pointer hover:bg-dark hover:text-light active:bg-dark active:text-light transition-colors" id="upload" for="file">Upload your image</label>
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
gsap.defaults({
  ease: 'sine.easeInOut',
  duration: 1, 
  opacity: 0, 
  delay: 0.33
})
onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (window.innerWidth > 800) {
      gsap.from('#title', {x: 50, duration: 0.75})
      gsap.from('#desc', {x: -100})
      gsap.from('#upload', {y: 75})
    }
    else {
      gsap.from('#title', {x:25, duration: 0.75})
      gsap.from('#desc', {x: -50})
      gsap.from('#upload', {y: 33})
    }
  }
})
let valid = ref(true)
const store = useStore()
const router = useRouter()
let setPath = (el) => {
  let file = el.target.files[0]
  if (file.type.includes('image')) {
    const fileReader = new FileReader() 
    fileReader.readAsDataURL(file)
    fileReader.onload = e => {
      store.commit('setPath', e.target.result)
      router.push('colors')
    }
    valid.value = true
  }
  else {
    valid.value = false
  }
}
</script>