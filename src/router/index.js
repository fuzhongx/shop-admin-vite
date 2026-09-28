import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/pages/404.vue";
import Index from "@/pages/index.vue";
import Login from "@/pages/login.vue";
import Admin from "@/layouts//admin.vue";

const routes = [
  {
    path: "/",
    name: "admin",
    component: Admin,
  },
  {
    path: "/login",
    component: Login,

    meta: {
      title: "登录页",
    },
  },

  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const asyncRouter = [
  {
    path: "/",
    name: "/",
    component: Index,
    meta: {
      title: "后台首页",
    },
  },
  {
    path: "/goods/list",
    name: "/goods/list",
    component: () => import("@/pages/goods/list.vue"),
    meta: {
      title: "商品管理",
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function addRouters(meuns) {
  let hasNewRoutes = false; //设定一个值判断是否有新路由
  const findAddRouterNemus = (arr) => {
    arr.forEach((e) => {
      //查找路径是否一样，返回相同路径的数据
      let item = asyncRouter.find((o) => o.path == e.frontpath);

      //并且判断是否注册过路由，获取到路径相同并且未注册的路由数据
      if (item && !router.hasRoute(item.path)) {
        // 动态添加路由
        router.addRoute("admin", item);
        hasNewRoutes = true;
      }

      //   判断是否存在子集
      if (e.child && e.child.length > 0) {
        findAddRouterNemus(e.child);
      }
    });
  };
  findAddRouterNemus(meuns);
  console.log(router.getRoutes());
  return hasNewRoutes
}
