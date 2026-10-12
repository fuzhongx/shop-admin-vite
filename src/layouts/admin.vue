<template>
    <el-container>
        <el-header>
            <FHeader />
        </el-header>
        <el-container>
            <el-aside :width="$store.state.asideWidth">
                <FMenu></FMenu>
            </el-aside>
            <el-main>
                <FTagList/>
                <router-view class="content"></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import FTagList from '@/layouts/composables/FTagList.vue';
import FMenu from '@/layouts/composables/FMenu.vue';
import FHeader from '@/layouts/composables/FHeader.vue';
</script>

<style>
.el-aside {
    transition: all .2s;
}

.el-main {
 
}
.content{
    position: fixed;
    top:108px;
}
</style>