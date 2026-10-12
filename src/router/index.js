import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/pages/404.vue";
import Index from "@/pages/index.vue";
import Login from "@/pages/login.vue";
import Admin from "@/layouts/admin.vue";

// import accessList from '@/pages/access/list.vue'
// import categoryList from '@/pages/category/list.vue'
// import commentList from '@/pages/comment/list.vue'
// import couponList from '@/pages/coupon/list.vue'

// import distributionIndex from '@/pages/distribution/index.vue'
// import distributionSetting from '@/pages/distribution/setting.vue'

// import imageList from '@/pages/image/list.vue'
// import levelList from '@/pages/level/list.vue'
// import managerList from '@/pages/manager/list.vue'
// import noticeList from '@/pages/notice/list.vue'
// import orderList from '@/pages/order/list.vue'
// import roleList from '@/pages/role/list.vue'

// import settingBase from '@/pages/setting/base.vue'
// import settingBuy from '@/pages/setting/buy.vue'
// import settingShip from '@/pages/setting/ship.vue'

// import skusList from '@/pages/skus/list.vue'
// import userList from '@/pages/user/list.vue'


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
  {
    path: "/category/list",
    name: "/category/list",
    component: () => import("@/pages/category/list.vue"),
    meta: {
      title: "分类管理",
    },
  },{
    path: "/skus/list",
    name: "/skus/list",
    component: () => import("@/pages/skus/list.vue"),
    meta: {
      title: "规格管理",
    },
  },{
    path: "/coupon/list",
    name: "/coupon/list",
    component: () => import("@/pages/coupon/list.vue"),
    meta: {
      title: "优惠卷管理",
    },
  },{
    path: "/user/list",
    name: "/user/list",
    component: () => import("@/pages/user/list.vue"),
    meta: {
      title: "用户管理",
    },
  },{
    path: "/level/list",
    name: "/level/list",
    component: () => import("@/pages/level/list.vue"),
    meta: {
      title: "会员等级",
    },
  },{
    path: "/order/list",
    name: "/order/list",
    component: () => import("@/pages/order/list.vue"),
    meta: {
      title: "订单管理",
    },
  },{
    path: "/comment/list",
    name: "/comment/list",
    component: () => import("@/pages/comment/list.vue"),
    meta: {
      title: "评论管理",
    },
  },{
    path: "/manager/list",
    name: "/manager/list",
    component: () => import("@/pages/manager/list.vue"),
    meta: {
      title: "管理员权限",
    },
  },{
    path: "/access/list",
    name: "/access/list",
    component: () => import("@/pages/access/list.vue"),
    meta: {
      title: "权限管理",
    },
  },{
    path: "/role/list",
    name: "/role/list",
    component: () => import("@/pages/role/list.vue"),
    meta: {
      title: "角色管理",
    },
  },{
    path: "/setting/base",
    name: "/setting/base",
    component: () =>  import("@/pages/setting/base.vue"),
    meta: {
      title: "基础设置",
    },
  },{
    path: "/setting/buy",
    name: "/setting/buy",
    component: () => import("@/pages/setting/buy.vue"),
    meta: {
      title: "交易设置",
    },
  },{
    path: "/setting/ship",
    name: "/setting/ship",
    component: () => import("@/pages/setting/ship.vue"),
    meta: {
      title: "物流设置",
    },
  },{
    path: "/distribution/index",
    name: "/distribution/index",
    component: () => import("@/pages/distribution/index.vue"),
    meta: {
      title: "分销员管理",
    },
  },{
    path: "/distribution/setting",
    name: "/distribution/setting",
    component: () => import("@/pages/distribution/setting.vue"),
    meta: {
      title: "分销设置",
    },
  },{
    path: "/image/list",
    name:"/image/list",
    component: () => import("@/pages/image/list.vue"),
    meta: {
      title: "图库管理",
    },
  },{
    path: "/notice/list",
    name: "/notice/list",
    component: () => import("@/pages/notice/list.vue"),
    meta: {
      title: "公告管理",
    },
  }
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



  return hasNewRoutes
}
