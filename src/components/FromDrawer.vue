<template>
    <el-drawer ref="FormRefs" v-model="showDrawer" :title="title" :size="size" :close-on-click-modal="closeOnClickModal"
        :destroy-on-close="DestroyOnClose" class="FormDrawer">
        <div>
            <slot></slot>
        </div>
        <div class="submitBtn">
            <el-button type="primary" @click="submit" class='mr-9' :loading="loading">{{ confirmText }}</el-button>
            <el-button @click="close">取消</el-button>
        </div>
    </el-drawer>
</template>
<script setup>
import { ref } from 'vue'
const FormRefs = ref(null)
const showDrawer = ref(false)

const loading=ref(false)

//打开drawer
const open = () => showDrawer.value = true

// 关闭drawer
const close = () => showDrawer.value = false

// 打开loading
const showLoading=()=>loading.value=true

// 关闭loading
const hideLoading=()=>loading.value=false




const props = defineProps({
    title: {
        type: String
    },
    size: {
        type: String,
        default: '45%'
    },
    closeOnClickModal: {
        type: Boolean,
        default: true
    },
    DestroyOnClose: {
        type: Boolean,
        default: true
    },
    confirmText: {
        type: String,
        default: '提交'
    }
})


//提交
const emit = defineEmits(['submit'])
const submit = () => emit('submit')



//将方法暴露出去
defineExpose({
    open,
    close,
    showLoading,
    hideLoading

})


</script>

<style scoped>
.FormDrawer {
    position: relative;
}

.FormDrawer .submitBtn {
    position: absolute;
    bottom: 30px;
    left: 20px;
}
</style>