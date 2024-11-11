<template>
    <div class="container">
        <div class="row gy-4">
            <div class="col-12">
                <PlainCard>
                    <div class="row g-0">
                        <div class="col-sm-4 text-center text-sm-start">
                            <img
                                :src="getEmployeeImageUrl(employee.id)"
                                :class="imgClasses"
                                class="rounded-start"
                                :alt="employee.lastname"
                            />
                        </div>
                        <div class="col-sm-8">
                            <div class="card-body">
                                <h5 class="card-title mb-0">
                                    {{ getTranslation(employee.name) }}
                                </h5>
                                <p class="card-text">
                                    <small>{{ getTranslation(employee.position) }}</small>
                                </p>
                                <button
                                    v-if="hasCertificates"
                                    @click="toggleCertificates()"
                                    type="button"
                                    class="btn"
                                    :class="viewCertClassList"
                                >
                                    {{ $t('team.viewCerts') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </PlainCard>
            </div>
            <div v-if="showCertificates" class="col-12">
                <table class="table table-striped table-hover m-0" :class="[certTableClassList]">
                    <thead>
                        <tr>
                            <th scope="col">{{ $t('team.cert.label') }}</th>
                            <th scope="col">{{ $t('team.cert.authority') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(certificate, index) in employee.certificates" :key="index">
                            <td>{{ getTranslation(certificate.label) }}</td>
                            <td>{{ getTranslation(certificate.authority) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'
import { useLocale } from '@/composables/useLocale'
import PlainCard from '@/components/PlainCard.vue'

const { isDark } = useTheme()
const { locale } = useI18n()
const { getLanguage } = useLocale()
const language = getLanguage()
const isRTL = computed(() => language.value.isRTL)
const imgClasses = computed(() => {
    return {
        rtlRotation: language.value.isRtl
    }
})

const props = defineProps({
    employee: {
        type: Object,
        required: true
    }
})

const getEmployeeImageUrl = (employeeId) => {
    return new URL(`/src/assets/team/${employeeId}.png`, import.meta.url).href
}

const getTranslation = (field) => {
    return field && field[locale.value] ? field[locale.value] : (field['en']) ? field['en'] : field // Default to English if the selected language is unavailable
}

const viewCertClassList = computed(() => [
    isDark.value ? 'btn-dark' : 'btn-light'
])
const showCertificates = ref(false)
const hasCertificates = computed(() => {
    return props.employee.certificates && props.employee.certificates.length > 0
})
const toggleCertificates = () => {
    showCertificates.value = !showCertificates.value
}

const certTableClassList = computed(() => [
    isDark.value ? 'table-dark' : 'table-light'
])
</script>

<style scoped>
img {
    max-height: 150px;
}
.rtlRotation {
    transform: scaleX(-1);
}
</style>
