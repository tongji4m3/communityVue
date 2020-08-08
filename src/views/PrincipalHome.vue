<template>

    <!--    页面布局-->
    <el-container class="home-container">
        <!--        头部区域-->
        <el-header>
            <div>
                <img src="../assets/img/tj_logo.png" height=40/>
            </div>
<!--            <div class="header-name">-->
<!--                {{username}}-->
<!--            </div>-->
            <div class="out-button">
                <el-button @click="logout" size="medium">  退出</el-button>
            </div>
        </el-header>
        <!--        页面主体-->
        <el-container>
            <!--            侧边栏-->
            <el-aside width="200px">
                <el-menu router
                        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="/principalChange">负责人换届</el-menu-item>
                    <el-menu-item index="/principalNotice">公告管理</el-menu-item>
                    <el-menu-item index="/principalActivity">活动管理</el-menu-item>
                    <el-menu-item index="/principalMember">成员管理</el-menu-item>
                    <el-menu-item index="/principalCheckJoin">入社人员审核</el-menu-item>
                    <el-menu-item index="/principalCheckActivity">活动人员审核</el-menu-item>
                    <el-menu-item index="/principalSponsor">赞助申报</el-menu-item>
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
