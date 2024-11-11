<template>
    <div class="mb-4">
        <h5>Feature profile</h5>
        <div class="form-check mb-4">
            <input
                class="form-check-input"
                type="checkbox"
                id="showProfile"
                :checked="employee.feature"
                disabled
            />
            <label class="form-check-label" for="showProfile">Feature my profile on the Teams page</label>
        </div>
    </div>
</template>

<script setup>
defineProps({
    employee: {
        type: Object,
        required: true
    }
})
</script>
