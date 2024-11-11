<template>
    <div :class="[wrapperClass]">
        <div v-if="isTitle">
            <h3 class="headerText">
                {{ messageText }}
            </h3>
        </div>

        <div v-if="isSubtitle">
            <h4 class="subheaderText">
                {{ messageText }}
            </h4>
        </div>

        <div v-if="isPlain" :class="[plainClass]">
            {{ messageText }}
        </div>

        <div v-if="isSlang" class="slangText text-center fst-italic fw-light fs-6">
            {{ messageText }}
        </div>

        <div v-if="isParagraph">
            <PlainCard class="shadow px-4 pt-3 pb-1">
                <ul v-if="inListFormat">
                    <li v-for="item in messageText.split('\n')" :key="item">{{ item }}</li>
                </ul>
                <p
                    v-else-if="inStandardFormat"
                    v-for="item in messageText.split('\n')"
                    :key="item"
                    class="paragraphText"
                >
                    {{ item }}
                </p>
            </PlainCard>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PlainCard from '@/components/PlainCard.vue'

const { locale, messages } = useI18n()
const props = defineProps({
    messageType: {
        type: String,
        default: 'paragraph'
    },
    messagePath: {
        type: String,
        required: true
    },
    options: {
        type: String,
        default: ''
    },
    classes: {
        type: String
    }
})
const messageText = computed(() => {
    const currentLocale = locale.value
    var currentMessages = messages.value[currentLocale]

    props.messagePath.split('.').forEach((key) => {
        currentMessages = currentMessages[key]
    })

    return currentMessages
})
const optionsArray = computed(() => props.options.split(','))

const isTitle = computed(() => props.messageType === 'title')
const isSubtitle = computed(() => props.messageType === 'subtitle')
const isSlang = computed(() => props.messageType === 'slang')
const isParagraph = computed(() => props.messageType === 'paragraph')
const isPlain = computed(() => props.messageType === 'plain')

const inListFormat = computed(() => optionsArray.value.includes('list'))
const inStandardFormat = computed(() => inListFormat.value === false)

const wrapperClass = computed(() => {
    const classes = []

    if (optionsArray.value.includes('centerAlign')) {
        classes.push('text-center')
    }

    if (optionsArray.value.includes('verticalBordered')) {
        classes.push('border-2')
        classes.push('border-top')
        classes.push('border-bottom')
    }

    return classes.join(' ')
})
const plainClass = computed(() => props.classes)
</script>

<style scoped>
.slangText {
    color: var(--color-white);
}
.headerText {
    color: var(--color-heading);
    text-align: center;
}
.subheaderText {
    color: var(--color-subheading);
    text-align: center;
}
.listWrapper {
    background-color: var(--color-background);
}
.paragraphWrapper {
    background-color: var(--color-background);
}
.paragraphText {
    color: var(--color-text);
}
</style>
