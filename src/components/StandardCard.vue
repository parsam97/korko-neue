<script setup>
import PlainCard from '@/components/PlainCard.vue'
</script>

<template>
    <PlainCard>
        <div class="card-body">
            <h5 class="card-title">
                <slot name="title"></slot>
            </h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">
                <slot name="subtitle"></slot>
            </h6>

            <slot name="body"></slot>
        </div>
    </PlainCard>
</template>