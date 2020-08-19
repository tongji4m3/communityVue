import Vue from 'vue'
import VueRouter from 'vue-router'

//index页面和他的组件
import Index from '../views/Index'
import Welcome from '../components/index/Welcome'
import Login from '../components/index/Login'
import StudentRegister from '../components/index/StudentRegister'
import ChangePassword from '../components/index/ChangePassword'
import SystemInformation from '../components/index/SystemInformation'
import SystemNotice from '../components/index/SystemNotice'

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
import PrincipalChange from '../components/principalHome/PrincipalChange'
import PrincipalNotice from '../components/principalHome/PrincipalNotice'
import PrincipalMember from '../components/principalHome/PrincipalMember'
import PrincipalCheckJoin from '../components/principalHome/PrincipalCheckJoin'
import PrincipalCheckActivity from '../components/principalHome/PrincipalCheckActivity'
import PrincipalSponsor from '../components/principalHome/PrincipalSponsor'
import principalClubInfo from '../components/principalHome/PrincipalClubInfo'

import AdminHome from '../views/AdminHome'
import AdminWelcome from '../components/adminHome/AdminWelcome'
import AdminSystem from '../components/adminHome/AdminSystem'
import AdminStudent from '../components/adminHome/AdminStudent'
import AdminInformation from '../components/adminHome/AdminInformation'
import AdminCheckActivity from '../components/adminHome/AdminCheckActivity'
import AdminCheckSponsor from '../components/adminHome/AdminCheckSponsor'
import JoinNewCorporation from "../components/studentHome/JoinNewCorporation";
import StudentActivities from "../components/studentHome/StudentActivities";



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
            {path: '/studentRegister', component: StudentRegister}
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
            {path: '/joinActivity', component: JoinActivity},
            {path: '/joinNewCorporation', component: JoinNewCorporation},
            {path:'/studentActivities',component: StudentActivities},
            {path: '/studentChangePassword', component: ChangePassword},
            {path: '/studentSystemInformation', component: SystemInformation},
            {path: '/studentSystemNotice', component: SystemNotice}
        ]
    },
    {
        path: '/principalHome',
        component: PrincipalHome,
        redirect:'/principleWelcome',
        children:[
            {path: '/principleWelcome', component: PrincipleWelcome},
            {path: '/principalActivity', component: PrincipalActivity},
            {path: '/principalChange', component: PrincipalChange},
            {path: '/principalNotice', component: PrincipalNotice},
            {path: '/principalMember', component: PrincipalMember},
            {path: '/principalCheckJoin', component: PrincipalCheckJoin},
            {path: '/principalCheckActivity', component: PrincipalCheckActivity},
            {path: '/principalSponsor', component: PrincipalSponsor},
            {path: '/principalClubInfo', component: principalClubInfo},

            {path: '/principalChangePassword', component: ChangePassword},
            {path: '/principalSystemInformation', component: SystemInformation},
            {path: '/principalSystemNotice', component: SystemNotice}
        ]

    },
    {
        path: '/adminHome',
        component: AdminHome,
        redirect:'/adminWelcome',
        children:[
            {path: '/adminWelcome', component: AdminWelcome},
            {path: '/adminSystem', component: AdminSystem},
            {path: '/adminStudent', component: AdminStudent},
            {path: '/adminInformation', component: AdminInformation},
            {path: '/adminCheckActivity', component: AdminCheckActivity},
            {path: '/adminCheckSponsor', component: AdminCheckSponsor},

            {path: '/adminChangePassword', component: ChangePassword}
        ]
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
