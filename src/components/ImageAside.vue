<template>
    <el-aside width="220px" class="image-aside" v-loading="loading">
        <div class="top">
            <AsideList :active="activeId == item.id" v-for="(item, index) in list" :key="index"
                @click="handleChangeID(item.id)" @edit="handleUndateImage(item)" @delete="handleDelete(item.id)" >
                {{ item.name }}</AsideList>
        </div>
        <div class="bottom">
            <el-pagination background layout="prev, next" :total="total" :current-page="currenPage" :page-size="limit"
                @current-change="getData" />
        </div>
        <FromDrawer :title="drawerTitle" ref="fromDrawerRef" @submit="handleSubmit">
            <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
                <el-form-item label="图库分类名称" prop="name">
                    <el-input placeholder="请填写图库分类名称" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="form.order" :step="1" :min="0" />
                </el-form-item>
            </el-form>
        </FromDrawer>
    </el-aside>
</template>
<script setup>
import AsideList from '@/components/AsideList.vue';
import FromDrawer from '@/components/FromDrawer.vue'
import { toast } from '@/composables/util.js'
import { ref, reactive, computed } from 'vue'

import {
    GetImageClassList,
    CreateImageClass,
    UpdateImageClass,
    DeleteImageClass,
} from '@/api/image.js'


//加载动画
const loading = ref(false)
const list = ref([])


// 分页
const currenPage = ref(1)
const total = ref(1)
const limit = ref(10)


/**
 * 
 * @param {页数} p 
 */
//获取数据
function getData(p=null) {
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
            handleChangeID(item.id)
        }
    }).finally(() => {
        loading.value = false
    })

}
getData()

const editId = ref(0) //用于区分修改/新增
const drawerTitle = computed(() => editId.value ? '修改' : '新增')

const form = reactive({
    name: '',
    order: 50
})

const rules = {
    name: [{ required: true, message: '图库分类不能为空', trigger: 'blur' }]
}
const formRef = ref(null)

const fromDrawerRef = ref(null)


//Drawer提交删除新增功能
const handleSubmit = () => {
    fromDrawerRef.value.showLoading()
    formRef.value.validate((valid) => {
        if (!valid) return
        let fun = editId.value ? UpdateImageClass(editId.value,form) : CreateImageClass(form)
        fun.then(res => {
            fromDrawerRef.value.hideLoading()
            toast(drawerTitle.value + '成功')
            fromDrawerRef.value.close()
             getData(editId.value?currenPage.value : 1) 
        }).finally(() => {
            fromDrawerRef.value.hideLoading()
        })
    })

}


//新增
const handleCreateImage = () => {
     editId.value=0
    form.name = '',
    form.order = 50
    fromDrawerRef.value.open()
}

//修改图库
const handleUndateImage = (row) => {
    editId.value = row.id
    form.name = row.name
    form.order = row.order
    fromDrawerRef.value.open()
}

//删除
const handleDelete=(id)=>{
    DeleteImageClass(id).then(res=>{
        toast('删除成功')
        getData(currenPage.value)
    })
}

//选中的ID
const activeId = ref(1)
const emit= defineEmits(['change'])
// 选中状态
const handleChangeID = (change_class_id) => {
    activeId.value =change_class_id
    emit('change',change_class_id) //每点击点击调用一次chang这个函数
}

defineExpose({
    handleCreateImage
})

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