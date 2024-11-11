<script setup>
import WriteContent from '@/components/WriteContent.vue';
import SlangSlider from '@/components/SlangSlider.vue';
</script>

<template>
    <div class="d-flex flex-column">
        <WriteContent messageType="paragraph" messagePath="home.whatWeKnow" />
        <SlangSlider class="mt-sm-3 mt-md-5"/>
    </div>
</template>

<style scoped>
/* .slangs {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 2rem;
    font-weight: bold;
    color: #333;
} */
</style>