import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate, useRouter } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";

export function useTabList() {
  const cookie = useCookies();
  const route = useRoute();
  const router = useRouter();

  const tabsActive = ref(route.path);
  const tabsList = ref([
    {
      name: "后台首页",
      path: "/",
    },
  ]);

  // 初始化tab导航列表
  function initTabList() {
    let tabs = cookie.get("tabsList");
    if (tabs) {
      tabsList.value = tabs;
    }
  }
  initTabList();

  // 添加标签tab导航
  function addTab(tab) {
    //点击路由过滤相同路由
    let noTab = tabsList.value.findIndex((e) => e.path == tab.path) == -1;

    if (noTab) {
      tabsList.value.push(tab);
    }

    cookie.set("tabsList", tabsList.value);
  }

  //监听点击路由触发的路径
  onBeforeRouteUpdate((to, from) => {
    //点击触发
    tabsActive.value = to.path;

    //添加选中tabs导航
    addTab({
      name: to.meta.title,
      path: to.path,
    });
  });

  const changeTab = (t) => {
    tabsActive.value = t;
    router.push(t);
  };

  const removeTab = (t) => {
    let a = tabsActive.value;
    let tabs = tabsList.value;
    if (a == t) {
      tabs.forEach((tab, index) => {
        if (tab.path == t) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            a = nextTab.path;
          }
        }
      });
    }

    //调用触发和跳转
    changeTab(a);

    tabsList.value = tabsList.value.filter((v) => v.path != t);

    cookie.set("tabsList", tabsList.value);
  };

  const handleClose = (c) => {
    if (c == "clearAll") {
      // 1.触发为首页
      tabsActive.value = "/";
      // 2.将tabsList里面改为只剩下首页
      tabsList.value = [
        {
          name: "后台首页",
          path: "/",
        },
      ];
      // // 3.路由跳转到首页
      router.push("/");
    } else if (c == "clearOther") {
      // 1 保留首页和当前页
      tabsList.value = tabsList.value.filter(
        (v) => v.path == "/" || v.path == tabsActive.value,
      );
      console.log(tabsList.value, 11);

      // 2.将首页和当前页重新存储更新tabsList
      cookie.set("tabsList", tabsList.value);
      // 3.路由要跳转到当前页
      // router.push(tab.path)
    }
  };
  return {
    tabsActive,
    tabsList,
    changeTab,
    removeTab,
    handleClose
  };
}
