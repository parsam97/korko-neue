<template>
    <div class="d-flex toggleDiv" @click="toggleTheme">
        <MoonIcon v-if="isDark" />
        <SunIcon v-if="isLight" />
    </div>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'
import MoonIcon from './icons/IconMoon.vue'
import SunIcon from './icons/IconSun.vue'

const { toggleTheme, isDark, isLight } = useTheme()
</script>

<style scoped>
.toggleDiv {
    cursor: pointer;
}

.toggleDiv:hover {
    opacity: 0.7;
}
</style>