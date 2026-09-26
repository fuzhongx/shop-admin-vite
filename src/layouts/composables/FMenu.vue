<template>
    <div class="aside_Menus">
        <el-menu default-active="2" class="el-menu-vertical-demo">

            <template v-for="(item,index) in AsideMenus" :key="index">

                <el-sub-menu :index='item.frontpath' v-if="item && item.child.length > 0">
                    <template #title>
                         <el-icon><help/></el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item :index=item2.frontpath v-for="(item2,index2) in item.child" :key="index2">
                        <el-icon><icon-menu /></el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>

                <el-menu-item :index=item.frontpath v-else v-for="(item) in AsideMenus" :key="item.name">
                    <el-icon><icon-menu /></el-icon>
                    <span>{{ item2.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'


let AsideMenus = [
    {
        "name": "后台面板",
        "frontpath": '/',
        "child": [{
            "name": "主控台",
            "icon": "home-filled",
            "frontpath": "/",
        }]
    },
    {
        "name": "商品管理",
        "frontpath": '/goods',
        "child": [{
            "name": "商品管理",
            "icon": "shopping-cart-full",
            "frontpath": "/goods/list",
        }]
    }
]


</script>

<style scoped>
.aside_Menus {
    width: 250px;
    position: fixed;
    top: 64px;
    left: 0;
    bottom: 0;
    @apply shadow-400
}
</style>