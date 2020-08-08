<template>
    <el-container class="index-container">
        <!--        上边框-->
        <el-header >
            <!--            开启了路由模式-->
            <el-menu router
                     class="el-menu-demo" mode="horizontal" background-color="rgb(34,34,34)"
                     text-color="#fff" active-text-color="#ffd04b">

                <el-menu-item index="/login">登录</el-menu-item>
                <el-menu-item index="/studentRegister">学生注册</el-menu-item>
            </el-menu>
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
        background-color: rgb(43,43,43);

        display: flex;
        justify-content: space-between;
    }

    .el-main {
        /*background-color: rgb(239,239,239);*/
        background-color: rgb(255,255,255);
    }
</style>
