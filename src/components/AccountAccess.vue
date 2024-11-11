<!-- [src/components/AccountAccess.vue](src/components/AccountAccess.vue) -->

<template>
    <div v-if="isLoggedIn">
        <div class="btn">
            <router-link to="/account">My Account</router-link>
            <IconLogout @click="logout" />
        </div>
    </div>
    <div v-else>
        <div class="btn">
            <span @click="linkedInLogin">
                Login
                <IconLogin />
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useServer } from '../composables/useServer'
import IconLogin from './icons/IconLogin.vue'
import IconLogout from './icons/IconLogout.vue'

const userData = ref(null)
const { linkedInLogin, logout, fetchUser } = useServer()
const isLoggedIn = computed(() => userData.value)

onMounted(() => {
    fetchUser()
        .then((data) => {
            userData.value = data;
        })
})
</script>