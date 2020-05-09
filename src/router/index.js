import Vue from 'vue'
import VueRouter from 'vue-router'

//index页面和他的组件
import Index from '../views/Index'
import Welcome from '../components/index/Welcome'
import StudentLogin from '../components/index/StudentLogin'
import PrincipalLogin from '../components/index/PrincipalLogin'
import AdminLogin from '../components/index/AdminLogin'
import StudentRegister from '../components/index/StudentRegister'
import PrincipalRegister from '../components/index/PrincipalRegister'

//studentHome页面和他的组件
import StudentHome from '../views/StudentHome'

import PrincipalHome from '../views/PrincipalHome'

import AdminHome from '../views/AdminHome'



Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/index',
        component: Index,
        //当访问index,自动重定向到welcome页面
        redirect: '/welcome',
        //index页面的一些子路由
        children: [
            {path: '/welcome', component: Welcome},
            {path: '/studentLogin', component: StudentLogin},
            {path: '/principalLogin', component: PrincipalLogin},
            {path: '/adminLogin', component: AdminLogin},
            {path: '/studentRegister', component: StudentRegister},
            {path: '/principalRegister', component: PrincipalRegister}
            ]
    },
    {
        path: '/studentHome',
        component: StudentHome
    },
    {
        path: '/principalHome',
        component: PrincipalHome
    },
    {
        path: '/adminHome',
        component: AdminHome
    },
]

const router = new VueRouter({
    routes
});

// 挂载路由导航守卫
// router.beforeEach((to, from, next) =>
// {
//     // to:要访问的路径
//     // from从哪个路径来的
//     //next代表放行
// //     if (to.path === '/login') return next();
// // //    获取token
// //      let token = window.sessionStorage.getItem("token");
// //     if (!token) return next("/login");
// //     else next();
//     next();
// });

export default router
