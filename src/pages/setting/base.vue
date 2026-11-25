<template>
 <div>
    <el-card shadow="never" :body-style="{ padding: '20px' }">
        <el-tabs class="demo-tabs">
            <el-tab-pane :label="item.name" :name="item.key" v-for="(item, index) in tabBars" :key="index"></el-tab-pane>
        </el-tabs>
    </el-card>
    
 </div>
</template>
<script setup>
import {ref} from 'vue'


let tabBars=[
    {   
        key:'1',
        name:'注册与访问'   
    },
    {   
        key:'2',
        name:'上传设置'   
    },
    {   
        key:'3',
        name:'Api安全'   
    },
]
</script>