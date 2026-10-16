<template>
    <div>
        <el-row :gutter="20" class="py-4 flex justify-between">
            <el-col :span="3" :offset="0" v-for="item in iconNavs" :key="item.path">
                <el-card shadow="hover" @click="handleLink(item)">
                    <div class="flex flex-col justify-center items-center">
                        <el-icon :size="20" :class="item.color">
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span class="text-sm mt-2">{{ item.title }}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import {useRouter} from 'vue-router'
const iconNavs = [
    {
        icon: 'user',
        color: 'text-light-blue-500',
        title: '用户',
        path: '/user/list'
    }, {
        icon: 'shopping-cart-full',
        color: 'text-violet-500',
        title: '商品',
        path: '/goods/list'
    }, {
        icon: 'reading',
        color: 'text-fuchsia-500',
        title: '订单',
        path: '/order/list'
    }, {
        icon: 'comment',
        color: 'text-teal-500',
        title: '评价',
        path: '/comment/list'
    }, {
        icon: 'picture-filled',
        color: 'text-rose-500',
        title: '图库',
        path: '/image/list'
    }, {
        icon: 'notification',
        color: 'text-green-500',
        title: '公告',
        path: '/notice/list'
    }, {
        icon: 'baseball',
        color: 'text-gray-500',
        title: '配置',
        path: 'setting/base'
    }, {
        icon: 'user',
        color: 'text-yellow-500',
        title: '优惠卷',
        path: '/coupon/list'
    }
]
const router=useRouter()

const handleLink=(item)=>{
    router.push(item.path)
}
</script>
<style scoped></style>