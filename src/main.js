import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入ElementUI相关内容
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入全局样式表
import "./assets/css/global.css"

//全局axios配置
import axios from 'axios'
//拦截器
axios.interceptors.request.use(config=>{
  //发送请求前,会发送一个token
  config.headers.authorization = window.sessionStorage.getItem('token');
  return config;
})
Vue.prototype.$http=axios
//全局api
import api from './assets/config/api.js'
Vue.prototype.$api=api


Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
