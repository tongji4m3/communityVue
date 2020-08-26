<template>

    <!--    页面布局-->
    <el-container class="home-container">
        <!--        头部区域-->
        <el-header>
            <div>
                {{username}}
            </div>
            <el-button @click="changePassword" size="medium">修改密码</el-button>
            <el-button @click="logout">退出</el-button>
        </el-header>
        <!--        页面主体-->
        <el-container>
            <!--            侧边栏-->
            <el-aside width="200px">
                <el-menu router
                         background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="/adminSystem">社团制度</el-menu-item>
                    <el-menu-item index="/adminNotice">系统公告管理</el-menu-item>
                    <el-submenu index="1">
                        <template slot="title">社团管理</template>
                        <el-menu-item index="/adminStudent">社团学生管理</el-menu-item>
                        <el-menu-item index="/adminInformation">社团信息管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">社团审核</template>
                        <el-menu-item index="/adminCheckActivity">社团活动审核</el-menu-item>
                        <el-menu-item index="/adminCheckSponsor">社团赞助审核</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!--            右侧内容主体-->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data(){
            return{
                username: window.sessionStorage.getItem('username')
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
                this.$router.push("/adminChangePassword")
            }
        }
    };
</script>

<style scoped>
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: yellowgreen;
        display: flex;
        justify-content: space-between;
    }

    .el-aside {
        background-color: gray;
    }

    .el-main {
        background-color: lightgoldenrodyellow;
    }
</style>
