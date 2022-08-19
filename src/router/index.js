// 该文件用于创建整个应用的路由器
import VueRouter from 'vue-router'
import login from "@/components/login";
import naviMain from "@/components/navi-main";
import register from "@/components/register";
import messageBox from "element-ui/packages/message-box";
import forgetPass from "@/components/forget-pass";
import changePass from "@/components/change-pass";
import deleteAccount from "@/components/delete-account";
import restoreAccount from "@/components/restore-account";
import notFound from "@/components/404"

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: '*',
      component: notFound,
      meta: {title: "页面走丢了 - 冰清起始页"}
    },
    {
      path: '/',
      name: 'naviMain',
      component: naviMain,
      meta: {title: "冰清起始页"}
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {title: "登录 - 冰清起始页"},
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
      component: register,
      meta: {title: "注册 - 冰清起始页"}
    },
    {
      path: '/forgetPass',
      name: 'forgetPass',
      component: forgetPass,
      meta: {title: "忘记密码 - 冰清起始页"}
    },
    {
      path: '/changePass',
      name: 'changePass',
      component: changePass,
      meta: {title: "修改密码 - 冰清起始页"}
    },
    {
      path: '/deleteAccount',
      name: 'deleteAccount',
      component: deleteAccount,
      meta: {title: "注销（删除）账号 - 冰清起始页"}
    },
    {
      path: '/restoreAccount',
      name: 'restoreAccount',
      component: restoreAccount,
      meta: {title: "恢复账号 - 冰清起始页"}
    }
  ]
})
//全局后置路由守卫——初始化和每次路由切换后调用
router.afterEach((to, from)=>{
  document.title = to.meta.title || "冰清 Starter"
})

export default router
