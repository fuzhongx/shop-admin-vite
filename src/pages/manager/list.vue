<template>
    <el-card shadow="never">
        <template #header>
            <el-form :model="selectForm" ref="selectFormRef" :inline="true">
                <el-row :gutter="20" class="items-center">
                    <el-col :lg="16" :md="12" :offset="0" class="flex items-center">
                        <el-form-item label="关键字" class="text-black">
                            <el-input v-model="selectForm.keyWord" placeholder="管理员昵称" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :lg="8" :md="12" :offset="0">
                        <div class="flex justify-end  items-center">
                            <el-button type="primary" @click="getData">搜索</el-button>
                            <el-button @click="resetSelectForm">重置</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>

            <!-- 刷新和新增 -->
            <!-- <div class="flex items-center justify-between">
                <div>
                    <el-button type="primary" size="small" @click="handleCreateOpen">新增</el-button>
                </div>
                <div class="f-refresh">
                    <el-icon :size="20" color="gray" @click="handleRefresh">
                        <Refresh />
                    </el-icon>
                </div>
            </div> -->
        </template>

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="content" label="管理员">
                <template #default="{ row }">
                    <div class="flex items-center">
                        <div>
                            <el-avatar icon="el-icon-user-solid" size="large" shape="circle" :src="row.avatar"
                                fit="fill"></el-avatar>
                        </div>
                        <div class="ml-3">
                            <h6>{{ row.username }}</h6>
                            <small>ID:{{ row.id }}</small>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="所属管理员" align="center">
                <template #default="{ row }">
                    {{ row.role?.name || '-' }}
                </template>
            </el-table-column>
            <el-table-column label="状态" width="180" align="center">
                <template #default="{ row }">
                    <el-switch 
                    :modelValue='row.status' 
                    :active-value="1" 
                    :inactive-value="0"
                    :loading="row.statusLoading"
                    :disabled="row.super == 1"
                    @change="handleStatusChange($event, row)"> 
                </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <small v-if="scope.row.super == 1" class=" text-gray-500">暂无操作</small>
                    <div v-else>
                        <el-button type="primary" size="small" text @click="handleUpdateOpen(scope.row)">修改</el-button>
                        <el-popconfirm title="是否删除该管理员？" confirm-button-text="确认" cancel-button-text="取消"
                            @confirm="handleDelete(scope.row.id)" width="200">
                            <template #reference>
                                <el-button type="primary" size="small" text>删除</el-button>
                            </template>
                        </el-popconfirm>
                    </div>

                </template>
            </el-table-column>
        </el-table>

        <el-pagination background layout="prev, pager, next" :total="total" class="flex 
        justify-center items-center mt-3" :current-page="currenPage" :page-size="limit" @current-change="getData" />

        <FormDrawer :title="noticeTitle" @submit="handleCreateNotice" ref="FormDrawerRefs">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
                <el-form-item label="用户名" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="角色ID" prop="content">
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item label="角色ID" prop="content">
                    <el-switch 
                    :modelValue='form.content' 
                    :active-value="1" 
                    :inactive-value="0"
                    > 
                </el-switch>
                </el-form-item>
                <el-form-item label="头像" prop="content">
                   <el-avatar icon="el-icon-user-solid" size="large" shape="circle" :src="www" fit="fill"></el-avatar>
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import { getNoticeList, deleteNotice, createNotice, updateNotice } from '@/api/notice'
import {
    getManagerList,
    updateMenagerStatus,
    deleteMenager
} from '@/api/menager'
import { toast } from '@/composables/util.js'
import FormDrawer from '@/components/FromDrawer.vue'


const selectForm = reactive({
    keyWord: ''
})

const selectFormRef = ref(null)
const resetSelectForm = () => {
    selectForm.keyWord = ''
    getData()
}

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
    getManagerList(currenPage.value, {
        limit: 5,
        keyword: selectForm.keyWord
    }).then(res => {
       
        loading.value = false
        tableData.value = res.list.map(o=>{
            o.statusLoading=false //自定义switch 按钮loading值
            return o
        })
        total.value = res.totalCount
    }).finally(() => {
        loading.value = false
    })
}
getData()

//修改管理员状态
const handleStatusChange = (status, row) => {
    row.statusLoading=true
    updateMenagerStatus(row.id, status).then(res => {
        toast('修改状态成功')
        row.status = status
    }).finally(() => {
        row.statusLoading=false
    })
}

// 删除
const handleDelete = (id) => {
    loading.value = true
    deleteMenager(id).then(res => {
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
const noticeTitle = computed(() => changeActive.value ? '修改' : '新增')

//修改
const handleUpdateOpen = (row) => {
    console.log(row.role.name);
    FormDrawerRefs.value.open()
    changeActive.value = row.id
    form.title = row.title
    form.content = row.content
}

//新增
const handleCreateOpen = () => {
    form.title = ''
    form.content = ''
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
const handleRefresh = () => getData(1)
</script>
<style scoped>
.f-refresh {
    cursor: pointer;
}
</style>