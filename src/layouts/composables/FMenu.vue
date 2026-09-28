<template>
    <div class="f-menu" :style="{ width: $store.state.asideWidth }">
        <el-menu :default-active="defaultActive" @select="SelectMenu"
         class=" border-0" 
         unique-opened
         router 
         :collapse-transition="false"
         :collapse="isCollapse">

            <template v-for="(item, index) in AsideMenus" :key="index">

                <el-sub-menu :index='item.name' v-if="item.child && item.child.length > 0">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item :index=item2.frontpath v-for="(item2, index2) in item.child" :key="index2">
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>

                <el-menu-item :index='item.name' v-else>
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import {useStore} from 'vuex'
import { useRoute } from 'vue-router';

const route=useRoute()
const store=useStore()


//监听激活菜单
const SelectMenu=(e)=>{}


// 默认选中
const defaultActive=ref(route.path)

// 是否折叠
const isCollapse = computed(() =>!(store.state.asideWidth == "250px"))


let AsideMenus = [
    {
        "name": "主页",
        "icon": "home-filled",
    },
    {
        "name": "后台面板",
        "icon": "home-filled",
        "child": [{
            "name": "主控台",
            "icon": "home-filled",
            "frontpath": "/",
        }]
    },
    {
        "name": "商品管理",
        "icon": "shopping-cart-full",
        "child": [{
            "name": "商品管理",
            "icon": "shopping-cart-full",
            "frontpath": "/goods/list",
        }]
    }
]





</script>

<style scoped>
.f-menu {
    position: fixed;
    transition: all .2s;
    top: 64px;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    @apply shadow;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
}
</style>