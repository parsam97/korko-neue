import { ref, shallowRef, watch, computed } from 'vue';
import IconFlag_de from '@/components/icons/IconFlag_de.vue'
import IconFlag_en from '@/components/icons/IconFlag_en.vue'
import IconFlag_fa from '@/components/icons/IconFlag_fa.vue'
const availableLanguages = shallowRef([
    {
        component: IconFlag_de,
        name: 'de',
        isRtl: false,
    },
    {
        component: IconFlag_en,
        name: 'en',
        isRtl: false,
    },
    {
        component: IconFlag_fa,
        name: 'fa',
        isRtl: true,
    },
]);
const locale = ref('en');

export function useLocale() {
    function loadPreferredLocale() {
        const savedLocale = localStorage.getItem('locale');
        const defaultLocale = navigator.language.split('-')[0];
        const availableLanguageNames = availableLanguages.value.map((lang) => lang.name)
    
        if (availableLanguageNames.includes(savedLocale)) {
            locale.value = savedLocale;
        } else if (availableLanguageNames.includes(defaultLocale)) {
            locale.value = defaultLocale;
        } else {
            locale.value = availableLanguageNames[0];
        }
    }
    
    // Function to update the locale and save to localStorage
    function setLanguage(newLocale) {
        const availableLanguageNames = availableLanguages.value.map((lang) => lang.name)
        if (availableLanguageNames.includes(newLocale.name)) {
            locale.value = newLocale.name;
            localStorage.setItem('locale', newLocale);
        }
    }
    
    function getLanguage() {
        return computed(() => availableLanguages.value.find((lang) => lang.name === locale.value))
    }

    watch(locale, (newLocale) => {
        const selectedLanguage = availableLanguages.value.find((lang) => lang.name === newLocale);
        if (selectedLanguage) {
            document.documentElement.dir = selectedLanguage.isRtl ? 'rtl' : 'ltr';
            document.documentElement.style.textAlign = selectedLanguage.isRtl ? 'right' : 'left';
            document.documentElement.lang = selectedLanguage.name;
        }
    }, { immediate: true });

    return {
        locale,
        availableLanguages,
        getLanguage,
        setLanguage,
        loadPreferredLocale,
    }
}