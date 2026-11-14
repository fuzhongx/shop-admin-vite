<template>
    <el-card shadow="never">
        <template #header>
            <!-- 刷新和新增 -->
            <ListHeader @create="handleCreateOpen" @refresh="getData" />
        </template>

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="name" label="角色名称" />
            <el-table-column prop="desc" label="角色描述" align="center" />
            <el-table-column prop="status" label="状态" align="center">
                <template #default="{ row }">
                    <el-switch :modelValue='row.status' :active-value="1" :inactive-value="0" :loading="row.statusLoading"
                        @change="handleStatusChange($event, row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text @click="openSetRules(scope.row)">配置权限</el-button>
                    <el-button type="primary" size="small" text @click="handleUpdateOpen(scope.row)">修改</el-button>
                    <el-popconfirm title="是否删除该角色？" confirm-button-text="确认" cancel-button-text="取消"
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
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="desc">
                    <el-input v-model="form.desc" type="textarea"></el-input>
                </el-form-item>

                <el-form-item label="状态">
                    <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
                    </el-switch>
                </el-form-item>
            </el-form>
        </FormDrawer>

        <!-- 配置权限 -->
        <FormDrawer title="配置权限" @submit="handleSetRules" ref="setRulesFormDrawerRefs">
            <el-tree-v2 ref="treeRefs" :check-strictly="checkStrictly" node-key="id" :default-expanded-keys="defaultExpandedKeys" :data="ruleList"
                @check="getTreeChangeNode" :props="{ label: 'name', children: 'child' }" show-checkbox :height="treeHeight">
                <template #default="{ node, data }">
                    <div class="f-menu-comtemt">
                        <el-tag size="small" effect="plain" :type="data.menu ? 'primary' : 'info'">{{ data.menu ? '菜单' :
                            '权限'
                        }}</el-tag>
                        <span>{{ data.name }}</span>
                    </div>
                </template>
            </el-tree-v2>
        </FormDrawer>
    </el-card>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { getRoleList, deleteRole, updateRoleStatus, createRole, updateRole, setRoleRules } from '@/api/role'
import { getRuleList } from '@/api/rule'
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
    handleStatusChange
} = useInitTable({
    getList: getRoleList,
    delete: deleteRole,
    updateStatus: updateRoleStatus
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
        desc: '',
        status: 1,
    },
    rules: {
        name: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
    },
    getData,
    update: updateRole,
    create: createRole
})

const setRulesFormDrawerRefs = ref(null)
const ruleList = ref([])
const roleId = ref(0)
const treeHeight = ref(0)
const treeRefs = ref(null)

//默认展开节点
const defaultExpandedKeys = ref([])

//当前角色拥有的权限ID
const ruleIds = ref([])

//在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
const checkStrictly=ref(false)

//配置权限
const openSetRules = (row) => {
    checkStrictly.value=true
    roleId.value = row.id
    treeHeight.value = window.innerHeight - 180 //可视高度减去180
    getRuleList(1).then(res => {
        ruleList.value = res.list
        defaultExpandedKeys.value = res.list.map(o => o.id)
        setRulesFormDrawerRefs.value.open()
        //当前角色拥有的权限ID
        ruleIds.value = row.rules.map(o => o.id)

        setTimeout(() => {
            treeRefs.value.setCheckedKeys(ruleIds.value)//setCheckedKeys()默认选中功能
            checkStrictly.value=false
        }, 150)
    })

}

const getTreeChangeNode = (...e) => {
    const { checkedKeys, halfCheckedKeys } = e[1]
    ruleIds.value = [...checkedKeys, ...halfCheckedKeys]
}

const handleSetRules = () => {
    setRulesFormDrawerRefs.value.showLoading()
    setRoleRules(roleId.value, ruleIds.value).then(res => {
        toast('配置成功')
        getData()
        setRulesFormDrawerRefs.value.close()
    }).finally(() => {
        setRulesFormDrawerRefs.value.hideLoading()
    })
}

</script>
<style scoped>
.f-refresh {
    cursor: pointer;
}
</style>