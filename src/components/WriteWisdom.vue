<template>
    <div class="wiseWrapper">
        <Typewriter :texts="slangs" :options="typewriterOptions" />
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Typewriter from '@/components/TypeWriter.vue'

const { locale, messages } = useI18n()
const slangs = computed(() => {
    const currentLocale = locale.value
    const currentMessages = messages.value[currentLocale]

    // Access the slangs array for the current locale
    const slangsArray = currentMessages?.slangs

    // Ensure slangsArray is an array
    return Array.isArray(slangsArray) ? slangsArray : []
})
const typewriterOptions = {
    delay: 75,
    deleteSpeed: 50,
    loop: true
}
</script>

<style scoped>
.wiseWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 2rem;
    font-weight: bold;
    color: #333;
}
</style>
