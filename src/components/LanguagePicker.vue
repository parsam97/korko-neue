<template>
    <div class="dropdown p-0">
        <span
            data-bs-toggle="dropdown"
            aria-expanded="false"
            :class="buttonClassList"
        >
            <template v-if="showIconOnly">
                <component :is="language.component" class="flag-icon-button" />
            </template>
            <template v-else>
                {{ $t(`meta.${language.name}`) }}
            </template>
        </span>
        <ul class="dropdown-menu" :class="dropdownMenuClassList">
            <li v-for="lang in availableLanguages" :key="lang.name">
                <button
                    class="dropdown-item"
                    :class="dropdownItemClassList"
                    @click="setThisLanguage(lang)"
                >
                    <component class="flag-icon-small me-1" :is="lang.component" />
                    {{ $t(`meta.${lang.name}`) }}
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useI18n } from 'vue-i18n'

const props = defineProps({
    showIconOnly: {
        type: Boolean,
        default: false
    }
})

const { locale: i18nLocale } = useI18n()
const { availableLanguages, getLanguage, setLanguage } = useLocale()
const language = getLanguage()

const dropdownMenuClassList = computed(() => [
    { 'dropdown-menu-start': language.value.isRtl },
    { 'dropdown-menu-end': !language.value.isRtl }
])

const dropdownItemClassList = computed(() => ({
    'text-end': language.value.isRtl
}))

const buttonClassList = computed(() => [
    'd-flex',
    'btn',
    'p-0', 
    // { 'dropdown-toggle': !props.showIconOnly }
])

function setThisLanguage(lang) {
    setLanguage(lang)
    i18nLocale.value = lang.name
}
</script>

<style scoped>
.flag-icon-button,
.flag-icon-small {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    display: inline-block;
    overflow: hidden;
    border-radius: 50%;
}

.flag-icon-button svg,
.flag-icon-small svg {
    width: 100%;
    height: 100%;
    display: block;
}
</style>
