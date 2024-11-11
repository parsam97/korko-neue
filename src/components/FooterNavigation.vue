<template>
    <div class="wrapper">
        <div class="d-flex flex-row-reverse">
            <div
                class="pb-4 px-3 pb-sm-4 px-sm-3 pb-md-4 px-md-3 pb-lg-4 px-lg-3 pb-xl-4 px-xl-3 pb-xxl-4 px-xxl-3"
            >
                <PlainCard :alwaysDark="true" class="px-3 py-1">
                    <div class="d-flex align-items-center">
                        <!-- Theme Toggle -->
                        <ThemeToggle />

                        <!-- Gap -->
                        <GapSpacer />

                        <!-- Imprint link -->
                        <router-link class="nav-link" to="/imprint">
                            {{ $t('navigation.imprint') }}
                        </router-link>

                        <!-- Gap -->
                        <GapSpacer />

                        <!-- Language picker -->
                        <LanguagePicker :showIconOnly="true" />
                    </div>
                </PlainCard>
            </div>
        </div>
    </div>
</template>

<script setup>
import LanguagePicker from '@/components/LanguagePicker.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import GapSpacer from '@/components/GapSpacer.vue'
import PlainCard from '@/components/PlainCard.vue'
</script>

<style scoped>
.wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-right: 0.5rem;
}
.dropdown-menu {
    text-align: inherit;
}

.flag-icon-small {
    width: 18px;
    height: 18px;
}

.flag-icon {
    width: 24px;
    height: 24px;
}

@media (min-width: 576px) {
    /* Bootstrap `sm` breakpoint */
    .flag-icon {
        width: 26px;
        height: 26px;
    }
}

@media (min-width: 768px) {
    /* Bootstrap `md` breakpoint */
    .flag-icon {
        width: 28px;
        height: 28px;
    }
}

@media (min-width: 992px) {
    /* Bootstrap `lg` breakpoint */
    .flag-icon {
        width: 30px;
        height: 30px;
    }
}

@media (min-width: 1200px) {
    /* Bootstrap `xl` breakpoint */
    .flag-icon {
        width: 32px;
        height: 32px;
    }
}
</style>
