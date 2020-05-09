<template>

    <!--    页面布局-->
    <el-container class="home-container">
        <!--        头部区域-->
        <el-header>
            <div>Hello World</div>
            <el-button @click="logout">退出</el-button>
        </el-header>
        <!--        页面主体-->
        <el-container>
            <!--            侧边栏-->
            <el-aside width="200px">
                <el-menu router
                         background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                        <el-menu-item index="1-1">个人信息管理</el-menu-item>
                        <el-menu-item index="1-1">社团信息查询</el-menu-item>
                        <el-menu-item index="1-1">加入社团</el-menu-item>
                        <el-menu-item index="1-1">参加活动</el-menu-item>
                </el-menu>
            </el-aside>
            <!--            右侧内容主体-->
            <el-main>主体内容</el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data(){
            return{
            }
        },
        methods: {
            //退出按钮
            logout()
            {
                //window.sessionStorage.clear();
                this.$router.push("/index")
            //     async getMenuList(){
            //     let result=await this.$http.post(this.$api.IndexUrl,this.loginForm);
            //     if(result.data.status==="true")
            //     {
            //         this.menulist = result.data.name;
            //         console.log(this.menulist);
            //     }
            // }
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
