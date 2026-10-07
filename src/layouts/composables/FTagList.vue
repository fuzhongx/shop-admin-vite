<template>
    <div :style="{ left: $store.state.asideWidth }" class="f-tabs">
        <el-tabs v-model="tabsActive" type="card" style="min-width: 100px;">
            <el-tab-pane v-for="item in tabsList" :key="item.path" :label="item.name" :name="item.path" closable>
            </el-tab-pane>
        </el-tabs>
        <span class="f-dra-btn">
            <el-dropdown>
                <span>
                    <el-icon >
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>关闭其他</el-dropdown-item>
                        <el-dropdown-item>关闭全部</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import {useRoute,onBeforeRouteUpdate} from 'vue-router'
const route=useRoute()


const tabsActive = ref(route.path)
const tabsList = ref([
    {
        name: '后台首页',
        path: '/',
    },
    {
        name: '商城管理',
        path: '/goods/list',
    }
])

onBeforeRouteUpdate((rout)=>{

    
})

</script>
<style scoped>
.f-tabs {
    height: 44px;
    position: fixed;
    top: 64px;
    right: 0;
    z-index: 100;
    @apply bg-gray-100 flex items-center px-3;
}
.f-dra-btn{
    /* width: 32px;  */
    margin-left: auto;
    @apply bg-white flex justify-center items-center p-2;
}

::v-deep .el-tabs__header {
    margin: 0 !important;
}
::v-deep .el-tabs__nav {
    border: 0 !important;
}

::v-deep .el-tabs__item {
    height: 32px;
    line-height: 32px;
    @apply bg-white mx-1 rounded;
}
::v-deep  .el-tabs__nav-prev{
    height: 32px !important;
    line-height: 32px;
}
::v-deep .el-tabs__nav-next, .el-tabs__nav-prev{
    height: 32px !important;
    line-height: 32px;
}


</style>