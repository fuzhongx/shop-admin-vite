<template>
   <el-main class="image-main" v-loading="loading">
      <div class="top">
         <el-row :gutter="20" class="p-3">
            <el-col :span="6" :offset="0" v-for="(item, index) in list" :key="index">
               <el-card shadow="hover" class="relative mb-3" ::body-style="{ 'padding': 0 }">
                  <el-image :src="item.url" fit="cover" class="h-[150px]" style="width: 100%;"
                     :preview-src-list="[item.url]" :initial-index="0" />

                  <div class="image-title">{{ item.name }}</div>
                  <div class="flex justify-center items-center p-2">
                     <el-button link type="primary" size="small" @click="handleResetName(item)" v-loading="loading">重命名</el-button>
                     <el-popconfirm title="是否要删除该图片?" cancel-button-text="取消" 
                     confirm-button-text="确认" class="text-sm"
                     @confirm="handleDeeteImage(item.id)">
                        <template #reference>
                           <el-button link type="primary" size="small">删除</el-button>
                        </template>
                     </el-popconfirm>
                  </div>
               </el-card>
            </el-col>
         </el-row>

      </div>
      <div class="bottom">
         <el-pagination background layout="prev,pager, next" :total="total" :current-page="currenPage"
            :page-size="limit" @current-change="getData" />
      </div>
      <el-drawer title="上传图片" v-model="drawer" direction="rtl" size="30%"
        @click="handleOpenDrawer" >
        <UploadFile :data="{image_class_id}" @success="UploadSuccess"/>
      </el-drawer>
      
   </el-main>
</template>
<script setup>
import { ref } from 'vue'
import {
   GetImageClass,
   UpdataImageName,
   DeleteImage
} from '@/api/image_class.js'

import { showPrompt, toast } from '@/composables/util.js'

import UploadFile from '@/components/UploadFile.vue';

const loading = ref(false)
const list = ref([])

//上传图片
const drawer=ref(false)
const handleOpenDrawer=()=>drawer.value=true

const UploadSuccess=()=>{
   drawer.value=false
   getData(1)
}

// 分页
const currenPage = ref(1)
const total = ref(1)
const limit = ref(10)

//选中图库ID
const image_class_id = ref(1)

//获取数据分页按钮
function getData(p = null) {
   if (typeof p == 'number') {
      currenPage.value = p
   }
   loading.value = true
   GetImageClass(image_class_id.value, currenPage.value).then(res => {
      total.value = Number(res.totalCount) || 0
      loading.value = false
      list.value = res.list
   }).finally(() => {
      loading.value = false
   })

}

//调用对应方法获取image数据
const loadingData = (image_id) => {
   currenPage.value = 1
   image_class_id.value = image_id
   getData()
}

//重命名
const handleResetName = (item) => {
   showPrompt('重命名', item.name)
      .then(({ value }) => {
         loading.value = true
         UpdataImageName(item.id, value).then(res => {
            loading.value = false
            toast('修改成功')
            getData()
         }).finally(() => {
            loading.value = false
         })
      })
}

//删除图片
const handleDeeteImage = (ids) => {
   loading.value=true
   DeleteImage([ids]).then(res => {
      toast('删除成功')
        getData()
   }).finally(()=>{
      loading.value=false
   })

}

defineExpose({
   loadingData,
   handleOpenDrawer
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

.image-title {
   display: absolute;
   top: 122px;
   left: -1px;
   right: -1px;
   bottom: 50px;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   @apply text-sm text-gray-100 bg-gray-800 bg-opacity-50 px-2 py-1;
}
</style>