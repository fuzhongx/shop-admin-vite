<template>
    <el-card shadow="never">
        <template #header>
            <!-- 刷新和新增,删除 -->
            <ListHeader @create="handleCreateOpen" @refresh="getData" @delete="handleDeleteMuitiSelection"
                :layout="['create', 'refresh']" />
        </template>

        <el-table :data="tableData" stripe style="width: 100%"  v-loading="loading"
            ref="multipleTableRef">
            <el-table-column prop="name" label="优惠卷名称" width="250"/>
            <el-table-column prop="status" label="状态" align="center" />
            <el-table-column prop="value" label="优惠" align="center">
                <template #default="{row}">
                {{ row.type==0 ? '满减 '+ row.value :'折扣 '+ row.value }}
                </template> 
            </el-table-column>
《            <el-table-column prop="total" label="发放数量" align="center" />
            <el-table-column prop="used" label="已使用" align="center" />
            <el-table-column prop="start_time" label="开始时间" align="center" />
            <el-table-column prop="end_time" label="结束时间" align="center" />

            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text @click="handleUpdateOpen(scope.row)">修改</el-button>
                    <el-popconfirm title="是否删除该规格？" confirm-button-text="确认" cancel-button-text="取消"
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

        <FormDrawer :title="DrawerTitle" @submit="UpdataAndCreateActive" ref="FormDrawerRefs">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
                <el-form-item label="优惠卷名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="form.order" size="default" :min="0" :max="1000">
                    </el-input-number>

                </el-form-item>
                <el-form-item label="规格值" prop="default">
                    <InputTag v-model="form.default" />
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>
<script setup>
import { ref } from 'vue'
import { getCouponList, deleteCoupon, updateCouponStatus, createCoupon, updateCoupon } from '@/api/Coupon'
import FormDrawer from '@/components/FromDrawer.vue'
import InputTag from '@/components/InputTag.vue'
import { useInitTable, useInitForm } from '@/composables/useCommon.js'
import { toast } from '@/composables/util.js'

const {
    tableData,
    loading,
    currenPage,
    total,
    limit,
    getData,
    handleDelete,
    multipleTableRef,
    handleDeleteMuitiSelection
} = useInitTable({
    getList: getCouponList,
    delete: deleteCoupon,
    updateStatus: updateCouponStatus
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
        name: '',
        type: 0,
        value: 20,
        total: '',
        min_price: '',
        start_time: '',
        end_time: '',
        order: 50
    },
    rules: {
        name: [{ required: true, message: '规格名称不能为空', trigger: 'blur' }],
        default: [{ required: true, message: '规格值不能为空', trigger: 'blur' }],
    },
    getData,
    update: updateCoupon,
    create: createCoupon
})



</script>
<style scoped>
.f-refresh {
    cursor: pointer;
}
</style>