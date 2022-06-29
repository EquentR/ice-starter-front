// 该文件用于创建整个应用的路由器
import VueRouter from 'vue-router'
import login from "@/components/login";
import naviMain from "@/components/navi-main";
import register from "@/components/register";
import messageBox from "element-ui/packages/message-box";

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
      component: login,
      beforeEnter: (to, from, next)=>{
        if(localStorage.getItem('jwt') === null || localStorage.getItem('jwt') === '') {
          next()
        }else{
          messageBox.alert('你已经登录，不需要重复登录', '提示', {
            callback: () => {
              location.replace("/")
            }
          })
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
  ]

})
