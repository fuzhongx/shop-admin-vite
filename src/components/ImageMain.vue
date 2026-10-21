<template>
  <el-main class="image-main">
            <div class="top" > 
               <div v-for="i in 100" :key="i">{{ i }}</div>
            </div>
            <div class="bottom">
               <el-pagination background layout="prev, next" :total="total" :current-page="currenPage" :page-size="limit"
                @current-change="getData" />
            </div>
         </el-main>
</template>
<script setup>
import {ref } from 'vue'
import {
    GetImageClass
} from '@/api/image.js'

//加载动画
const loading = ref(false)
const list = ref([])
const activeId = ref(0)

// 分页
const currenPage = ref(1)
const total = ref(1)
const limit = ref(10)

const loadData=(imgage_class_id,page)=>{
   GetImageClass(imgage_class_id,page).then(res=>{
      console.log(res);
      
   })
}

defineExpose({
   loadData
})

</script>
<style scoped>
.image-main{
   position: relative;
  
}
.image-main .top { 
   position: absolute;
   top: 0;
   right: 0;
   left: 0;
   bottom: 50px;
   overflow-y: auto;
   
} 
.image-main .bottom {
   height: 50px;
   position: absolute;
   right: 0;
   left: 0;
   bottom: 0;
   @apply flex justify-center items-center;
}
</style>