<template>
    <el-dialog title="商品选择" v-model="dialogVisible" width="80%">
        <ChooseGoodsLayout @submit="handleChooseGoods"></ChooseGoodsLayout>
        <template #footer>
            <span>
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="handleConnet" :loading="loading">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
import ChooseGoodsLayout from '@/pages/category/components/ChooseGoodsLayout.vue';
import { associationCategory } from '@/api/category'
import { toast } from '@/composables/util.js'

const dialogVisible = ref(false)

const open = () => {
    dialogVisible.value = true
}

const close = () => {
    dialogVisible.value = false
}

const loading = ref(false)

let goods_ids = ref()
const handleChooseGoods = (ids) => {
    goods_ids.value = ids
}

const handleConnet = () => {
    console.log( goods_ids.value);
    loading.value = true
    associationCategory(5, goods_ids.value).then(res => {
        toast('关联成功')
    }).finally(() => {
        loading.value = false
        close()
    })
}
const emit = defineEmits(['submit'])

defineExpose({
    open,
    close
})

</script>
    