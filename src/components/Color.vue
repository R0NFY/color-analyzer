<template>
    <div class="rounded-[min(1.875vw,_1.5rem)] h-[min(7.5vw,_6rem)] cursor-pointer [transition:background-color_0.25s_ease-in-out]" id="color" :style="`background-color: ${hexValue};`"></div>
</template>

<script setup>
    defineProps({
        hexValue: String, 
    })
</script>