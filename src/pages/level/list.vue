<template>
    <el-card shadow="never">
        <template #header>
            <!-- 刷新和新增 -->
            <ListHeader @create="handleCreateOpen" @refresh="getData" :layout="['create', 'refresh']" />
        </template>

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="name" label="会员等级" />
            <el-table-column prop="discount" label="折扣率" align="center" />
            <el-table-column prop="level" label="等级序号" align="center" />
            <el-table-column prop="status" label="状态" align="center">
                <template #default="{ row }">
                    <el-switch :modelValue='row.status' :active-value="1" :inactive-value="0" :loading="row.statusLoading"
                        @change="handleStatusChange($event, row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text @click="handleUpdateOpen(scope.row)">修改</el-button>
                    <el-popconfirm title="是否删除该会员？" confirm-button-text="确认" cancel-button-text="取消"
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
                <el-form-item label="等级名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="等级权重" prop="level">
                    <el-input type="number" v-model="form.level"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="status">
                    <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
                    </el-switch>
                </el-form-item>
                <el-form-item label="升级条件">
                    <template #default="{ row }">
                        <div>
                            <div>
                                <span class=" w-[80px] mr-1">累计消费满:</span>
                                <el-input v-model="form.max_price"  style="width: 160px">
                                    <template #append>元</template>
                                </el-input>
                                <small class="text-gray-400 block">设置会员等级所需的累计消费必须大于等于0,单位:元</small>
                            </div>
                            <div>
                                <span class=" w-[80px] mr-1">累计次数满:</span>
                                <el-input v-model="form.max_times" style="width: 160px">
                                    <template #append>笔</template>
                                </el-input>
                                <small class="text-gray-400 block">设置会员等级所需的购买次数必须大于等于0,单位:元</small>
                            </div>

                        </div>
                    </template>
                </el-form-item>
                <el-form-item label="折扣率(%)" prop="discount">
                    <el-input v-model="form.discount"   style="width: 240px">
                    <template #append>%</template>
                    </el-input>
                    <small  class="text-gray-400 block">折扣率单位为百分比,如输入90,表示该会员等级的用户可以以商品原价的90%购买</small>
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>
<script setup>
import {
    getUseLevelList,
    deleteUseLevel,
    updateUseLevelStatus,
    createUseLevel,
    updateUseLevel
} from '@/api/level'
import FormDrawer from '@/components/FromDrawer.vue'
import { useInitTable, useInitForm } from '@/composables/useCommon.js'


const {
    tableData,
    loading,
    currenPage,
    total,
    limit,
    getData,
    handleDelete,
    handleStatusChange
} = useInitTable({
    getList: getUseLevelList,
    delete: deleteUseLevel,
    updateStatus: updateUseLevelStatus
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
        discount: '',
        level: '',
        max_price: 0,
        max_times: 0,
        status: 1,
    },
    rules: {
        name: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
    },
    getData,
    update: updateUseLevel,
    create: createUseLevel
})

</script>
<style scoped>
.f-refresh {
    cursor: pointer;
}
</style>