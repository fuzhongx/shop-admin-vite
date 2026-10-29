<template>
    <el-card shadow="never">
        <template #header>
            <el-form :model="selectForm" ref="selectFormRef" :inline="true" @submit.prevent="getData">
                <el-row :gutter="20" class="items-center">
                    <el-col :lg="16" :md="12" :offset="0" class="flex items-center">
                        <el-form-item label="关键字" class="text-black">
                            <el-input v-model="selectForm.keyWord" placeholder="管理员昵称" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :lg="8" :md="12" :offset="0">
                        <div class="flex justify-end">
                            <el-button type="primary" @click="getData">搜索</el-button>
                            <el-button @click="resetSelectForm">重置</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>

            <!-- 刷新和新增 -->
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
                    <el-switch :modelValue='row.status' :active-value="1" :inactive-value="0" :loading="row.statusLoading"
                        :disabled="row.super == 1" @change="handleStatusChange($event, row)">
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
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                    <el-upload 
                    class="avatar-uploader" 
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                    </el-icon>
                </el-upload>
                </el-form-item>
                <el-form-item label="所属角色" prop="role_id">
                   <el-select v-model="form.role_id" value-key="" placeholder="选择所属角色">
                    <el-option v-for="item in roles"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                   </el-select>
                   
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-switch v-model='form.status' :active-value="1" :inactive-value="0">
                    </el-switch>
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'

import {
    getManagerList,
    updateMenagerStatus,
    updateMenager,
    createMenager,
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

//所属角色
const roles=ref([])

const tableData = ref([])
const loading = ref(false)

// 分页
const currenPage = ref(1)
const total = ref(1)
const limit = ref(10)

const form = reactive({
    username: '',
    password: '',
    role_id: '',
    status:1,
    avatar: ''
})

const rules = {
    // title: [{ required: true, message: '图库分类不能为空', trigger: 'blur' }],
    // content: [{ required: true, message: '请输入公告内容', trigger: 'blur' }]
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
        tableData.value = res.list.map(o => {
            o.statusLoading = false //自定义switch 按钮loading值
            return o
        })
        roles.value=res.roles
        total.value = res.totalCount
    }).finally(() => {
        loading.value = false
    })
}
getData()

//修改管理员状态
const handleStatusChange = (status, row) => {
    row.statusLoading = true
    updateMenagerStatus(row.id, status).then(res => {
        toast('修改状态成功')
        row.status = status
    }).finally(() => {
        row.statusLoading = false
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
    console.log(row);
    console.log(row.role.name);
    FormDrawerRefs.value.open()
    changeActive.value = row.id
    form.username=row.username,
    form.password=row.password,
    form.role_id=row.role_id,
    form.status=row.status,
    form.avatar=row.avatar
}

//新增
const handleCreateOpen = () => {
    changeActive.value =0
    form.username= '',
    form.password='',
    form.role_id='',
    form.status=1,
    form.avatar= ''
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
        let fun = changeActive.value ? updateMenager(changeActive.value, form) : createMenager(form)
        fun.then(res => {
            FormDrawerRefs.value.hideLoading()
            FormDrawerRefs.value.close()
            toast(changeActive.value ? '修改成功' : '新增成功')
            getData(1)
        }).finally(() => {
            changeActive.value=0
            FormDrawerRefs.value.hideLoading()
            FormDrawerRefs.value.close()
        })
    })

}

//刷新
const handleRefresh = () => getData()
</script>
<style scoped>
.f-refresh {
    cursor: pointer;
}

</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
