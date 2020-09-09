<template>
    <el-container class="index-container">
        <!--        上边框-->
        <el-header>
            <div>
                <img src="../assets/img/sys_logo.png" height="60"/>
            </div>
            <!--            开启了路由模式-->
            <el-menu router
                     class="el-menu-demo" mode="horizontal" background-color="rgb(43,43,43)"
                     text-color="rgb(255,255,255)" active-text-color="#0099FF" default-active="/Welcome">
                <el-menu-item index="/welcome">首页</el-menu-item>
                <el-menu-item index="/login">登录</el-menu-item>
                <el-menu-item index="/studentRegister">学生注册</el-menu-item>
            </el-menu>
            <div class="out-button">
                <el-dropdown>
                    <span class="el-dropdown-link" style="margin-right: 15px">

                         <el-avatar :src="imgUrl"></el-avatar>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="navigation-text" id="username-div">{{username}}</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native ="changePassword" >登录</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native ="systemInformation">注册</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native ="systemNotice">个人主页</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <!--        主体区域-->
        <el-main>
            <!--            路由占位符-->
            <router-view></router-view>

        </el-main>

    </el-container>

</template>

<script></script>

<style scoped>
    .index-container {
        height: 100%;
    }

    .el-header {
        /*background-color: rgb(255,255,255);*/
        background-color: rgb(43, 43, 43);
        display: flex;
        justify-content: space-between;
        margin-left: 0;
        padding-left: 0;
    }

    .el-main {
        /*background-color: rgb(239,239,239);*/
        background-color: rgb(255, 255, 255);
        margin: 0;

        padding: 0;
    }
</style>
