<template>
    <div>
        <el-card shadow="never" v-loading="loading">
            <ListHeader @create="handleCreateOpen" @refresh="getData" />
            <el-tree ref="tree" :data="tableData" node-key="id" :props="defaultProps" @node-click=""
                :default-expanded-keys="defaultExpandedKeys" class="mt-2">
                <template #default="{ node, data }">
                    <div class="f-menu-comtemt">
                        <el-tag size="small" effect="plain" :type="data.menu ? 'primary' : 'info'">{{ data.menu ? '菜单' :
                            '权限'
                        }}</el-tag>
                        <el-icon class="ml-1" v-if="data.icon">
                            <component :is="data.icon"></component>
                        </el-icon>
                        <span>{{ data.name }}</span>
                        <div class="ml-auto">
                            <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0"
                                @change="handleStatusChange($event, data)" :loading="data.statusLoading">
                            </el-switch>
                            <el-button text type="primary" size="small" @click.stop="handleUpdateOpen(data)">修改</el-button>
                            <el-button text type="primary" size="small" @click.stop="addChild(data.id)">增加</el-button>
                            <el-popconfirm title="是否删除该管理员权限？" confirm-button-text="确认" cancel-button-text="取消"
                                @confirm="handleDelete(data.id)" width="200">
                                <template #reference>
                                    <el-button type="primary" size="small" text>删除</el-button>
                                </template>
                            </el-popconfirm>

                        </div>
                    </div>
                </template>
            </el-tree>
        </el-card>
        <FormDrawer :title="DrawerTitle" @submit="UpdataAndCreateActive" ref="FormDrawerRefs">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
                <el-form-item label="上级菜单" prop="rule_id">
                    <el-cascader v-model="form.rule_id" :options="options" :props="{
                        value: 'id',
                        label: 'name',
                        children: 'child',
                        checkStrictly: true,
                    }" filterable clearable placeholder="请选择上级菜单" />
                </el-form-item>
                <el-form-item label="菜单/规则" prop="menu">
                    <el-radio-group v-model="form.menu">
                        <el-radio :value="1" border>菜单</el-radio>
                        <el-radio :value="0" border>规则</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="名称" prop="name" style="width: 50%;">
                    <el-input v-model="form.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon" v-if="form.menu == 1">
                    <IconSelect v-model="form.icon" />
                </el-form-item>
                <el-form-item label="前端路由" prop="frontpath" v-if="form.menu == 1 && form.rule_id > 0">
                    <el-input v-model="form.frontpath"></el-input>
                </el-form-item>
                <el-form-item label="后端规则" prop="condition" v-if="form.menu == 0">
                    <el-input v-model="form.condition"></el-input>
                </el-form-item>
                <el-form-item label="请求方式" prop="method" v-if="form.menu == 0">
                    <el-select v-model="form.method" value-key="" placeholder="请选择请求方式" clearable filterable>
                        <el-option v-for="item in ['GET', 'POST', 'PUT', 'DELETE']" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="form.order" :min="1" :max="100" :step="1" :controls="true">
                    </el-input-number>
                </el-form-item>
            </el-form>
        </FormDrawer>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import ListHeader from '@/components/ListHeader.vue'
import FormDrawer from '@/components/FromDrawer.vue'
import IconSelect from '@/components/IconSelect.vue'
import { getRuleList, updateRuleStatus, deleteRule, createRule, updateRule } from '@/api/rule.js'
import { useInitTable, useInitForm } from '@/composables/useCommon.js'

const defaultProps = {
    children: 'child',
    label: 'name',
}
const options = ref([
    {
        value: '',
        label: '',
        children: []
    }
])

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
    getList: getRuleList,
    onGetListSuccess: (res) => {
        options.value = res.rules
        tableData.value = res.list
        defaultExpandedKeys.value = res.list.map(o => o.id)
        tableData.value = res.list.map(o => {
            o.statusLoading = false //自定义switch 按钮loading值
            return o
        })
    },
    updateStatus: updateRuleStatus,
    delete: deleteRule,
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
        rule_id: '',
        menu: 1,
        name: '',
        condition: '',
        method: 'GET',
        status: 1,
        order: 50,
        icon: '',
        frontpath: ''
    },
    create: createRule,
    update: updateRule

})

//添加子集
const addChild = (id) => {
    handleCreateOpen()
    form.rule_id = id
    form.status = 1
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