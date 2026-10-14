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
                <FTagList />
                <router-view v-slot="{ Component }">
                    <Transition name="fade">
                        <KeepAlive :max="7">
                            <component :is="Component"></component>
                        </KeepAlive>
                    </Transition>

                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import FTagList from '@/layouts/composables/FTagList.vue';
import FMenu from '@/layouts/composables/FMenu.vue';
import FHeader from '@/layouts/composables/FHeader.vue';
import { KeepAlive } from 'vue';
</script>

<style>
.el-aside {
    transition: all .2s;
}

.fade-enter-from {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}

.fade-leave-from {
    opacity: 1;
}

.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}
.fade-enter-active{
transition-delay: 0.3s;   /* 延迟0.3s显示 */
}


</style>