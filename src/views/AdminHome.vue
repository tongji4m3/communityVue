<template>
    <!--    页面布局-->
    <el-container class="home-container">
        <!--        头部区域-->
        <el-header>
            <div>
                <img src="../assets/img/sys_logo.png" height="60"/>
            </div>
            <div class="out-button">
                <el-dropdown>
                    <span class="el-dropdown-link" style="margin-right: 15px">

                         <el-avatar :src="imgUrl"></el-avatar>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="navigation-text" id="username-div">{{username}}</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native ="changePassword" >修改密码</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native ="systemInformation">系统消息</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native ="systemNotice">系统公告</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native ="goIndex">回到首页</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" id="exit-div" divided @click.native ="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <!--        页面主体-->
        <el-container>
            <!--            侧边栏-->
            <el-aside width="150px">
                <el-menu router
                         background-color="rgb(239,239,239)" text-color="rgb(43,43,43)" active-text-color="#409EFF">
                    <el-menu-item index="/adminWelcome">
                        <i class="el-icon-s-home"></i>
                        管理员首页
                    </el-menu-item>
                    <el-menu-item index="/adminNotice">
                        <i class="el-icon-s-shop"></i>
                        系统公告管理
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-menu"></i>管理</template>
                        <el-menu-item index="/adminStudent">学生管理</el-menu-item>
                        <el-menu-item index="/adminInformation">社团管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-s-check"></i>审核</template>
                        <el-menu-item index="/adminCheckActivity">活动审核</el-menu-item>
                        <el-menu-item index="/adminCheckSponsor">赞助审核</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!--            右侧内容主体-->
            <el-main style="padding-left: 35px">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data(){
            return{
                username: window.sessionStorage.getItem('name'),
                imgUrl: window.sessionStorage.getItem('imgUrl'),
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
        background-color: rgb(43,43,43);
        display: flex;
        justify-content: space-between;
        margin-left: 0;
        padding-left: 0;

    }

    .el-aside {
        background-color: rgb(239,239,239);
    }

    .el-main {
        background-color: rgb(255,255,255);
    }

    .out-button{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

</style>
