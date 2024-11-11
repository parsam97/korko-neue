<script setup>
import WriteContent from '@/components/WriteContent.vue';
</script>

<template>
    <!-- Title -->
    <WriteContent
        messageType="title"        
        messagePath="law.title" />

    <!-- Law text -->
    <WriteContent
        class="mb-4"
        messageType="paragraph"
        messagePath="law.yourLaw" />

    <!-- Financial title -->
    <WriteContent
        messageType="subtitle"
        messagePath="law.financialTitle" />

    <!-- Our responsibilities -->
    <WriteContent
        classes="text-white h5 fw-bold"
        messageType="plain"
        messagePath="global.ourResponsibilities" />

    <!-- Financial responsibilities -->
    <WriteContent
        class="mb-4"
        options="list"
        messageType="paragraph"
        messagePath="law.financialResponsibilities" />

    <!-- Contract title -->
    <WriteContent
        messageType="subtitle"
        messagePath="law.contractTitle" />

    <!-- Our responsibilities -->
    <WriteContent
        classes="text-white h5 fw-bold"
        messageType="plain"
        messagePath="global.ourResponsibilities" />

    <!-- Contract responsibilities -->
    <WriteContent
        class="mb-4"
        options="list"
        messageType="paragraph"
        messagePath="law.contractResponsibilities" />

    <!-- Transfer title -->
    <WriteContent
        messageType="subtitle"
        messagePath="law.transferTitle" />

    <!-- Our responsibilities -->
    <WriteContent
        classes="text-white h5 fw-bold"
        messageType="plain"
        messagePath="global.ourResponsibilities" />

    <!-- Transfer responsibilities -->
    <WriteContent
        options="list"
        messageType="paragraph"
        messagePath="law.transferResponsibilities" />

    <!-- Slang -->
    <WriteContent
        class="my-4"
        messageType="slang"
        messagePath="slangs.carelessness" />
</template>