<template>
    <ColorBackground>
        <!-- Navigation bar -->
        <MainNavigation />
        
        <!-- Main Content -->
        <div class="container-fluid">
            <div class="row justify-content-center pt-4">
                <div class="col-11 col-sm-10 col-md-9 col-lg-8 col-xl-8 col-xxl-7">
                    <RouterView />
                </div>
            </div>
        </div>
    
        <!-- Footer -->
        <FooterNavigation class="d-none d-md-block" />
    </ColorBackground>


</template>

<script setup>
import ColorBackground from './components/ColorBackground.vue'
import MainNavigation from './components/MainNavigation.vue'
import FooterNavigation from './components/FooterNavigation.vue'
</script>

<style scoped>
</style>
