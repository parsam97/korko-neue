<script setup>
import { ref, onMounted } from 'vue'
import WriteContent from '@/components/WriteContent.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import { useServer } from '@/composables/useServer'

// Reactive variable to hold employee data
const employees = ref([])
const { fetchEmployees } = useServer()

function getEmployees() {
    fetchEmployees().then((data) => {
        employees.value = data
    })
}

// Call fetchEmployees when component mounts
onMounted(() => {
    getEmployees()
})
</script>

<template>
    <div class="container">
        <div class="row gy-3">
            <div class="col-12 col-lg-6" v-for="employee in employees" :key="employee.id">
                <ProfileCard :employee="employee" />
            </div>
        </div>
    </div>

    <!-- Slang -->
    <WriteContent class="my-4" messageType="slang" messagePath="slangs.meeting" />
</template>
