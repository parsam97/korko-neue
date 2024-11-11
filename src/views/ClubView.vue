<script setup>
import WriteContent from '@/components/WriteContent.vue';
</script>

<template>
    <!-- Title -->
    <WriteContent
        messageType="title" 
        messagePath="club.title" />

    <!-- Club text -->
    <WriteContent
        options="centerAlign"
        messagePath="club.yourClub" />

    <!-- Events subtitle -->
    <WriteContent
        class="mt-4"
        messageType="subtitle"
        messagePath="club.eventsSubtitle"/>

    <!-- Events -->
    <WriteContent
        messagePath="club.events" />

    <!-- Our responsibilities -->
    <WriteContent
        classes="text-white h5 fw-bold mt-4"
        messageType="plain"
        messagePath="global.ourResponsibilities" />

    <!-- Our responsibilities -->
    <WriteContent
        options="list"
        messagePath="club.eventResponsibilities" />

    <!-- Federation subtitle -->
    <WriteContent
        class="mt-4"
        messageType="subtitle"
        messagePath="club.federationSubtitle"/>

    <!-- Federation -->
    <WriteContent
        options="centerAlign"
        messagePath="club.federation" />

    <!-- Our responsibilities -->
    <WriteContent
        classes="text-white h5 fw-bold mt-4"
        messageType="plain"
        messagePath="global.ourResponsibilities" />

    <!-- Federation responsibilities -->
    <WriteContent
        options="list"
        messagePath="club.federationResponsibilities" />

    <!-- Slang -->
    <WriteContent
        class="my-4"
        messageType="slang"
        messagePath="slangs.beginning" />
</template>