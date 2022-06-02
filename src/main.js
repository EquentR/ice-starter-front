import Vue from 'vue'
import App from './App.vue'
import store from './store'

//引入elementUI组件库 完整引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard)
//应用组件库
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
