import router from '@/router'
import { getToken } from './composables/auto'
import {
    toast,
    showFullLoading,
    hideFullLoading
} from './composables/util'
import store from './store/store'

//全局路由守卫
router.beforeEach(async (to, from, next) => {
    //进度条显示
    showFullLoading()

    const token = getToken()

    if (!token && to.path != '/login') {
        toast('登录已过期，请先登录', 'error')
        return next({ path: '/login' })
    }

    //防止重复登录
    if (token && to.path == '/login') {
        toast('已登录，请勿重复登录', 'error')
        return next({ path: from.path ? from.path : '/' })
    }

    //判断用户登录之后，自动获取管理员信息和权限菜单
    if (token) {
        await store.dispatch('getinfo')
    }

    // 设置动态标题
    let title = (to.meta.title ? to.meta.title : '') + '-旭日商城后台管理系统'
    document.title=title

    next() //放行
})

// 全局后置守卫
router.afterEach((to, from) => {
    hideFullLoading()
})

