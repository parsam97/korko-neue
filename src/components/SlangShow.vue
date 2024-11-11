<script setup>
defineProps({
    slang: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="
        fc-light
    ">
        <p class="
            p-3
            m-0
            lh-sm
            fst-italic
        ">{{ slang }}</p>
    </div>
</template>

<style scoped>
.fc-light {
    color: var(--color-text);
}
</style>
