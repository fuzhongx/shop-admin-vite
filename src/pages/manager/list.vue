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
                            <el-button @click="resetForm">重置</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>

            <!-- 刷新和新增 -->
            <ListHeader  @create="handleCreateOpen" @refresh="getData"/>
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
                    <ChooseImage v-model="form.avatar" />
                </el-form-item>
                <el-form-item label="所属角色" prop="role_id">
                    <el-select v-model="form.role_id" value-key="" placeholder="选择所属角色">
                        <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id">
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
import { ref} from 'vue'

import {
    getManagerList,
    updateMenagerStatus,
    updateMenager,
    createMenager,
    deleteMenager
} from '@/api/menager'

import ListHeader from '@/components/ListHeader.vue'
import FormDrawer from '@/components/FromDrawer.vue'
import ChooseImage from '@/components/ChooseImage.vue'
import { useInitTable, useInitForm } from '@/composables/useCommon.js'

//所属角色
const roles = ref([])

//列表，分页，搜索,删除，修改状态
const {
    selectFormRef,
    selectForm,
    resetForm,
    tableData,
    loading,
    currenPage,
    total,
    limit,
    getData,
    handleDelete,
    handleStatusChange
} = useInitTable({
    selectForm: {
        keyWord: ''
    },
    getList: getManagerList,
    onGetListSuccess: (res) => {
        loading.value = false
        tableData.value = res.list.map(o => {
            o.statusLoading = false //自定义switch 按钮loading值
            return o
        })
        roles.value = res.roles
        total.value = res.totalCount
    },
    delete:deleteMenager,
    updateMenagerStatus:updateMenagerStatus
})

//修改，新增
const {
    FormDrawerRefs,
    formRef,
    form,
    rules,
    noticeTitle,
    handleUpdateOpen,
    handleCreateOpen,
    handleCreateNotice,
} = useInitForm({
    form: {
        username: '',
        password: '',
        role_id: '',
        status: 1,
        avatar: ''
    },
    getData,
    update: updateMenager,
    create: createMenager
})

</script>
<style scoped></style>

