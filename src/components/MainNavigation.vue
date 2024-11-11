<template>
    <nav class="navbar navbar-expand-md sticky-top" :class="[navbarNavClassList]">
        <a
            class="navbar-brand d-md-none position-absolute top-50 start-50 translate-middle"
            href="/"
        >
            <!-- Logo for mobile -->
            <img src="@/assets/korkoLogo.png" alt="Logo" style="max-height: 36px" />
        </a>
        <div class="container-fluid">
            <!-- Logo for desktop screens -->
            <a class="navbar-brand d-none d-md-inline" href="/">
                <!-- Logo -->
                <img src="@/assets/korkoLogo.png" alt="Logo" style="max-height: 36px" />
            </a>

            <!-- Toggler for mobile offcanvas -->
            <button
                class="navbar-toggler p-1"
                type="button"
                @click="toggleOffcanvas"
                aria-controls="offcanvasNavbar"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon" style="background-size: 70%"></span>
            </button>

            <!-- Collapsible content for desktop -->
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item" v-for="route in filteredRoutes" :key="route.path">
                        <router-link
                            class="nav-link"
                            :to="route.path"
                            :class="{
                                active: currentRoute.path == route.path,
                                activeNavLink: currentRoute.path == route.path
                            }"
                            :aria-current="currentRoute.path == route.path ? 'page' : null"
                        >
                            {{ $t(route.meta.labelKey) }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Offcanvas div -->
    <div
        tabindex="-1"
        ref="offcanvasRef"
        :class="offcanvasDivClassList"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
    >
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                {{ $t('korko.fullName') }}
            </h5>
            <button
                type="button"
                :class="closeButtonClassList"
                @click="hideOffcanvas"
                aria-label="Close"
            ></button>
        </div>
        <div class="offcanvas-body d-flex flex-column">
            <ul class="navbar-nav justify-content-start flex-grow-1 pe-3">
                <li class="nav-item" v-for="route in filteredRoutes" :key="route.path">
                    <router-link
                        class="nav-link"
                        :to="route.path"
                        @click="hideOffcanvas"
                        :class="{
                            active: currentRoute.path == route.path,
                            activeNavLink: currentRoute.path == route.path
                        }"
                        :aria-current="currentRoute.path == route.path ? 'page' : null"
                    >
                        {{ $t(route.meta.labelKey) }}
                    </router-link>
                </li>
            </ul>

            <!-- Spacer -->
            <div class="flex-grow-1"></div>

            <!-- Theme toggle and language picker -->
            <div class="d-flex justify-content-between align-items-center">
                <!-- Language picker -->
                <LanguagePicker />

                <!-- Theme toggle -->
                <ThemeToggle />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useLocale } from '@/composables/useLocale'
import { Offcanvas } from 'bootstrap'
import LanguagePicker from './LanguagePicker.vue'
import ThemeToggle from './ThemeToggle.vue'

const { locale, getLanguage } = useLocale()
const { toggleTheme, isDark, isLight, colorMode } = useTheme()

const router = useRouter()
const filteredRoutes = router.options.routes.filter(
    (route) => route.meta && route.meta.showInNavbar
)
const language = getLanguage()
const currentRoute = computed(() => router.currentRoute.value)

const offcanvasRef = ref(null)
const offcanvasInstance = ref(null)

const offcanvasDirection = computed(() => (language.value.isRtl ? 'end' : 'start'))
const offcanvasDivClassList = ref(['offcanvas', `offcanvas-${offcanvasDirection.value}`])

const navbarNavClassList = computed(() => [
    isLight.value ? 'bg-light' : 'bg-dark',
])
const closeButtonClassList = computed(() => [
    'btn-close',
    isLight.value ? 'btn-close-black' : 'btn-close-white'
])

const toggleOffcanvas = () => {
    if (offcanvasInstance.value) {
        offcanvasInstance.value.toggle()
    }
}

const hideOffcanvas = () => {
    if (offcanvasInstance.value) {
        offcanvasInstance.value.hide()
    }
}

onMounted(() => {
    if (offcanvasRef.value) {
        offcanvasInstance.value = new Offcanvas(offcanvasRef.value)
    }
})

watch(offcanvasDirection, async () => {
    let wasOpen = false

    // Check if the offcanvas is currently shown
    if (offcanvasRef.value && offcanvasRef.value.classList.contains('show')) {
        wasOpen = true
    }

    // Dispose of the existing instance
    if (offcanvasInstance.value) {
        offcanvasInstance.value.dispose()
        offcanvasInstance.value = null
    }

    // Update the class list to reflect the new direction
    offcanvasDivClassList.value = ['offcanvas', `offcanvas-${offcanvasDirection.value}`]

    await nextTick()

    // Re-initialize the offcanvas instance
    if (offcanvasRef.value) {
        offcanvasInstance.value = new Offcanvas(offcanvasRef.value)

        // If it was open before, re-open it
        if (wasOpen) {
            offcanvasInstance.value.show()
        }
    }
})
</script>

<style scoped>
.activeNavLink {
    font-weight: bold;
}

.btn-outline-secondary {
    padding: 5px;
}

.offcanvas-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.offcanvas-header .btn-close {
    margin: 0;
}

.offcanvas-header .btn-close {
    margin-inline-start: auto;
}

.navbar-toggler-icon {
    width: 30px;
    background-size: 80%;
}

.navbar {
    width: 100%;
    backdrop-filter: blur(8px);
    /* background: var(--color-background); */
}

/* 
.navbar {
    position: relative;
    overflow: hidden;
}

.navbar::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, var(--overlay-opacity));
    backdrop-filter: blur(1px);
    z-index: -1;
    pointer-events: none;
}
.navbar::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--korko-gradient-colors);
    background-size: 400% 400%;
    animation: gradientAnimation var(--korko-animation-speed) ease infinite;
    opacity: var(--overlay-opacity);
    z-index: -2;
}

.offcanvas {
    overflow: hidden;
}

.offcanvas::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, var(--overlay-opacity));
    backdrop-filter: blur(1px);
    z-index: -1;
    pointer-events: none;
}

.offcanvas::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--korko-gradient-colors);
    background-size: 400% 400%;
    animation: gradientAnimation var(--korko-animation-speed) ease infinite;
    opacity: var(--overlay-opacity);
    z-index: -2;
}

.offcanvas .offcanvas-header,
.offcanvas .offcanvas-body,
.offcanvas .nav-item,
.offcanvas .nav-link {
    position: relative;
    z-index: 0;
}

.navbar .navbar-brand,
.navbar .navbar-toggler,
.navbar .nav-link {
    position: relative;
    z-index: 2; Above the pseudo-elements
} */
</style>
