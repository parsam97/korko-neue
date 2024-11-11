<template>
    <div class="mb-4">
        <h5>Certificates</h5>
        <table class="table" v-if="employee.certificates">
            <thead>
                <tr><th scope="col">Property</th><th scope="col">English</th><th scope="col">German</th><th scope="col">Persian</th></tr>
            </thead>
            <tbody>
                <tr
                    v-for="(certificate, index) in employee.certificates"
                    :key="index"
                >
                    <th scope="row">Label</th><td>{{ certificate.label.en }}</td><td>{{ certificate.label.de }}</td><td>{{ certificate.label.fa }}</td>
                </tr>
            </tbody>
        </table>
        <div v-else class="text-center">
            No certificates
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
const { locale } = useLocale()
const computedLocale = computed(() => locale.value)
defineProps({
    employee: {
        type: Object,
        required: true
    }
})
</script>