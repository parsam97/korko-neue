<template>
    <div v-if="isLoggedIn">
        <div class="container my-5">
            <div class="row">
                <!-- Sidebar -->
                <div class="col-md-3 mb-3">
                    <div class="list-group">
                        <button
                            v-for="tab in tabs"
                            :key="tab.id"
                            type="button"
                            @click="currentTabId = tab.id"
                            class="list-group-item list-group-item-action"
                            :class="{ active: currentTabId == tab.id }"
                            :aria-current="currentTabId == tab.id ? 'true' : null"
                        >
                            {{ tab.label }}
                        </button>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="col-md-9">
                    <StandardCard>
                        <template v-slot:title>
                            {{ currentTab.title }}
                        </template>
                        <template v-slot:subtitle>
                            {{ currentTab.subtitle }}
                        </template>
                        <template v-slot:body>
                            <component :is="currentTab.component" :userData="userData" />
                        </template>
                    </StandardCard>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <span>
            Login
            <IconLogin @click="initiateLinkedInLogin" />
        </span>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useServer } from '@/composables/useServer'
import StandardCard from '@/components/StandardCard.vue'
import AccountOverview from '@/components/accountTabs/AccountOverview.vue'
import ConnectedAccounts from '@/components/accountTabs/ConnectedAccounts.vue'
import ProfileSettings from '@/components/accountTabs/ProfileSettings.vue'
import SecuritySettings from '@/components/accountTabs/SecuritySettings.vue'
import IconLogin from '@/components/icons/IconLogin.vue'

const tabs = [
    {
        id: 'overview',
        label: 'Account Overview',
        title: 'Account Overview',
        subtitle: 'View your account details below.',
        component: AccountOverview
    },
    {
        id: 'connected',
        label: 'Connected Accounts',
        title: 'Connected Accounts',
        subtitle: 'View your connected accounts below.',
        component: ConnectedAccounts
    },
    {
        id: 'settings',
        label: 'Profile Settings',
        title: 'Profile Settings',
        subtitle: 'View your employee profile settings.',
        component: ProfileSettings
    },
    {
        id: 'security',
        label: 'Security Settings',
        title: 'Security Settings',
        subtitle: 'Manage your account details and preferences below.',
        component: SecuritySettings
    }
]
const { linkedInLogin, fetchUser } = useServer()
const userData = ref(null)

const currentTabId = ref('overview')
const currentTab = computed(() => tabs.find((tab) => tab.id === currentTabId.value))

const isLoggedIn = computed(() => userData.value)

onMounted(() => {
    fetchUser()
        .then((data) => {
            userData.value = data;
        })
})
</script>

<style scoped>
.card {
    transition:
        background-color 0.3s ease,
        color 0.3s ease;
}
</style>
