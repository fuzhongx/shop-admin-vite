<template>
    <el-aside width="220px" class="image-aside" v-loading="loading">
        <div class="top">
            <AsideList :active="activeId == item.id" v-for="(item, index) in list" :key="index" @click="handleChange(item)">
                {{ item.name }}</AsideList>
        </div>
        <div class="bottom">
            <el-pagination background layout="prev, next" :total="total" :current-page="currenPage" :page-size="limit"
                @current-change="getData" />
        </div>
        <FromDrawer title="新增" ref="fromDrawerRef" @submit="handleSubmit">
            <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
                <el-form-item label="图库分类名称" prop="name">
                    <el-input placeholder="请填写图库分类名称" :maxLength="20" v-model="form.name" ></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model="form.order" :step="1" />
                </el-form-item>
            </el-form>
        </FromDrawer>
    </el-aside>
</template>
<script setup>
import AsideList from '@/components/AsideList.vue';
import FromDrawer from '@/components/FromDrawer.vue'
import { ref,reactive } from 'vue'

import { GetImageClassList, GetImageClass } from '@/api/image.js'

//加载动画
const loading = ref(false)
const list = ref([])
const activeId = ref(0)

// 分页
const currenPage = ref(1)
const total = ref(1)
const limit = ref(10)


// 选中状态
const handleChange = (v) => {
    activeId.value = v.id
}


//获取数据
function getData(p = null) {
    if (typeof p == 'number') {
        currenPage.value = p
    }
    loading.value = true
    GetImageClassList(currenPage.value).then(res => {
        total.value = Number(res.totalCount) || 0
        loading.value = false
        list.value = res.list
        let item = res.list[0]
        if (item) {
            activeId.value = item.id
        }
        getImageList()
    }).finally(() => {
        loading.value = false
    })

}
getData()

const form = reactive({
    name: '',
    order: ''
})

const rules = {
    name: [{ required: true, message: '图库分类不能为空', trigger: 'blur' }]
}
const formRef=ref(null)

const fromDrawerRef = ref(null)
const handleOpen = () => {
    fromDrawerRef.value.open()
}
const handleSubmit = () => {
    console.log('提交表单');
}

defineExpose({
    handleOpen
})

//image列表数据
function getImageList() {
    GetImageClass(activeId.value, 1).then(res => {
        console.log(res, '列表下拉');
    })

}


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