<template>
    <el-dialog title="商品选择" v-model="dialogVisible" width="80%">
        <el-card shadow="never">
            <el-form :model="selectForm" ref="selectFormRef" :inline="true" @submit.prevent="getData">
                <el-form-item label="关键字" class="text-black">
                    <el-input v-model="selectForm.title" placeholder="管理员账户" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getData">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" ref="tableRef"  stripe style="width: 100%" v-loading="loading"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="商品" width="500">
                    <template #default="{ row }">
                        <div class="flex">
                            <div class="flex justify-center items-center mr-1">
                                <el-image :src="row.cover" :lazy="true" style="width: 64px; height: 64px;"></el-image>
                            </div>
                            <div style="font-size: 12px;" class="text-gray-400">
                                <div><span>{{ row.title }}</span></div>
                                <div>分类：<span>{{ row.category ? row.category.name : '未分类' }}</span></div>
                                <div>创建时间：<span>{{ row.create_time }}</span></div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="总库存" prop="stock" align="center" />
                <el-table-column label="价格(元)" align="center">
                    <template #default="{ row }">
                        <span class="text-rose-500">￥{{ row.min_price }}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="text-gray-400">￥{{ row.min_oprice }}</span>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination background layout="prev, pager, next" :total="total" class="flex 
        justify-center items-center mt-3" :current-page="currenPage" :page-size="limit" @current-change="getData" />
        </el-card>
        <template #footer>
            <span>
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="handleConnet" :loading="connetLoading">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { associationCategory } from '@/api/category'
import {
    getGoodsList
} from '@/api/goods'
import { toast } from '@/composables/util.js'
import { useInitTable } from '@/composables/useCommon.js'
const dialogVisible = ref(false)

//列表，分页，搜索,删除，修改状态
const {
    selectFormRef,
    selectForm,
    tableData,
    loading,
    currenPage,
    total,
    limit,
    getData,
} = useInitTable({
    selectForm: {
        limit: 5,
    },
    getList: getGoodsList,
    onGetListSuccess: (res) => {
        loading.value = false
        tableData.value = res.list
        total.value = res.totalCount
    }
})

//选中某一商品关联id
const ChooseId = ref(null)
const open = (id) => {
    ChooseId.value = id
    dialogVisible.value = true
}


const close = () => {
    dialogVisible.value = false
}

// 确认关联按钮Loading
const connetLoading=ref(false)

//多选中商品checkBoxID
const goods_ids = ref()
const handleSelectionChange = (e) => {
    goods_ids.value = e.map(o => o.id)
}

const tableRef=ref(null)

// 确认关联
const handleConnet = () => {
    connetLoading.value = true
    associationCategory(ChooseId.value, goods_ids.value).then(res => {
        toast('关联成功')
        emit('submit')
    }).finally(() => {
        connetLoading.value = false
        tableRef.value.clearSelection()
        close()
    })
}
const emit = defineEmits(['submit'])

defineExpose({
    open,
    close
})

</script>
    