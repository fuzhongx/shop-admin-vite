<template>
  <div>

    <el-skeleton style="width: 240px">
      <template #template>
        <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
        <el-row :gutter="20">
          <el-col :span="6" :offset="0" v-for="(item, index) in panels">
            <el-card shadow="hover" :body-style="{ padding: '20px' }">
              <template #header>
                <div class="f-subTitle">
                  <span>{{ item.title }}</span>
                  <span>
                    <el-tag :type="item.unitColor == '' ? 'info' : item.unitColor" effect="plain">
                      {{ item.unit }}
                    </el-tag>
                  </span>
                </div>
              </template>
              <span class=" text-3xl font-bold text-gray-500"> {{ item.value }}</span>
              <el-divider />
              <div class="f-subTitle text-sm text-gray-500">
              
        <el-skeleton-item variant="text" style="width: 30%" />
               
        <el-skeleton-item variant="text" style="width: 30%" />
              </div>


            </el-card>

          </el-col>
        </el-row>
      </template>
    </el-skeleton>


    <el-row :gutter="20">
      <el-col :span="6" :offset="0" v-for="(item, index) in panels">
        <el-card shadow="hover" :body-style="{ padding: '20px' }">
          <template #header>
            <div class="f-subTitle">
              <span>{{ item.title }}</span>
              <span>
                <el-tag :type="item.unitColor == '' ? 'info' : item.unitColor" effect="plain">
                  {{ item.unit }}
                </el-tag>
              </span>
            </div>
          </template>
          <span class=" text-3xl font-bold text-gray-500"> {{ item.value }}</span>
          <el-divider />
          <div class="f-subTitle text-sm text-gray-500">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref } from 'vue'


const panels = ref([])

import { statistics1 } from '@/api/index.js'

statistics1().then(res => {
  panels.value = res.panels
  console.log(res.panels);
})

</script>
<style scoped>
.f-subTitle {
  display: flex;
  justify-content: space-between;
}
</style>