<template>
    <el-card shadow="never">
        <template #header>
            <!-- 刷新和新增,删除 -->
            <ListHeader @create="handleCreateOpen" @refresh="getData" @delete="handleDeleteMuitiSelection"
                :layout="['create', 'refresh']" />
        </template>

        <el-table :data="tableData" style="width: 100%" v-loading="loading" ref="multipleTableRef">
            <el-table-column label="优惠卷名称" width="350">
                <template #default="{ row }">
                    <div class="border-light-50 rounded px-1" :class="row.statusText == '领取中' ? 'active' : 'inactive'">
                        <h2 class="font-bold">{{ row.name }}</h2>
                        <small class="text-sm">
                            {{ row.start_time }}~{{ row.end_time }}
                        </small>
                    </div>
                </template>

            </el-table-column>
            <el-table-column prop="statusText" label="状态" align="center">
                <template #default="{ row }">
                    <div :style="row.statusText == '领取中' ? 'color:red' : 'color:gray'">
                        {{ row.statusText }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="value" label="优惠" align="center">
                <template #default="{ row }">
                    {{ row.type == 0 ? '满减 ' + ' ￥' + row.value : '折扣 ' + row.value }}
                </template>
            </el-table-column>
            <el-table-column prop="total" label="发放数量" align="center" />
            <el-table-column prop="used" label="已使用" align="center" />
            <el-table-column label="操作" align="center">
                <template #default="{ row }">
                    <el-button v-if="row.statusText == '未开始'" type="primary" size="small" text
                        @click="handleUpdateOpen(row)">修改</el-button>

                    <el-popconfirm v-if="row.statusText != '领取中'" title="是否删除该优惠卷？" confirm-button-text="确认"
                        cancel-button-text="取消" @confirm="handleDelete(row.id)" width="200">
                        <template #reference>
                            <el-button type="primary" size="small" text>删除</el-button>
                        </template>
                    </el-popconfirm>

                    <el-popconfirm v-if="row.statusText == '领取中'" title="是否让该优惠卷失效？" confirm-button-text="确认"
                        cancel-button-text="取消" @confirm="handleStatusChange(0,row)"  width="200">
                        <template #reference>
                            <el-button type="danger" size="small">失效</el-button>
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
                <el-form-item label="类型" prop="type">
                    <el-radio-group v-model="form.type">
                        <el-radio :value="0">满减</el-radio>
                        <el-radio :value="1">折扣</el-radio>
                    </el-radio-group>

                </el-form-item>
                <el-form-item label="面值" prop="value">
                    <el-input v-model="form.value">
                        <template #append>{{ form.type ? '折' : '元' }}</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="发行量" prop="total">
                    <el-input-number v-model="form.total" :min="0" :max="10000">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="最低使用价格" prop="min_price">
                    <el-input v-model="form.min_price">
                        <template #append>{{ form.type ? '折' : '元' }}</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="form.order" :min="0" :max="1000">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="活动时间" prop="tiemrange">
                    <el-date-picker v-model="tiemrange" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss"
                        start-placeholder="开始时间" end-placeholder="结束时间" range-separator="~" />
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input v-model="form.desc" type="textarea"></el-input>
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>
<script setup>
import { ref, computed } from 'vue'
import { getCouponList, deleteCoupon, updateCouponStatus, createCoupon, updateCoupon } from '@/api/Coupon'
import FormDrawer from '@/components/FromDrawer.vue'
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
    handleDeleteMuitiSelection,
    handleStatusChange
} = useInitTable({
    getList: getCouponList,
    delete: deleteCoupon,
    updateStatus: updateCouponStatus,
    onGetListSuccess: (res) => {
        tableData.value = res.list.map(o => {
            o.statusText = statusDeatil(o)
            return o
        })
        total.value = res.totalCount
    },
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
        total: 100,
        min_price: 100,
        start_time: null,
        end_time: null,
        order: 50,
        desc: ''
    },
    rules: {
        name: [{ required: true, message: '规格名称不能为空', trigger: 'blur' }],
        default: [{ required: true, message: '规格值不能为空', trigger: 'blur' }],
    },
    getData,
    update: updateCoupon,
    create: createCoupon,
    beforeSubmit: (f) => {
        if (typeof f.start_time != 'number') {
            f.start_time = new Date(f.start_time).getTime()
        }
        if (typeof f.end_time != 'number') {
            f.end_time = new Date(f.end_time).getTime()
        }
        return f
    }
})

//区别状态
function statusDeatil(row) {
    let s = '领取中'
    let startTime = new Date(row.start_time).getTime()
    let nowTime = new Date().getTime()
    let endTime = new Date(row.endTime).getTime()
    if (startTime < nowTime) {
        s = '未开始'
    } else if (endTime > nowTime) {
        s = '已结束'
    } else if (row.status == 0) {
        s = '已失效'
    }
    return s
}

//日期时间转换格式
const tiemrange = computed({
    get() {
        return form.start_time && form.end_time ? [form.start_time, form.end_time] : []
    },
    set(val) {
        form.start_time = val[0]
        form.end_time = val[1]
    }
})


</script>
<style scoped>
.f-refresh {
    cursor: pointer;
}

.active {
    @apply bg-rose-50 text-rose-400 border-rose-200;
}

.inactive {
    @apply bg-gray-50 text-gray-400 border-gray-200;
}
</style>