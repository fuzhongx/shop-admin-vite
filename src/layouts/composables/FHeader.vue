<template>
    <div class="FHeader">
        <span class="logo">
            <el-icon>
                <ElemeFilled />
            </el-icon>
            <span class="ml-1"> 厚和商城后台管理 </span>
        </span>

        <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
            <Fold v-if="$store.state.asideWidth =='250px'" />
            <Expand v-else/>
        </el-icon>
        <el-icon class="icon-btn">
            <Refresh @click="handleRefresh" />
        </el-icon>

        <div class="right">
            <el-icon class="FullScreen">
                <FullScreen @click="toggle" v-if="!isFullscreen" />
                <Aim @click="toggle" v-else />
            </el-icon>
            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex justify-center items-center text-light-50">
                    <el-avatar :size="30"
                        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
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

    <FromDrawer ref="FormDrawerRef" title="修改密码" size="45%" @submit="submit">
        <!-- 修改密码 -->
        <el-form ref="FormRefs" style="max-width: 600px" :model="FormData" :rules="rules" label-width="auto">
            <el-form-item label="旧密码" prop="oldpassword">
                <el-input v-model="FormData.oldpassword" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input v-model="FormData.password" type="password" show-password />
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
                <el-input v-model="FormData.repassword" type="password" show-password />
            </el-form-item>
        </el-form>
    </FromDrawer>

</template>
<script setup>
import FromDrawer from '@/components/FromDrawer.vue'
import { useFullscreen } from '@vueuse/core'
import { useRepassWord, uselLoyout } from '@/composables/useManager';


//安装npm i @vueuse/core
const {
    //是否全屏
    isFullscreen,
    //调用方法
    toggle } = useFullscreen()

//修改密码    
const {
    FormData,
    rules,
    FormRefs,
    FormDrawerRef,
    rePasswordOpenDrawer,
    showLoadig,
    hideLoadig,
    submit
} = useRepassWord()

// 退出登录
const {
    handleLoyout
} = uselLoyout()

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
            // FormDrawerRef.value.open()
            rePasswordOpenDrawer()//打开修改密码drawer
            break;
    }
}


//刷新
const handleRefresh = () => location.reload()


</script>
<style scoped>
.FHeader {
    height: 64px;
    @apply flex fixed right-0 left-0 top-0 items-center bg-indigo-700 text-light-50;
}

.FHeader .logo {
    width: 250px;
    height: 64px;
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