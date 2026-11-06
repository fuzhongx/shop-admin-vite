<template>
    <div class="flex items-center justify-between">
        <div>
            <el-button type="primary" size="small" @click="$emit ('create')">新增</el-button>
        </div>
        <div class="f-refresh">
            <el-icon :size="20" color="gray" @click="$emit ('refresh')">
                <Refresh />
            </el-icon>
        </div>
    </div>
</template>
<script setup>
defineEmits(['create', 'refresh'])
</script>

<style scoped>
.f-refresh {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items:flex-end;
}
</style>