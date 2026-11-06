<template>
    <div>
        <el-card shadow="never" v-loading="loading">
            <ListHeader @create="handleCreateOpen" @refresh="getData" />
            <el-tree ref="tree" :data="tableData" node-key="id" :props="defaultProps" @node-click=""
            :default-expanded-keys="defaultExpandedKeys"
            class="mt-2"></el-tree>
        </el-card>

    </div>
</template>
<script setup>
import {ref} from 'vue'
import ListHeader from '@/components/ListHeader.vue'
import { getRuleList } from '@/api/rule.js'
import { useInitTable } from '@/composables/useCommon.js'

const defaultProps = {
    children: 'child',
    label: 'name',
}
const defaultExpandedKeys=ref([])
const {
    tableData,
    loading,
    currenPage,
    total,
    limit,
    getData,
    handleDelete,
} = useInitTable({
    selectForm: {
        keyWord: ''
    },
    getList: getRuleList,
    onGetListSuccess:(res)=>{
        tableData.value=res.list
        defaultExpandedKeys.value=res.list.map(o=>o.id)
    }
})

</script>