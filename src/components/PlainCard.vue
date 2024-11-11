<template>
    <div class="card cardWrapper border-0" :class="cardClassList">
        <slot></slot>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { isLight } = useTheme()
const props = defineProps({
    alwaysDark: {
        type: Boolean,
        default: false
    }
})

const cardClassList = computed(() => [
    isLight.value ? 'bg-light' : 'bg-dark',
    {'text-bg-dark': props.alwaysDark}
])
</script>

<style scoped>
.cardWrapper {
    backdrop-filter: blur(10px);
    /* background-color: var(--color-background); */
}
</style>