import { createRouter, createWebHistory } from "vue-router";
import NotFound from '@/pages/404.vue'
import Index from '@/pages/index.vue'
import Login from '@/pages/login.vue'
import About from '@/pages/about.vue'

const routes = [
    {
        path: "/",
        component: Login

    }, {
        path: "/index",
        component: Index,
        children: []

    },
    {
        path: "/about",
        component: About

    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound

    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router