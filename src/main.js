import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//md5加密
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

//导入ElementUI相关内容
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入全局样式表
import "./assets/css/global.css"

//全局api
import api from './assets/config/api.js'
Vue.prototype.$api = api

//全局axios配置
import axios from 'axios'
Vue.prototype.$http = axios

//拦截器 发送请求前,会发送一个token
axios.interceptors.request.use(config =>
{
    config.headers.authorization = window.sessionStorage.getItem('token');
    return config;
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
