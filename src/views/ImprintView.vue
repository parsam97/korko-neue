<template>
    <StandardCard>
        <template #title>
            {{ $t('imprint.title') }}
        </template>
        <template #body>
            <div v-html="imprintHtml"></div>
        </template>
    </StandardCard>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import imprintMd from '@/imprint.md'
import StandardCard from '@/components/StandardCard.vue'

const imprintHtml = ref('')

const loadMarkdown = async () => {
    const response = await fetch(imprintMd)
    const text = await response.text()
    imprintHtml.value = new MarkdownIt().render(text)
}

onMounted(() => {
    loadMarkdown()
})
</script>