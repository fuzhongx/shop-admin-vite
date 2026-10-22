<script setup>

</script>

<template>
  <router-view></router-view>
  </template>
<style>
body{
  @apply 'bg-gray-100'
}
#nprogress .bar{
  /* background-color: red !important; */
}

::-webkit-scrollbar{
  width: 4px;
  height: 6px;
}

/* 滚动条边角 */
::-webkit-scrollbar-corner{
display: block;
}

/* 滚动条小方块 */
::-webkit-scrollbar-thumb{
border-radius: 8px;
height: 4px;
background-color: rgba(0, 0, 0, 0.2);
}

::v-deep.el-popconfirm__main{
font-size: 12px;
}
</style>
