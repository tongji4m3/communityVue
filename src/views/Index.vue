<template>
    <el-container class="index-container">
        <!--        上边框-->
        <el-header>
            <div>
                <img src="../assets/img/sys_logo.png" height="60"/>
            </div>
            <!--            开启了路由模式-->
            <el-menu v-if="!isLogin" router
                     class="el-menu-demo" mode="horizontal" background-color="rgb(43,43,43)"
                     text-color="rgb(255,255,255)" active-text-color="#0099FF" default-active="/Welcome">
                <el-menu-item index="/welcome">首页</el-menu-item>
                <el-menu-item index="/login">登录</el-menu-item>
                <el-menu-item index="/studentRegister">学生注册</el-menu-item>
            </el-menu>
            <div class="out-button" v-if="isLogin">
                <el-dropdown>
                    <span class="el-dropdown-link" style="margin-right: 15px">
                         <el-avatar :src="imgUrl"></el-avatar>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="navigation-text" id="username-div">{{name}}</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native="login()">登录</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native="register()">注册
                        </el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native="selfHome()">个人主页</el-dropdown-item>
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

<script>
    export default {
        data()
        {
            return {
                isLogin: false,
                name: window.sessionStorage.getItem('name'),
                imgUrl: window.sessionStorage.getItem('imgUrl'),
            };
        },
        created()
        {
            this.name = window.sessionStorage.getItem('name');
            this.imgUrl = window.sessionStorage.getItem('imgUrl');
            console.log(this.name)
            if (this.name != null)
            {
                this.isLogin = true;
            }
        },
        methods: {
            selfHome()
            {

                let userType = window.sessionStorage.getItem('userType');
                console.log(userType);
                if (userType === '0')
                {
                    this.$router.push({path: '/studentHome'});
                } else if (userType === '1')
                {
                    this.$router.push({path: '/principalHome'});
                } else
                    this.$router.push({path: '/adminHome'});
            },
            login()
            {
                this.$router.push("/login");
            },
            register()
            {
                this.$router.push("/studentRegister")
            }

        }

    };
</script>

<style scoped>
    #username-div {
        font-size: 20px;
        font-weight: bold;
        font-family: 楷体;
    }

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
