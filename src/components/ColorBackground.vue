<template>
    
    <!-- Colors -->
    <div class="test colorful-wrapper screen-dimensions position-fixed">
        
        <!-- Background -->
        <BackgroundShow class="background-show" />

        <div class="h-100 w-100 position-fixed overflow-y-auto">
            <slot></slot>
        </div>
    </div>

</template>

<script setup>
import BackgroundShow from '@/components/BackgroundShow.vue'
</script>

<style scoped>
.screen-dimensions {
    height: 100vh;
    width: 100vw;
}

.background-show {
    height: 100%;
    width: 100%;
    mix-blend-mode: overlay;
}

/* Parent container */
.colorful-wrapper {
    position: relative;
    overflow: hidden;
}

/* Rotating gradient */
.colorful-wrapper::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(100vw * 3.5);
    height: calc(100vw * 3.5);
    background: linear-gradient(0deg, var(--korko-blue), var(--korko-green));
    transform: translate(-50%, -50%) rotate(0deg);
    transform-origin: center;
    animation: gradientRotation var(--korko-animation-speed) linear infinite;
}

</style>