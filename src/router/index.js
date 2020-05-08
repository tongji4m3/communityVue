import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'Login',
    component: Login
},{
    path: '/home',
    name: 'Home',
    component: Home
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

// 挂载路由导航守卫
router.beforeEach((to, from, next) =>
{
    // to:要访问的路径
//    from从哪个路径来的
    //next代表放行
    if (to.path === '/login') return next();
//    获取token
     let id = window.sessionStorage.getItem("id");
    console.log(id);
    if (!id) return next("/login");
    else next();
});

export default router
