<template>
    <el-card shadow="never">
        <template #header>
            <div class="flex items-center justify-between">
                <div>
                    <el-button type="primary" size="small">新增</el-button>

                </div>
                <div class="f-refresh">
                    <el-icon :size="20" color="gray">
                        <Refresh />
                    </el-icon>
                </div>
            </div>
        </template>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="content" label="公告标题" width="180" align="center" />
            <el-table-column prop="create_time" label="发布时间" width="180"  align="center"/>
              <el-table-column prop="update_time" label="更新时间" width="180" align="center"/>
            <el-table-column  label="操作" align="center">
              <template #default>
                <el-button type="primary" size="small" text>修改</el-button>
                <el-popconfirm  title="是否删除该公告？" placement="top-start" 
                 confirm-button-text="确认"
                 cancel-button-text="取消"
                 >
                    <template #reference>
                          <el-button type="primary" size="small" text >删除</el-button>
                    </template>
                </el-popconfirm>
              
              </template>

            </el-table-column>
        </el-table>
       <el-pagination background   layout="prev, pager, next" :total="total"  class="flex justify-center items-center mt-3"/>
    </el-card>

</template>
<script setup>
import { ref } from 'vue'
import { getNoticeList } from '@/api/notice'

const tableData = ref([])
const page = ref(1)

// 分页
const total=ref(0)

const handleNoticeList = () => {
    getNoticeList().then(res => {   
       tableData.value=res.list
    })
}
handleNoticeList()
</script>
<style scoped>
.f-refresh {
    cursor: pointer;
}
</style>