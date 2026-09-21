<template>
    <el-container>
        <el-header>
            <FHeader />
        </el-header>
        <el-container>
            <el-aside>
                <FMenu></FMenu>
            </el-aside>
            <el-main>
                <FTagList />
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import FTagList from '@/layouts/composables/FTagList.vue';
import FMenu from '@/layouts/composables/FMenu.vue';
import FHeader from '@/layouts/composables/FHeader.vue';
</script>

<style scoped>

</style>