import Vue from 'vue'
import VueRouter from 'vue-router'

//index页面和他的组件
import Index from '../views/Index'
import Welcome from '../components/index/Welcome'
import Login from '../components/index/Login'
import StudentRegister from '../components/index/StudentRegister'

//studentHome页面和他的组件
import StudentHome from '../views/StudentHome'
import StudentInformation from '../components/studentHome/StudentInformation'
import StudentWelcome from '../components/studentHome/StudentWelcome'
import StudentCorporations from '../components/studentHome/StudentCorporations'
import JoinCorporations from '../components/studentHome/JoinCorporations'
import JoinActivity from '../components/studentHome/JoinActivity'

import PrincipalHome from '../views/PrincipalHome'
import PrincipleWelcome from '../components/principalHome/PrincipleWelcome'
import PrincipalActivity from '../components/principalHome/PrincipalActivity'

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
            {path: '/login', component: Login},
            {path: '/studentRegister', component: StudentRegister},
            ]
    },
    {
        path: '/studentHome',
        component: StudentHome,
        redirect:'/studentWelcome',
        children:[
            {path: '/studentInformation', component: StudentInformation},
            {path: '/studentWelcome', component: StudentWelcome},
            {path: '/studentCorporations', component: StudentCorporations},
            {path: '/joinCorporations', component: JoinCorporations},
            {path: '/joinActivity', component: JoinActivity}
        ]
    },
    {
        path: '/principalHome',
        component: PrincipalHome,
        redirect:'/principleWelcome',
        children:[
            {path: '/PrincipleWelcome', component: PrincipleWelcome},
            {path: '/principalActivity', component: PrincipalActivity}
        ]

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
router.beforeEach((to, from, next) =>
{
    // to:要访问的路径
    // from从哪个路径来的
    // next代表放行
    if (to.path === '/login' || to.path === '/studentRegister' || to.path === '/welcome')
    {
        return next();
    }
    else
    {
//    获取token
        let token = window.sessionStorage.getItem("token");
        if (!token) return next("/welcome");
        else return next();
    }
});

export default router
