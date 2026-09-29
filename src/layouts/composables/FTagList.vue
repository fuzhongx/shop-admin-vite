<template>
    <div :style="{left: $store.state.asideWidth}">
        <el-tabs v-model="tabsActive" type="card" editable>
            <el-tab-pane v-for="item in tabsList" :key="item.name" :label="item.title" :name="item.name">
           </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script  setup>
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
])

</script>
<style scoped>
::v-deep .el-tabs__header{
    height: 45px !important;
    position: fixed;
    top: 64px;
    right: 0;
}
</style>