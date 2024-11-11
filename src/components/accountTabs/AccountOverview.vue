<template>
</template>

<script setup>
defineProps({
    userData: {
        type: Array,
        required: false
    }
})
</script>

<style scoped>
.flag-icon {
    width: 24px;
    height: 24px;
}

.flag-icon-small {
    width: 18px;
    height: 18px;
    margin-right: 8px;
}

.btn-outline-secondary {
    padding: 5px;
}
</style>
