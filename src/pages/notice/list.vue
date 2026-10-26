<template>
    <el-card shadow="never">
        <template #header>
            <div class="flex items-center justify-between">
                <div>
                    <el-button type="primary" size="small" @click="handleCreateOpen">新增</el-button>

                </div>
                <div class="f-refresh">
                    <el-icon :size="20" color="gray" @click="handleRefresh">
                        <Refresh />
                    </el-icon>
                </div>
            </div>
        </template>

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="content" label="公告标题" width="180" align="center" />
            <el-table-column prop="create_time" label="发布时间" width="180" align="center" />
            <el-table-column prop="update_time" label="更新时间" width="180" align="center" />
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text @click="handleUpdateOpen(scope.row)">修改</el-button>
                    <el-popconfirm title="是否删除该公告？" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row.id)" width="200">
                        <template #reference>
                            <el-button type="primary" size="small" text>删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination background layout="prev, pager, next" :total="total" class="flex 
        justify-center items-center mt-3" :current-page="currenPage" :page-size="limit" @current-change="getData" />

        <FormDrawer :title="changeActive ? '修改' : '新增'" @submit="handleCreateNotice" ref="FormDrawerRefs">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="form.content" type="textarea"></el-input>
                </el-form-item>
                <el-form-item>
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { getNoticeList, deleteNotice, createNotice, updateNotice } from '@/api/notice'
import { toast } from '@/composables/util.js'
import FormDrawer from '@/components/FromDrawer.vue'

const tableData = ref([])
const loading = ref(false)

// 分页
const currenPage = ref(1)
const total = ref(1)
const limit = ref(10)

const form = reactive({
    title: '',
    content: ''
})

const rules = {
    title: [{ required: true, message: '图库分类不能为空', trigger: 'blur' }],
    content: [{ required: true, message: '请输入公告内容', trigger: 'blur' }]
}

//获取数据
const getData = (p = null) => {
    if (typeof p == 'number') {
        currenPage.value = p
    }
    loading.value = true
    getNoticeList(currenPage.value).then(res => {
        loading.value = false
        tableData.value = res.list
        total.value = res.totalCount
    }).finally(() => {
        loading.value = false
    })
}
getData()

// 删除
const handleDelete = (id) => {
    loading.value = true
    deleteNotice(id).then(res => {
        loading.value = false
        toast('删除成功')
        getData(currenPage.value)
    }).finally(() => {
        loading.value = false
    })

}


//区别修改新增操作
const changeActive = ref(0)
const FormDrawerRefs = ref(null)
const formRef = ref(null)

//修改
const handleUpdateOpen = (row) => {
    FormDrawerRefs.value.open()
    changeActive.value = row.id
    form.title = row.title
    form.content = row.content
}

//新增
const handleCreateOpen = () => {
    form.title = ''
    form.content =''
    FormDrawerRefs.value.open()
}


//修改新增共用函数
const handleCreateNotice = () => {
    UpdataAndCreateActive()
}

function UpdataAndCreateActive() {
    FormDrawerRefs.value.showLoading()
    formRef.value.validate((valid) => {
        if (!valid) return
        let fun = changeActive.value ? updateNotice(changeActive.value, form) : createNotice(form)
        fun.then(res => {
            FormDrawerRefs.value.hideLoading()
            FormDrawerRefs.value.close()
            toast(changeActive.value ? '修改成功' : '新增成功')
            getData(1)
        }).finally(() => {
            FormDrawerRefs.value.hideLoading()
            FormDrawerRefs.value.close()
        })
    })

}

//刷新
const handleRefresh=()=>getData(1)
</script>
<style scoped>
.f-refresh {
    cursor: pointer;
}
</style>