<template>
    <div class="flex items-center">
        <el-icon class="mr-2" v-if="modelValue">
            <component :is="modelValue"></component>
        </el-icon>
        <el-select :modelValue="modelValue" placeholder="请选择图标" clearable filterable @change="handleChange">
            <el-option v-for="item in icons" :key="item" :label="item" :value="item">
                <div class="flex justify-between items-center">
                    <el-icon>
                        <component :is="item"></component>
                    </el-icon>
                    <span>{{ item }}</span>
                </div>
            </el-option>
        </el-select>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

defineProps({
    modelValue: String,
})

const icons = ref(Object.keys(ElementPlusIconsVue))

const emit = defineEmits(['update:modelValue'])

const handleChange = (e) => {
    emit('update:modelValue', e)
}

</script>