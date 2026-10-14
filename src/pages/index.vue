<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" :offset="0" v-for="(item,index) in panels">
      <el-card shadow="hover" :body-style="{ padding: '20px' }">
        <template #header>
        <div>
          <span><!-- card title --></span>
        </div>
        </template>
        <!-- card body -->
      </el-card>
      
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import {ref} from 'vue'

const panels=ref([])

import {statistics1} from '@/api/index.js'

statistics1().then(res=>{
  panels.value=res.panels
  console.log(res.panels);
})

</script>