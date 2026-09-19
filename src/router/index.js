import { createRouter, createWebHistory } from "vue-router";
import NotFound from '@/pages/404.vue'
import Index from '@/pages/index.vue'
import Login from '@/pages/login.vue'


const routes = [
    {
        path: "/login",
        component: Login,
        meta:{
            title:'登录页'
        }

    }, {
        path: "/",
        component: Index,
        meta:{
            title:'后台首页'
        },
        children: []
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