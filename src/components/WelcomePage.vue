<template>
  <div class="font-poppins text-center h-[97vh] grid place-items-center text-dark">
    <div class="bg-pattern h-full w-screen absolute z-[-1] bg-cover bg-center blur-[calc(4.5vw_+_4.5vh)]" id="pattern"></div>
    <div class="grid gap-5 sm:gap-6 md:gap-8 w-10/12 xl:w-10/12 max-w-[25rem] sm:max-w-[30rem] md:max-w-[38rem] xl:max-w-[840px] relative">
      <h1 class="text-4xl leading-tight sm:leading-tight sm:text-5xl md:text-6xl md:leading-tight xl:text-7xl font-semibold xl:leading-tight" id="title">Get a bit more than just a palette</h1>
      <p class="text-xl sm:text-2xl md:text-3xl xl:text-[44px] xl:leading-normal" id="desc">It's easier to pick the right color when you can see them in context. </p>
      <div>
        <input type="file" accept="image/*" id="file" class="absolute w-[0.1px] h-[0.1px] opacity-0 overflow-hidden z-[-1]">
        <label class="block leading-tight text-[22px] sm:text-[28px] md:text-[34px] xl:text-[44px] font-semibold py-[0.625em] px-[0.9375em] border-dark border-[3px] md:border-4 xl:border-[5px] rounded-xl xl:rounded-3xl w-max mx-auto cursor-pointer btn draw-border" id="upload" for="file">Upload your image</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from '@vue/runtime-core'
import { gsap } from 'gsap'
gsap.defaults({
  ease: 'sine.easeInOut',
  duration: 1, 
  opacity: 0, 
  delay: 0.33
})
onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.from('#pattern', {duration: 0.5, delay: 0})
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

</script>