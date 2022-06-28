// 该文件用于创建整个应用的路由器
import VueRouter from 'vue-router'
import login from "@/components/login";
import naviMain from "@/components/navi-main";
import register from "@/components/register";

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'naviMain',
      component: naviMain,
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
  ]

})
