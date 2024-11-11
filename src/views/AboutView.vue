<script setup>
import WriteContent from '@/components/WriteContent.vue';

</script>

<template>
    <!-- Title -->
    <WriteContent
        messageType="title" 
        messagePath="about.title" />

    <!-- Passion text -->
    <WriteContent
        messagePath="about.yourPassion" />

    <!-- Slang scope -->
    <WriteContent
        class="my-3"
        options="centerAlign"
        messageType="slang" 
        messagePath="slangs.scope" />

    <!-- Our responsibilities -->
    <WriteContent
        classes="text-white h5 fw-bold"
        messageType="plain"
        messagePath="global.ourResponsibilities" />

    <!-- Our responsibilities -->
    <WriteContent
        options="list"
        messagePath="about.ourResponsibilities" />

    <!-- Slang trust -->
    <WriteContent
        class="my-4"
        messageType="slang" 
        messagePath="slangs.trust" />
</template>