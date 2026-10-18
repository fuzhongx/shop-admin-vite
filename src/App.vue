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
background-color: rgba(0, 0, 0, 0.2);
}
</style>
