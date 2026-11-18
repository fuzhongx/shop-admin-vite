<template>
    <FormDrawer ref="formDrawerRef" confirmText="关联">
        <el-table :data="tableData" border stripe class="tableClass">
            <el-table-column label="ID" prop="goods_id" width="80" align="center" />
            <el-table-column label="商品名称" prop="name" align="center" />
            <el-table-column label="商品封面" prop="name" align="center">
                <template #default="{ row }">
                    <el-image :src="row.cover" fit="fill" :lazy="true" style="width: 64px;height: 64px;" />
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="{ row }">
                    <el-popconfirm title="是否删除该推荐商品？" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDeleteCategory(row)">
                        <template #reference>
                            <el-button type="primary" size="small" text class=" px-0">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

    </FormDrawer>
</template>
<script setup>
import { ref } from 'vue'
import FormDrawer from '@/components/FromDrawer.vue'
import { toast } from '@/composables/util.js'
import {
    GoodsCategory,
    deleteGoodsCategory
} from '@/api/category.js'

const formDrawerRef = ref(null)
const tableData = ref()

const category_id = ref(null)
const open = (data) => {
    category_id.value = data.id
    getGoodsList().then(res => {
        formDrawerRef.value.open()
    })
}

function getGoodsList() {
    return GoodsCategory(category_id.value).then(res => {
        tableData.value = res.map(o => {
            o.goodsLoading = false
            return o
        })
    })
}

//删除关联
const handleDeleteCategory = (row) => {
    deleteGoodsCategory(row.id).then(res => {
        getGoodsList()
        toast('删除成功')
    })
}
defineExpose({
    open
})
</script>
<style scoped>
.tableClass {
    height: 500px;
    overflow-y: auto;
}
</style>