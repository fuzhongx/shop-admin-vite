<template>
    <div class="aside_list" :class="{ 'active': active }">
        <span class="aside-title">
            <slot />
        </span>
        <el-button link size="small" type="primary" class="ml-auto px-1" @click.stop="$emit('edit')">
            <el-icon :size="14">
                <Edit />
            </el-icon>
        </el-button>
       
        <span @click.stop="()=>{}"> <!-- 阻止冒泡事件 -->
            <el-popconfirm title="是否要删除图库?" confirm-button-text="确认" cancel-button-text="取消" @confirm="$emit('delete')">
                <template #reference>
                    <el-button link size="small" type="primary" class="px-1">
                        <el-icon :size="15">
                            <close />
                        </el-icon>
                    </el-button>
                </template>
            </el-popconfirm>
        </span>

    </div>
</template>
<script setup>

defineProps({
    active: {
        type: Boolean,
        default: false
    }
})

defineEmits(['edit', 'delete'])

</script>

<style scoped>
.aside_list {
    border-bottom: 1px solid #f4f4f4;
    cursor: pointer;
    @apply flex items-center text-gray-600 text-sm p-3;
}

.aside-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.aside_list:hover,
.active {
    @apply bg-blue-50;
}
</style>