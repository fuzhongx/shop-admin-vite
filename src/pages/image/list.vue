<template>
   <el-container class="bg-white rounded" :style="{ height: (h + 'px') }">
      <el-header class="image-header">Header</el-header>
      <el-container>
         <el-aside width="220px" class="image-aside">
            <div class="top" > 
               <div v-for="i in 30" :key="i">{{ i }}</div>
            </div>
            <div class="bottom">
               分页
            </div>
         </el-aside>
         <el-main class="image-main">
            <div class="top" > 
               <div v-for="i in 30" :key="i">{{ i }}</div>
            </div>
            <div class="bottom">
               分页
            </div>
         </el-main>
      </el-container>
   </el-container>
</template>

<script setup>
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
