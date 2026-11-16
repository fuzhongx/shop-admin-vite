<template>
    <div class="flex items-center justify-between">
        <div>
            <el-button type="primary" size="small" @click="$emit('create')" v-if="layout.includes('create')">新增</el-button>
            <el-popconfirm title="是否批量删除该规格？" confirm-button-text="确认" cancel-button-text="取消" @confirm="$emit('delete')"
                width="200" v-if="layout.includes('delete')">
                <template #reference>
                    <el-button type="danger" size="small">批量删除</el-button>
                </template>
            </el-popconfirm>
        </div>
        <div class="f-refresh">
            <el-icon :size="20" color="gray" @click="$emit('refresh')">
                <Refresh />
            </el-icon>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
    layout: Array,
    default: ['create', 'refresh']
})
defineEmits(['create', 'refresh', 'delete'])
</script>

<style scoped>
.f-refresh {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
</style>