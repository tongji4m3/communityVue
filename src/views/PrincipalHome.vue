<template>

    <!--    页面布局-->
    <el-container class="home-container">
        <!--        头部区域-->
        <el-header>
            <div>
                <img src="../assets/img/sys_logo.png" height="60"/>
            </div>
<!--            <div class="header-name">-->
<!--                {{username}}-->
<!--            </div>-->
            <div class="out-button">
                <el-button @click="changePassword" size="medium" >修改密码</el-button>
                <el-button @click="systemInformation" icon="el-icon-message" type="text"></el-button>
                <el-button @click="systemNotice" size="medium">系统公告</el-button>
                <el-button @click="logout" size="medium">  退出</el-button>
            </div>
        </el-header>
        <!--        页面主体-->
        <el-container>
            <!--            侧边栏-->
            <el-aside width="150px">
                <el-menu router
                         background-color="rgb(239,239,239)" text-color="rgb(43,43,43)" active-text-color="#409EFF">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-menu"></i>管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="/principalNotice">公告管理</el-menu-item>
                            <el-menu-item index="/principalActivity">活动管理</el-menu-item>
                            <el-menu-item index="/principalMember">成员管理</el-menu-item>

                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-s-check"></i>审核</template>
                        <el-menu-item-group>
                            <el-menu-item index="/principalCheckJoin">入社人员审核</el-menu-item>
                            <el-menu-item index="/principalCheckActivity">活动人员审核</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="/principalChange">
                        <i class="el-icon-s-custom"></i>
                        换届
                    </el-menu-item>
                    <el-menu-item index="/principalSponsor">
                        <i class="el-icon-s-shop"></i>
                        赞助申报
                    </el-menu-item>
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
                this.$router.push("/principalChangePassword")
            },
            systemInformation()
            {
                this.$router.push("/principalSystemInformation")
            },
            systemNotice()
            {
                this.$router.push("/principalSystemNotice")
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
        /*background-color: gray;*/
        background-color: rgb(239,239,239);
    }

    .el-main {
        /*background-color: lightgoldenrodyellow;*/
        background-color: rgb(255,255,255);
    }

    .out-button{
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>
