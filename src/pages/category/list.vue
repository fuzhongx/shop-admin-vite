<template>
    <div>
        <el-card shadow="never" v-loading="loading">
            <ListHeader @create="handleCreateOpen" @refresh="getData"  :layout="['create','refresh']" />
            <el-tree ref="tree" :data="tableData" node-key="id" :props="defaultProps" @node-click=""
                :default-expanded-keys="defaultExpandedKeys" class="mt-2">
                <template #default="{ node, data }">
                    <div class="f-menu-comtemt">
                        <span>{{ data.name }}</span>
                        <div class="ml-auto">
                            <el-button text type="primary" size="small" @click.stop="handleGoodsCategory(data)" :loading="data.goodsLoading">推荐商品</el-button>
                            <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0"
                                @change="handleStatusChange($event, data)" :loading="data.statusLoading">
                            </el-switch>
                            <el-button text type="primary" size="small" @click.stop="handleUpdateOpen(data)">修改</el-button>
                            <el-popconfirm title="是否删除该分类？" confirm-button-text="确认" cancel-button-text="取消"
                                @confirm="handleDelete(data.id)">
                                <template #reference>
                                    <el-button type="primary" size="small" text class=" px-0">删除</el-button>
                                </template>
                            </el-popconfirm>

                        </div>
                    </div>
                </template>
            </el-tree>
        </el-card>
        <FormDrawer :title="DrawerTitle" @submit="UpdataAndCreateActive" ref="FormDrawerRefs">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="form.name" placeholder="分类名称"></el-input>
                </el-form-item>
            </el-form>
        </FormDrawer>
        <FormGoodsDrawer ref="fromGoodsDrawerRef" title="推荐产品"></FormGoodsDrawer>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import ListHeader from '@/components/ListHeader.vue'
import FormDrawer from '@/components/FromDrawer.vue'
import FormGoodsDrawer from '@/pages/category/components/FormDrawer.vue'

import { 
    getCategoryList, 
    updateCategoryStatus,
    deleteCategory, 
    createCategory, 
    updateCategory} from '@/api/category.js'
import { useInitTable, useInitForm } from '@/composables/useCommon.js'

const defaultProps = {
    children: 'child',
    label: 'name',
}

const defaultExpandedKeys = ref([])
const {
    tableData,
    loading,
    getData,
    handleStatusChange,
    handleDelete,
} = useInitTable({
    selectForm: {
        keyWord: ''
    },
    getList: getCategoryList,
    onGetListSuccess: (res) => {
        defaultExpandedKeys.value = res.map(o => o.id)
        tableData.value = res.map(o => {
            o.statusLoading = false //自定义switch 按钮loading值
            return o
        })
    },
    updateStatus: updateCategoryStatus,
    delete: deleteCategory,
})

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
       name:''
    },
    rules: {
        name: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }],
    },
    getData,
    create: createCategory,
    update: updateCategory

})

const fromGoodsDrawerRef=ref(null)
//推荐商品
const handleGoodsCategory=(data)=>{
    fromGoodsDrawerRef.value.open(data)
}

</script>
<style scoped>
.f-menu-comtemt {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>