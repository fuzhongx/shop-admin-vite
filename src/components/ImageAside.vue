<template>
    <el-aside width="220px" class="image-aside" v-loading="loading">
        <div class="top">
            <AsideList :active="activeId == item.id" v-for="(item, index) in list" :key="index"> {{ item.name }}</AsideList>
        </div>
        <div class="bottom">
            <el-pagination background layout="prev, next" :total="total" :current-page="currenPage"   :page-size="limit"
             @current-change="CurrentChange" />
        </div>
    </el-aside>
</template>
<script setup>
import AsideList from '@/components/AsideList.vue';
import { ref } from 'vue'

import { GetImageClassList, GetImageClass } from '@/api/image.js'

//加载动画
const loading = ref(false)
const list = ref([])
const activeId = ref(0)

// 分页
const currenPage = ref(1)
const total = ref(1)
const limit = ref(10)

const CurrentChange = (e=null) => {
    if(Number(e)){
        currenPage.value=e
    }

}

//获取数据
GetImageClassList(currenPage.value).then(res => {
    total.value = Number(res.totalCount)||0
    loading.value = true
    list.value = res.list
    let item = res.list[0]
    if (item) {
        activeId.value = item.id
    }
    console.log(res);

}).finally(() => {
    loading.value = false
})

// GetImageClass(1, 1).then(res => {
//     console.log(res, '列表下拉');
// })


</script>
<style scoped>
.image-aside {
    position: relative;
    border-right: 1px solid #eeeeee;
}

.image-aside .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;

}

.image-aside .bottom {
    height: 50px;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    @apply flex justify-center items-center;
}

.aside_list {
    border-bottom: 1px solid #f4f4f4;
    cursor: pointer;
    @apply flex items-center text-gray-600 text-sm p-3;
}

.aside-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.aside_list:hover,
.active {
    @apply bg-blue-50;
}
</style>