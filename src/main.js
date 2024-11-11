import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';

import { createI18n } from 'vue-i18n';
import en from './i18n/en.json';
import de from './i18n/de.json';
import fa from './i18n/fa.json';

import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/main.css';

import { useLocale } from '@/composables/useLocale';

const { locale, loadPreferredLocale } = useLocale();

// Load preferred locale before creating the I18n instance
loadPreferredLocale();

const i18n = createI18n({
    legacy: false,
    locale: locale.value,  // Use the current locale value
    fallbackLocale: 'en',
    messages: {
        'en': en,
        'de': de,
        'fa': fa,
    }
});

const app = createApp(App);

app.use(i18n);
app.use(router);
app.mount('#app');
