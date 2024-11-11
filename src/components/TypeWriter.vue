<template>
    <div ref="typewriterContainer"></div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import Typewriter from 'typewriter-effect/dist/core';

const props = defineProps({
    texts: {
        type: Array,
        required: true,
    },
    options: {
        type: Object,
        default: () => ({}),
    }
})

const typewriterContainer = ref(null);
const typewriterInstance = ref(null);
const { locale } = useI18n();
const initTypeWriter = () => {
    if (typewriterInstance.value) {
        typewriterInstance.value.stop();
        typewriterInstance.value = null;
    }

    if (typewriterContainer.value) {
        typewriterContainer.value.innerHTML = '';
    }

    const defaultOptions = {
        loop: true,
    };

    typewriterInstance.value = new Typewriter(typewriterContainer.value, {
        ...defaultOptions,
        ...props.options,
    });

    props.texts.forEach((text) => {
        typewriterInstance.value
            .typeString(text)
            .pauseFor(2000)
            .deleteAll();
    });

    typewriterInstance.value.start();
};

onMounted(() => {
    initTypeWriter();
});

watch(
    [() => props.texts, () => locale.value],
    () => {
        initTypeWriter();
    }
);

onBeforeUnmount(() => {
    if (typewriterInstance.value) {
        typewriterInstance.value.stop();
        typewriterInstance.value = null;
    }
});
</script>

<style scoped>
/* Add any necessary styles */
</style>
