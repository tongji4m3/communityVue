<template>

    <!--    页面布局-->
    <el-container class="home-container">
        <!--        头部区域-->
        <el-header>
            <div>
                <img src="../assets/img/sys_logo.png" @click ="goIndex"  height="60"/>
            </div>
            <div class="out-button">
                <el-dropdown>

                    <span class="el-dropdown-link" style="margin-right: 15px">
                        <el-badge is-dot class="item" :hidden="showDot">
                            <el-avatar :src="imgUrl"></el-avatar>
                        </el-badge>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="navigation-text" id="username-div">{{username}}</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native ="changePassword" >修改密码</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native ="systemInformation">
                            <el-badge value="new" class="item" :hidden="showDot">系统消息</el-badge></el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native ="systemNotice">
                            <el-badge value="new" class="item" :hidden="showDot">系统公告</el-badge></el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native ="goIndex">回到首页</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" id="exit-div" divided @click.native ="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <!--        页面主体-->
        <el-container>
            <!--            侧边栏-->
            <el-aside width="170px">
                <el-menu router
                         background-color="rgb(239,239,239)" text-color="rgb(43,43,43)" active-text-color="#409EFF">
                        <el-menu-item index="/StudentWelcome">
                            <i class="el-icon-s-home"></i>
                            学生首页
                        </el-menu-item>
                        <el-menu-item index="/studentInformation">
                            <i class="el-icon-s-shop"></i>
                            个人信息管理
                        </el-menu-item>
                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-menu"></i>信息查询</template>
                            <el-menu-item-group>
                                <el-menu-item index="/studentCorporations">社团信息查询</el-menu-item>
                                <el-menu-item index="/joinActivity">活动信息查询</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
<!--                        <el-menu-item index="/studentCorporations">-->
<!--                            <i class="el-icon-menu"></i>-->
<!--                            社团信息查询-->
<!--                        </el-menu-item>-->
<!--                        -->
<!--                        <el-menu-item index="/joinActivity">-->
<!--                            <i class="el-icon-s-custom"></i>-->
<!--                            活动信息查询-->
<!--                        </el-menu-item>-->
                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-s-custom"></i>已加入</template>
                            <el-menu-item-group>
                                <el-menu-item index="/joinCorporations">已加入社团</el-menu-item>
                                <el-menu-item index="/InActivity">已参加活动</el-menu-item>
                            </el-menu-item-group>
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
                // username: window.sessionStorage.getItem('name')
                informationList: [],
                username: window.sessionStorage.getItem('name'),
                imgUrl: window.sessionStorage.getItem('imgUrl'),
                showDot: false,
            }
        },
        created()
        {
            //this.getCorporationsList();
            this.getCorporationList();
        },
        methods: {
            //退出按钮
            async getCorporationList()
            {
                let result = await this.$http.post(this.$api.StudentGetInformation,
                    {
                    });
                this.informationList = result.data;
                console.log(this.informationList);
                this.totalCount = parseInt(result.data.totalCount);
                console.log(this.totalCount);
                this.username=this.informationList[0].name;
            },
            handleCommand(command)
            {
                this.showDot = true;
            },

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
                this.showDot = true;
                this.$router.push("/studentSystemInformation")
            },
            systemNotice()
            {
                this.showDot = true;
                this.$router.push("/studentSystemNotice")
            },
            goIndex()
            {
                this.$router.push("/index")
            }
        }
    };
</script>

<style scoped>
    .navigation-text{


    }

    #username-div{
        font-size: 20px;
        font-weight:bold;
        font-family: 楷体;
    }

    #exit-div{
        text-align: center;
        font-weight:bold;
    }
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

    .el-icon-arrow-down {
        font-size: 12px;
    }

</style>
