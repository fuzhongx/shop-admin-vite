<template>
    <div class="f-tabs" :style="{ left: $store.state.asideWidth }">
        <el-tabs v-model="tabsActive" type="card" style="min-width: 120px;" class="flex-1">
            <el-tab-pane closable
             v-for="item in tabsList" 
             :key="item.name"
             :label="item.title" 
             :name="item.name">
            </el-tab-pane>
        </el-tabs>
        <span class="f-drawer">
            <el-dropdown class="flex-1">
                <span class="el-dropdown-link">
                    <el-icon>
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


const tabsActive = ref('2')
const tabsList = ref([
    {
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content',
    },
    {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content',
    },
     {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content',
    }
])

</script>
<style scoped>
.f-tabs {
    height: 44px;
    position: fixed;
    top: 64px;
    right: 0;
    @apply bg-gray-100 flex items-center px-2;
}

.f-drawer {
    height: 32px;
    @apply flex justify-center items-center bg-white rounded px-3;
    margin-left: auto;
}

::v-deep .el-tabs__header {
    border-bottom: 0 !important;
    margin: 0 !important;

}
::v-deep .el-tabs__nav {
    border: 0 !important;
}
::v-deep .el-tabs__item{
    border: 0;
    height: 32px;
    line-height: 32px;
    @apply bg-white mr-2 rounded;
}
::v-deep .el-tabs__nav-next ,::v-deep .el-tabs__nav-prev{
    line-height: 32px !important;
    height: 32px !important;
    @apply bg-gray-200 rounded;
}
</style>