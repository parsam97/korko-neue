<template>
    <div class="background-show" :style="backgroundStyle"></div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Define a default background configuration
const defaultBackground = {
    image: new URL('@/assets/bg/singlePlayerControl.png', import.meta.url).href,
    properties: {}
}

const routeBackground = computed(() => route.meta?.background)
const backgroundStyle = ref({})

watch(
    routeBackground,
    (newVal) => {
        const bgConfig = newVal || defaultBackground // Use route background or default

        backgroundStyle.value = {
            backgroundImage: `url(${bgConfig.image})`,
            backgroundPosition: bgConfig.properties?.backgroundPosition || 'center',
            backgroundSize: bgConfig.properties?.backgroundSize || 'cover',
            backgroundColor: bgConfig.properties?.backgroundColor || 'transparent',
            backgroundRepeat: 'no-repeat'
        }
    },
    { immediate: true }
)
</script>

<style scoped>
.background-show {
    position: fixed; /* Fixed position to cover the viewport */
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    filter: brightness(var(--color-background-brightness));
}
</style>
