<template>
{{ d.num.toFixed(0) }}
</template>

<script setup>
//数字动画库
import gsap from 'gsap';
import { reactive, watch } from 'vue';

const d=reactive({
    num:0
})

const props=defineProps({
    value:{
        type:Number,
        default:0
    }
})
function animatedCount(){
    gsap.to(d,{
        duration:0.5,//动画刷新时间
        num:props.value
    })
}
animatedCount()

//为了防止setup执行完之后才会去改变value,我们去监听一下值的变化
watch(()=>props.value,()=>animatedCount())


</script>