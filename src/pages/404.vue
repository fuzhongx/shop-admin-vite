<template>
    <div>
        <el-result icon="warning" title="Warning Tip" sub-title="您 的 页 面 走 丢 了 。。。">
            <template #extra>
                <el-button type="primary" @click='getback'>返回</el-button>
            </template>
        </el-result>
    </div>
</template>
<script setup>
// import { useRouter } from 'vue-router';
// const router = useRouter()

const getback = () => {
    // router.back()
    history.back()
}
</script>