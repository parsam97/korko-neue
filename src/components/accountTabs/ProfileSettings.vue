<template>
    <!-- Checking if registered -->
    <div v-if="checkingRegistration"><strong>Checking registration...</strong></div>

    <!-- If registered -->
    <div v-else-if="hasAccount" :account="account">
        <div id="myAlert" class="alert alert-dismissible fade" :class="alertClasses" role="alert">
            <strong>Alert! </strong>{{ alertMessage }}
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
            ></button>
        </div>

        <div class="accordion" id="accordion">
            <div v-for="employee in employees" :key="employee.id" class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        :class="{ collapsed: expandedAccordion !== employee.id }"
                        :data-bs-target="'#' + employee.id"
                        :aria-controls="employee.id"
                    >
                        {{ employee.firstname }} {{ employee.lastname }}
                    </button>
                </h2>
                <div
                    :id="employee.id"
                    :class="{ show: expandedAccordion === employee.id }"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordion"
                >
                    <div class="accordion-body">
                        <MakeFeatured :employee="employee" v-if="account.featurePerm" />
                        <ManageCertificates :employee="employee" v-if="account.certPerm" />
                        <ManageAddress :employee="employee" v-if="account.addressPerm" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- If not registered -->
    <div v-else><strong>Not registered</strong></div>
</template>

<script setup>
defineProps({
    userData: {
        type: Array,
        required: false
    }
})

import { ref, computed, onMounted } from 'vue'
import { useServer } from '@/composables/useServer'
import StandardCard from '@/components/StandardCard.vue'
import MakeFeatured from './profileSettings/MakeFeatured.vue'
import ManageCertificates from './profileSettings/ManageCertificates.vue'
import ManageAddress from './profileSettings/ManageAddress.vue'

const { fetchAccount, fetchMyEmployees } = useServer()
const hasAccount = computed(() => account.value)
const account = ref(null)
const employees = ref([])
const checkingRegistration = ref(true)
const expandedAccordion = ref(null)

const alertClasses = ref('d-none')
const alertMessage = ref('')

function alertResult(type, message) {
    alertClasses.value = `alert-${type} show`
    alertMessage.value = message
}

onMounted(() => {
    fetchAccount()
        .then((data) => {
            console.log('account', data)
            account.value = data

            fetchMyEmployees()
                .then((data) => {
                    console.log('my employees', data)
                    employees.value = data
                    expandedAccordion.value = data[0].id
                })
                .catch((error) => {
                    console.error('employees', error)
                })
        })
        .finally(() => {
            checkingRegistration.value = false
        })
})
</script>
