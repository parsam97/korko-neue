<script setup>
import WriteContent from '@/components/WriteContent.vue';
</script>

<template>
    <!-- Title -->
    <WriteContent
        messageType="title"
        messagePath="player.title" />

    <!-- Player text -->
    <WriteContent
        class="mb-4"
        options="centerAlign"
        messagePath="player.yourPlayer" />

    <!-- Schooling subtitle -->
    <WriteContent
        messageType="subtitle"
        messagePath="player.schoolingSubtitle" />

    <!-- Our responsibilities -->
    <WriteContent
        classes="text-white h5 fw-bold"
        messageType="plain"
        messagePath="global.ourResponsibilities" />
    
    <!-- Schooling responsibilities -->
    <WriteContent
        class="mb-4"
        options="list"
        messagePath="player.schoolingResponsibilities" />

    <!-- Marketing subtitle -->
    <WriteContent
        messageType="subtitle"
        messagePath="player.marketingSubtitle" />

    <!-- Our responsibilities -->
    <WriteContent
        classes="text-white h5 fw-bold"
        messageType="plain"
        messagePath="global.ourResponsibilities" />

    <!-- Marketing responsibilities -->
    <WriteContent
        options="list"
        messagePath="player.marketingResponsibilities" />

    <!-- Slang -->
    <WriteContent
        class="my-4"
        messageType="slang"
        messagePath="slangs.concentrate" />
</template>