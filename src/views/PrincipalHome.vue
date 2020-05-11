<template>

    <!--    页面布局-->
    <el-container class="home-container">
        <!--        头部区域-->
        <el-header>
            <div>
                {{username}}
            </div>
            <el-button @click="logout">退出</el-button>
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
        }
    };
</script>

<style scoped>
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: orange;
        display: flex;
        justify-content: space-between;
    }

    .el-aside {
        background-color: gray;
    }

    .el-main {
        background-color: pink;
    }
</style>
