/**
 * 该文件为创建Vuex的核心组件
 */
import Vue from 'vue';
import Vuex from 'vuex';
import theme from "@/store/theme";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    theme: theme
  }
})

