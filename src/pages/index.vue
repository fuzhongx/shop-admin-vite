<template>
  <div>后台首页
    <el-button @click="handleLoyout">退出登录</el-button>
  </div>
</template>
<script setup>
import { showModel, toast } from '@/composables/util';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { logout } from '@/api/menager.js'

const router = useRouter()
const store=useStore()


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