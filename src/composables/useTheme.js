import { ref, computed, onMounted } from 'vue';

// Theme Enum to avoid using string literals
const ThemeEnum = Object.freeze({
    LIGHT: 'light-mode',
    DARK: 'dark-mode',
    LIGHTSHORT: 'light',
    LIGHTCOLOR: 'white',
    DARKSHORT: 'dark',
    DARKCOLOR: 'black',
});

const theme = ref(ThemeEnum.LIGHT);

function loadPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme ? savedTheme : (prefersDark ? ThemeEnum.DARK : ThemeEnum.LIGHT);
    const currentThemeShort = currentTheme === ThemeEnum.DARK ? ThemeEnum.DARKSHORT : ThemeEnum.LIGHTSHORT;

    theme.value = currentTheme
    document.documentElement.classList.add(currentTheme);
    document.documentElement.setAttribute('data-bs-theme', currentThemeShort);
}

function toggleTheme() {
    const currentTheme = theme.value === ThemeEnum.DARK ? ThemeEnum.DARK : ThemeEnum.LIGHT;
    const newTheme = currentTheme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
    const newThemeShort = currentTheme === ThemeEnum.DARK ? ThemeEnum.LIGHTSHORT : ThemeEnum.DARKSHORT;

    document.documentElement.setAttribute('data-bs-theme', newThemeShort);
    document.documentElement.classList.remove(currentTheme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);

    theme.value = newTheme;
}

// Computed properties to check current theme state
const isDark = computed(() => theme.value === ThemeEnum.DARK);
const isLight = computed(() => theme.value === ThemeEnum.LIGHT);
const colorMode = computed(() => theme.value === ThemeEnum.DARK ? ThemeEnum.DARKSHORT : ThemeEnum.LIGHTSHORT);

export function useTheme() {
    onMounted(() => {
        loadPreferredTheme();
    });

    return {
        toggleTheme,
        theme,
        isDark,
        isLight,
        colorMode,
    };
}