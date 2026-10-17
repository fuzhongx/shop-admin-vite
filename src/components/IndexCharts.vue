<template>
    <div>
        <el-card shadow="never">
            <template #header>
                <div class="flex justify-between">
                    <span class="flex justify-center items-center">
                        订单统计
                    </span>
                    <span class="flex justify-center items-center text-sm">
                        <el-check-tag :checked="item.type == checked" type="primary" @change="onChange(item)"
                            v-for="(item, index) in typeList" :key="index" class="text-sm ml-2">
                            {{ item.title }}
                        </el-check-tag>
                    </span>
                </div>
            </template>
            <div ref="el" id="charts" style="width: 100%; height: 300px;"></div>
        </el-card>

    </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue'
import { statistics3 } from '@/api/index.js'
import { useResizeObserver } from '@vueuse/core'

const checked = ref('month')

let typeList = [
    {
        title: '近一个月',
        type: 'month'
    }, {
        title: '近一周',
        type: 'week'
    }, {
        title: '近24小时',
        type: 'hour'
    }
]

const onChange = (e) => {
    checked.value = e.type
    handleCharts()
}

let myChart = null
onMounted(() => {
    let chartDom = document.getElementById('charts');
    
    if (chartDom) {
        myChart = echarts.init(chartDom);
        handleCharts()
    }

})


function handleCharts() {
    myChart.showLoading()
    let option = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        grid: {
            left: '10%',
            right: '5%',
            top: '10%',
            bottom: '10%'
        },
        series: [
            {
                data: [],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };
    statistics3(checked.value).then(res => {
        option.xAxis.data = res.x
        option.series[0].data = res.y
        option && myChart.setOption(option);
        myChart.hideLoading() //加载动画
    })

}
let el = ref(null)
useResizeObserver(el, entries => { // VueUse里面的useResizeObserver方法可监听视图大小
    myChart.resize()
})


</script>
<style scoped></style>