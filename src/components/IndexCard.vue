<template>
    <div>
        <el-card shadow="never">
            <template #header>
                <div class="f-subTitle flex justify-center items-center">
                    <span>{{ title }}</span>
                    <span>
                        <el-tag type='warning' effect="plain">
                            {{ tip }}
                        </el-tag>
                    </span>
                </div>
            </template>
            <el-row :gutter="20">
                <el-col :span="6" :offset="0" v-for="(item, index) in btns" :key="index">
                    <el-card shadow="hover" class="border-0 bg-light-400 cursor-pointer">
                        <div class="flex flex-col  justify-center items-center">
                            <span>{{ item.value }}</span>
                            <span class="text-gray-500">{{ item.label }}</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script setup>
defineProps({
    title: {
        type: String,
    },
    tip: {
        type: String,
    },
    btns: {
        type: Array
    }
})
</script>
<style scoped>
.f-subTitle {
    display: flex;
    justify-content: space-between;
}
</style>