<template>
    <div :style="{ left: $store.state.asideWidth }" class="f-tabs">
        <el-tabs v-model="tabsActive" type="card" style="min-width: 100px;" @tab-remove="removeTab"  @tab-change="changeTab">
            <el-tab-pane v-for="item in tabsList" :key="item.path" :label="item.name" :name="item.path"
                :closable="item.path != '/'">
            </el-tab-pane>
        </el-tabs>
        <span class="f-dra-btn">
            <el-dropdown>
                <span>
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>关闭其他</el-dropdown-item>
                        <el-dropdown-item>关闭全部</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCookies } from "@vueuse/integrations/useCookies";
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router'

const route = useRoute()
const router=useRouter()

const cookit=useCookies()


const tabsActive = ref(route.path)
const tabsList = ref([
    {
        name: '后台首页',
        path: '/',
    },
])

// 初始化tab导航列表
function initTabList(){
let tabs=cookit.get("tabsList")
if(tabs){
    tabsList.value=tabs
}
}
 initTabList()

// 添加标签tab导航
function addTab(tab) {
    //点击路由过滤相同路由
    let noTab = tabsList.value.findIndex(e => e.path == tab.path) == -1

    if (noTab) {
        tabsList.value.push(tab)
    }

    cookit.set('tabsList',tabsList.value)
}


onBeforeRouteUpdate((to, from) => {
    //点击触发
    tabsActive.value=to.path

    //添加选中tabs导航
    addTab({
        name: to.meta.title,
        path: to.path
    })
})
const changeTab=(t)=>{
  tabsActive.value=t
  router.push(t)
  
}

const removeTab = (t) => {
  let a=tabsActive.value
  let tabs=tabsList.value
  if(a==t){
    tabs.forEach((tab,index)=>{
       if(tab.path==t){
          const nextTab=tab[index+1]||tabs[index-1]
          if(nextTab){
            a=nextTab.path  
            console.log(nextTab);
            router.push(nextTab.path)
          }
       }
    })
  }
  tabsActive.value=a
  tabsList.value=tabsList.value.filter(v=>v.path !=t)
  cookit.set('tabsList',tabsList.value)
}

</script>
<style scoped>
.f-tabs {
    height: 44px !important;
    position: fixed;
    top: 64px;
    right: 0;
    z-index: 100;
    @apply bg-gray-100 flex items-center px-3;
}

.f-dra-btn {
    /* width: 32px;  */
    margin-left: auto;
    @apply bg-white flex justify-center items-center p-2;
}

::v-deep .el-tabs__header {
    margin: 0 !important;
}

::v-deep .el-tabs__nav {
    border: 0 !important;
}

::v-deep .el-tabs__item {
    height: 32px;
    line-height: 32px;
    @apply bg-white mx-1 rounded;
}

::v-deep .el-tabs__nav-prev {
    height: 32px !important;
    line-height: 32px;
}

::v-deep .el-tabs__nav-next,
.el-tabs__nav-prev {
    height: 32px !important;
    line-height: 32px;
}
</style>