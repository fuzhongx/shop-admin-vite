<template>
    <div>
        <el-tabs v-model="selectForm.tab" class="demo-tabs" @tab-change="getData">
            <el-tab-pane :label="item.name" :name="item.key" v-for="(item, index) in tabBars" :key="index"></el-tab-pane>
        </el-tabs>

        <el-card shadow="never">
            <template #header>
                <el-form :model="selectForm" ref="selectFormRef" :inline="true" @submit.prevent="getData">
                    <el-row :gutter="20" class="items-center">
                        <el-col :span="8" :offset="0">
                            <el-form-item label="关键字">
                                <el-input v-model="selectForm.title" placeholder="商品名称" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="0" class="flex items-center" v-if="selectFormShow">
                            <el-form-item label="关键字" class="text-black">
                                <el-select v-model="selectForm.category_id" placeholder="请选择商品分类" clearable filterable>
                                    <el-option v-for="item in Category_List" :key="item.id" :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>

                            </el-form-item>
                        </el-col>

                        <el-col :span="8" :offset="0">
                            <div class="flex justify-end h-[50px]">
                                <el-button type="primary" @click="getData">搜索</el-button>
                                <el-button @click="resetForm">重置</el-button>
                                <el-button @click="openSelectForm" text  type="primary">
                                {{ !selectFormShow? '展开' : '收缩' }}
                                <el-icon>
                                    <ArrowUp v-if="!selectFormShow"/>
                                    <ArrowDown v-else/>
                                </el-icon>
                                </el-button>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>

                <!-- 刷新和新增 -->
                <ListHeader @create="handleCreateOpen" @refresh="getData" :layout="['create', 'refresh']" />
            </template>

            <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
                <el-table-column type="selection" width="50" />
                <el-table-column prop="content" label="商品">
                    <template #default="{ row }">
                        <div class="flex items-center">
                            <div>
                                <el-image :src="row.cover" fit="fill" :lazy="true"
                                    style="width:64px;height: 64px;"></el-image>
                            </div>
                            <div class="ml-3">
                                <h6 class="text-black font-bold">{{ row.title }}</h6>
                                <p>
                                    <small class="text-rose-500">￥{{ row.min_price }}</small>
                                    <el-divider direction="vertical"></el-divider>
                                    <small class="text-gray-400">￥{{ row.min_oprice }}</small>
                                </p>
                                <p class="text-gray-400"><small>分类 : {{ row.category ? row.category.name : '未分类' }}</small>
                                </p>
                                <small class="text-gray-400">创建时间 : {{ row.create_time }}</small>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="实际销量" prop="sale_count" align="center" width="100" />
                <el-table-column label="商品状态" align="center" width="100">
                    <template #default="{ row }">
                        <el-tag :type="row.status ? 'success' : 'danger'" size="small">
                            {{ row.status ? '上架' : '仓库' }}</el-tag>

                    </template>
                </el-table-column>

                <el-table-column label="审核状态" align="center" v-if="selectForm.tab != 'delete'" width="150">
                    <template #default="{ row }">
                        <div v-if="row.ischeck == 0">
                            <div><el-button type="success" size="small" @click="" plain>审核通过</el-button></div>
                            <el-button class="mt-2" type="danger" size="small" @click="" plain>审核拒绝</el-button>
                        </div>
                        <span v-else>{{ row.ischeck == 1 ? '通过' : '拒绝' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="总库存" prop="stock" align="center" width="100" />
                <el-table-column label="操作" align="center">
                    <template #default="{ row }">
                        <div v-if="selectForm.tab != 'delete'">
                            <el-button class="px-0" type="primary" size="small" text
                                @click="handleUpdateOpen(row)">修改</el-button>
                            <el-button class="px-0" type="primary" size="small" text
                                @click="handleUpdateOpen(row)">商品规格</el-button>
                            <el-button class="px-0" type="primary" size="small" text
                                @click="handleUpdateOpen(row)">设置轮播图</el-button>
                            <el-button class="px-0" type="primary" size="small" text
                                @click="handleUpdateOpen(row)">商品详情</el-button>
                            <el-popconfirm title="是否删除该商品？" confirm-button-text="确认" cancel-button-text="取消"
                                @confirm="handleDelete(row.id)">
                                <template #reference>
                                    <el-button type="primary" size="small" text>删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                        <span v-else class="text-gray-400">暂无操作</span>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination background layout="prev, pager, next" :total="total" class="flex 
        justify-center items-center mt-3" :current-page="currenPage" :page-size="limit" @current-change="getData" />

            <FormDrawer :title="DrawerTitle" @submit="UpdataAndCreateActive" ref="FormDrawerRefs">
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
    </div>
</template>
<script setup>
import { ref,computed } from 'vue'

import {
    getGoodsList,
    updateGoodsStatus,
    updateGoods,
    createGoods,
    deleteGoods
} from '@/api/goods'

import {
    getCategoryList
} from '@/api/category'

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
        title: '',
        tab: 'all',
        category_id: null,
        limit: 10
    },
    getList: getGoodsList,
    onGetListSuccess: (res) => {
        loading.value = false
        tableData.value = res.list.map(o => {
            o.statusLoading = false //自定义switch 按钮loading值
            return o
        })
        roles.value = res.roles
        total.value = res.totalCount
    },
    delete: deleteGoods,
    updateStatus: updateGoodsStatus
})

//修改，新增
const {
    FormDrawerRefs,
    formRef,
    form,
    rules,
    DrawerTitle,
    handleUpdateOpen,
    handleCreateOpen,
    UpdataAndCreateActive,
} = useInitForm({
    form: {
        title: '',
        category_id: null,
        cover: '',
        unit: 'kg',
        stock: 200,
        min_stock: 10,
        status: 1,
        stock_display: 1,
        min_price: 1,
        min_oprice: 100
    },
    getData,
    update: updateGoods,
    create: createGoods
})

const tabBars = ref([
    {
        key: 'all',
        name: '全部'
    },
    {
        key: 'checking',
        name: '审核中'
    },
    {
        key: 'saling',
        name: '出售中'
    },
    {
        key: 'off',
        name: '已下架'
    },
    {
        key: 'min_stock',
        name: '库存预警'
    },
    {
        key: 'delete',
        name: '回收站'
    },

])

const selectFormShow=ref(false)
const Category_List = ref([])
getCategoryList().then(res => Category_List.value = res)

const openSelectForm=()=>{
    selectFormShow.value=!selectFormShow.value
    console.log(selectFormShow.value);
}



</script>
<style scoped></style>

