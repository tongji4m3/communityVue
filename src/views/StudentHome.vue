<template>

    <!--    页面布局-->
    <el-container class="home-container">
        <!--        头部区域-->
        <el-header>
            <div>
                <img src="../assets/img/tj_logo.png" height=40/>
            </div>
<!--            <div>{{username}}</div>-->
            <div class="out-button">
                <el-button @click="changePassword" size="medium">修改密码</el-button>
                <el-button @click="systemInformation" size="medium">系统消息</el-button>
                <el-button @click="systemNotice" size="medium">系统公告</el-button>
                <el-button @click="logout" size="medium">退出</el-button>
            </div>
        </el-header>
        <!--        页面主体-->
        <el-container>
            <!--            侧边栏-->
            <el-aside width="200px">
                <el-menu router
                         background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                        <el-menu-item index="/studentInformation">个人信息管理</el-menu-item>
                        <el-menu-item index="/studentCorporations">社团信息查询</el-menu-item>
                        <el-menu-item index="/joinCorporations">已加入社团</el-menu-item>
                        <el-menu-item index="/joinActivity">参加活动</el-menu-item>
                        <el-menu-item index="/InActivity">已参加活动</el-menu-item>
                </el-menu>
            </el-aside>
            <!--            右侧内容主体-->
            <el-main>
                <!--            路由占位符-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data(){
            return{
                username: window.sessionStorage.getItem('name')
            }
        },
        methods: {
            //退出按钮
            logout()
            {
                window.sessionStorage.clear();
                this.$router.push("/index")
            },
            changePassword()
            {
                this.$router.push("/studentChangePassword")
            },
            systemInformation()
            {
                this.$router.push("/studentSystemInformation")
            },
            systemNotice()
            {
                this.$router.push("/studentSystemNotice")
            }
        }
    };
</script>

<style scoped>
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: rgb(64,158,255);
        display: flex;
        justify-content: space-between;
        margin-left: 0;
        padding-left: 0;

    }

    .el-aside {
        /*background-color: gray;*/
    }

    .el-main {
        /*background-color: lightgoldenrodyellow;*/
    }

    .out-button{
        display: flex;
        justify-content: center;
        align-items: center;
    }


    .header-name{
        display: flex;
        justify-content: center;
        align-items: center;

    }
</style>
