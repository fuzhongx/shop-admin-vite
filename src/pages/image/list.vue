<template>
   <el-container class="bg-white rounded" :style="{ height: (h + 'px') }">
      <el-header class="image-header">Header</el-header>
      <el-container>
        <ImageAside/>
        <ImageMain/>
      </el-container>
   </el-container>
</template>

<script setup>

import ImageAside from '@/components/ImageAside.vue'
import ImageMain from '@/components/ImageMain.vue'
const clinetHeight = window.innerHeight || document.body.clientHeight  //获取到屏幕可视化高度，或者内容区域高度
const h = clinetHeight - 64 - 44 - 40
</script>

<style scoped>
.image-header {
   border-bottom: 1px solid #eeeeee;
   display: flex;
   align-items: center;
}

.image-aside {
   position: relative;
    border-right:1px solid #eeeeee;
}
.image-main{
   position: relative;
  
}

 .image-main .top, 
.image-aside .top { 
   position: absolute;
   top: 0;
   right: 0;
   left: 0;
   bottom: 50px;
   overflow-y: auto;
   
} 
.image-main .bottom,
.image-aside .bottom {
   height: 50px;
   position: absolute;
   right: 0;
   left: 0;
   bottom: 0;
   @apply flex justify-center items-center;
}
</style>
