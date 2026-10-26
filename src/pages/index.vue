<template>
  <div v-permission="['getStatistics1,GET']">
    <el-row :gutter="20" >
      <template v-if="panels.length == 0">
        <el-col :span="6" :offset="0" v-for="i in 4" :key="i">
          <el-skeleton style="width: 100%;" animated loading>
            <template #template>
              <el-card shadow="hover" :body-style="{ padding: '20px' }">
                <template #header>
                  <div class="f-subTitle" style="width: 100%;">
                    <el-skeleton-item variant="text" style="width: 50%" />
                    <el-skeleton-item variant="text" style="width:20%" />
                  </div>
                </template>
                <span class=" text-3xl font-bold text-gray-500">
                  <el-skeleton-item variant="text" style="width: 50%" />
                </span>
                <el-divider />
                <div class="f-subTitle text-sm text-gray-500">
                  <el-skeleton-item variant="text" style="width: 50%" />
                  <el-skeleton-item variant="text" style="width: 20%" />
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
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
          <span class=" text-3xl font-bold text-gray-500">
            <CountTo :value="item.value" />
          </span>
          <el-divider />
          <div class="f-subTitle text-sm text-gray-500">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <indexNavs></indexNavs>

    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <IndexCharts v-permission="['getStatistics3,GET']"/>
      </el-col>
      <el-col :span="12" :offset="0">
        <IndexCard  title="店铺及商品提示" tip="店铺及商品提示" :btns="goods" v-permission="['getStatistics2,GET']"/>
        <IndexCard  title="交易提示" tip="需要立即处理的交易订单" :btns="order" class="mt-3" v-permission="['getStatistics2,GET']"/>
      </el-col>
    </el-row>


  </div>
</template>
<script setup>
import { ref } from 'vue'
import { statistics1,statistics2 } from '@/api/index.js'
import CountTo from "@/components/CountTo.vue"
import indexNavs from "@/components/indexNavs.vue"
import IndexCharts from "@/components/IndexCharts.vue"
import IndexCard from "@/components/IndexCard.vue"

const panels = ref([])

statistics1().then(res => {
  panels.value = res.panels
})

const goods=ref([])
const order=ref([])

statistics2().then(res=>{
  goods.value=res.goods
  order.value=res.order
})

</script>
<style scoped>
.f-subTitle {
  display: flex;
  justify-content: space-between;
}
</style>