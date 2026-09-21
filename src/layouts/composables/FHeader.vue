<template>
    <div class="FHeader">
        <span class="logo">
            <el-icon>
                <ElemeFilled />
            </el-icon>
            <span class="ml-1"> 旭日商城 </span>
        </span>

        <el-icon class="icon-btn">
            <Fold />
        </el-icon>
        <el-icon class="icon-btn">
            <Refresh  @click="handleRefresh"/>
        </el-icon>

        <div class="right">
            <el-icon class="FullScreen">
                <FullScreen  @click="toggle" v-if="!isFullscreen"/>
                 <Aim  @click="toggle" v-else/>
            </el-icon>
            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex justify-center items-center text-light-50">
                    <el-avatar :size="30" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
                    <!-- <el-avatar :size="30" :src="$store.state.user.avatar" /> -->

                    <span class="ml-[5px]"> {{ $store.state.user.username }}</span>
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="handleLoyout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>
import { showModel, toast } from '@/composables/util';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { logout } from '@/api/menager.js'
import { useFullscreen } from '@vueuse/core'

//安装npm i @vueuse/core
const { 
    //是否全屏
    isFullscreen, enter, exit, 
    //调用方法
    toggle } = useFullscreen()

const router = useRouter()
const store = useStore()


/**
 * 
 * @param {下拉数据} e 
 */
const handleCommand = (e) => {
    switch (e) {
        case 'handleLoyout':
            handleLoyout()
            break;
        case 'rePassword':
            console.log('退出登录');
            break;
    }
}

//刷新
const handleRefresh=()=>location.reload()

const handleLoyout = () => {
    showModel('是否退出登录').then(() => {
        logout().finally(() => {
            //清除token //清除用户状态 --可以在vuex里面操作
            store.dispatch('logout')
            // 跳转登录页
            router.push('/login')
            // 提示跳转成功
            toast('退出成功！')
        })
    })
}


</script>
<style scoped>
.FHeader {
    height: 64px;
    @apply flex fixed right-0 left-0 top-0 items-center bg-indigo-700 text-light-50;
}

.FHeader .logo {
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon-btn {
    width: 42px;
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center;
}

.FHeader .right {
    @apply ml-auto flex justify-center items-center;
}

.FHeader .right .FullScreen {
    width: 42px;
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center;
}

.dropdown {
    width: 120px;
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center;
}
</style>