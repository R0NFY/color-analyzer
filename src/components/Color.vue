<template>
    <div class="rounded-[min(1.875vw,_1.5rem)] h-[min(7.5vw,_6rem)] cursor-pointer" id="color" :style="`background-color: ${hexValue};`"></div>
</template>

<script setup>
    defineProps({
        hexValue: String, 
    })
</script>