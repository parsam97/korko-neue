import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import ClubView from './views/ClubView.vue'
import PlayerView from './views/PlayerView.vue'
import LawView from './views/LawView.vue'
import TeamView from './views/TeamView.vue'
import ContactView from './views/ContactView.vue'
import AccountView from './views/AccountView.vue'
import ImprintView from './views/ImprintView.vue'
import NotFoundView from './views/NotFoundView.vue'

const routes = [
    {
        path: '/', component: HomeView, meta: {
            showInNavbar: true,
            labelKey: 'navigation.home',
            background: {
                image: new URL('@/assets/bg/singlePlayerControl.png', import.meta.url).href,
                properties: {  }
            }
        }
    },
    {
        path: '/about', component: AboutView, meta: {
            showInNavbar: true,
            labelKey: 'navigation.about',
            background: {
                image: new URL('@/assets/bg/threePlayersRunStop.jpg', import.meta.url).href,
                properties: {  }
            }
        }
    },
    {
        path: '/club', component: ClubView, meta: {
            showInNavbar: true,
            labelKey: 'navigation.club',
            background: {
                image: new URL('@/assets/bg/teamAttackPlay.jpg', import.meta.url).href,
                properties: {  }
            }
        }
    },
    {
        path: '/player', component: PlayerView, meta: {
            showInNavbar: true,
            labelKey: 'navigation.player',
            background: {
                image: new URL('@/assets/bg/teamAdvance.jpg', import.meta.url).href,
                properties: {  }
            }
        }
    },
    {
        path: '/law', component: LawView, meta: {
            showInNavbar: true,
            labelKey: 'navigation.law',
            background: {
                image: new URL('@/assets/bg/singlePlayerTackle.jpg', import.meta.url).href,
                properties: {  }
            }
        }
    },
    {
        path: '/team', component: TeamView, meta: {
            showInNavbar: true,
            labelKey: 'navigation.team',
            background: {
                image: new URL('@/assets/bg/threePlayersRunStop.jpg', import.meta.url).href,
                properties: {  }
            }
        }
    },
    {
        path: '/contact', component: ContactView, meta: {
            showInNavbar: true,
            labelKey: 'navigation.contact',
            background: {
                image: new URL('@/assets/bg/singlePlayerShoot.jpg', import.meta.url).href,
                properties: {  }
            }
        }
    },
    {
        path: '/imprint', component: ImprintView, meta: {
            showInNavbar: false,
            labelKey: 'navigation.imprint',
        }
    },
    {
        path: '/account', component: AccountView, meta: {
            showInNavbar: false,
            labelKey: 'navigation.account',
            background: {
                image: new URL('@/assets/bg/singlePlayerControl.png', import.meta.url).href,
                properties: { }
            }
        }
    },
    {
        path: '/:pathMatch(.*)*', component: NotFoundView, meta: {
            showInNavbar: false,
            labelKey: 'navigation.notFound',
            background: {
                image: new URL('@/assets/bg/singlePlayerControl.png', import.meta.url).href,
                properties: {  }
            }
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
