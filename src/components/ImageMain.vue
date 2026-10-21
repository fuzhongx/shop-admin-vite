<template>
   <el-main class="image-main" v-loading="loading">
      <div class="top">
         <el-row :gutter="20">
            <el-col :span="6" :offset="0" v-for="(item, index) in list" :key="index" >
               <el-card shadow="hover" clsss="imageCard" class="relative">
                    <el-image  :src="item.url" :fit="cover"  class="h[150px]"/> 
               </el-card>
               <div class="image-title">{{ item.name }}</div>
               <div>
                  <el-button link type="primary" clsss="text-sm">重命名</el-button>
                  <el-button link  type="primary" class="text-sm">删除</el-button>
               </div>
            </el-col>
         </el-row>

      </div>
      <div class="bottom">
         <el-pagination background layout="prev,pager, next" :total="total" :current-page="currenPage"
            :page-size="limit" @current-change="getData" />
      </div>
   </el-main>
</template>
<script setup>
import { ref } from 'vue'
import {
   GetImageClass
} from '@/api/image_class.js'

const loading = ref(false)
const list = ref([])

// 分页
const currenPage = ref(1)
const total = ref(1)
const limit = ref(10)

//选中图库ID
const ActiveImageID = ref(1)

//获取数据分页按钮
function getData(p = null) {
   if (typeof p == 'number') {
      currenPage.value = p
   }
   loading.value = true
   GetImageClass(ActiveImageID.value, currenPage.value).then(res => {
      console.log(res, '下拉图表数据');
      total.value = Number(res.totalCount) || 0
      loading.value = false
      list.value = res.list
   }).finally(() => {
      loading.value = false
   })

}

const loadingData = (image_class_id) => {
   console.log(image_class_id);
   currenPage.value = 1
   ActiveImageID.value = image_class_id
   getData()
}

defineExpose({
   loadingData
})

</script>
<style scoped>
.image-main {
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
.image-title{
   display: absolute;
   top: 112px;
   left: -1px;
   right: -1px;
   overflow: hidden;
   text-overflow:ellipsis;
   white-space: nowrap;
   @apply text-sm text-gray-200 bg-gray-500 bg-opacity-50 px-2 py-1;
}
</style>