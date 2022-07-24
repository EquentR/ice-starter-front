import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import router from './router'

//引入elementUI组件库 完整引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueClipboard from 'vue-clipboard2';
import VueCropper from "vue-cropper";

Vue.use(VueClipboard)
//应用组件库
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueCropper)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router: router,
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
  },
}).$mount('#app')
