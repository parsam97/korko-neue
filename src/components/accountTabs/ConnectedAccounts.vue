<template>
    <form>
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4 mb-3">
                <label class="form-label">LinkedIn Account</label>
                <input type="text" class="form-control" :value="userData.name" disabled readonly />
            </div>
            <div class="col-12 col-md-6 col-lg-4 mb-3">
                <label class="form-label">LinkedIn ID</label>
                <input type="text" class="form-control" :value="userData.sub" disabled readonly />
            </div>
            <div class="col-12 col-md-6 col-lg-4 mb-3 d-flex justify-content-end align-items-end">
                <button @click="logout" type="button" class="btn btn-danger">
                    Disconnect
                </button>
            </div>
        </div>
    </form>
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
.card {
    transition:
        background-color 0.3s ease,
        color 0.3s ease;
}
</style>
