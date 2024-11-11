<template>
    <div class="mb-4">
        <h5>Address Information</h5>
        <div class="row">
            <div class="col-12 col-md-6 mb-3">
                <label for="street" class="form-label">Street</label>
                <input type="text" class="form-control" id="street" :value="address.street" disabled />
            </div>
            <div class="col-12 col-md-6 mb-3">
                <label for="city" class="form-label">City</label>
                <input type="text" class="form-control" id="city" :value="address.city" disabled />
            </div>
            <div class="col-12 col-md-6 mb-3">
                <label for="state" class="form-label">State</label>
                <input type="text" class="form-control" id="state" :value="address.state" disabled />
            </div>
            <div class="col-12 col-md-6 mb-3">
                <label for="zip" class="form-label">Zip Code</label>
                <input type="text" class="form-control" id="zip" :value="address.zip" disabled />
            </div>
            <div class="col-12 col-md-6 mb-3">
                <label for="zip" class="form-label">Country</label>
                <input type="text" class="form-control" id="country" :value="address.country" disabled />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps({
    employee: {
        type: Object,
        required: true
    }
})
const address = ref({})

onMounted(() => {
    if (props.employee.address) {
        address.value = {
            street: props.employee.address.street,
            city: props.employee.address.city,
            state: props.employee.address.state,
            zip: props.employee.address.zip,
            country: props.employee.address.country
        }
    }
})
</script>