<template>

    <!--    页面布局-->
    <el-container class="home-container">
        <!--        头部区域-->
        <el-header>
            <div>
                <img src="../assets/img/sys_logo.png" @click="goIndex" height="60"/>
            </div>
            <div class="out-button">
                <el-dropdown>
                    <el-badge is-dot class="item" :hidden="showDot">
                        <el-avatar :src="imgUrl"><span class="el-dropdown-link" style="margin-right: 15px">
                         </span></el-avatar>
                    </el-badge>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="navigation-text" id="username-div">{{username}}</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native="changePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native="systemInformation">
                            <el-badge value="new" class="item" :hidden="showDot">系统消息</el-badge>
                        </el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native="systemNotice">
                            <el-badge value="new" class="item" :hidden="showDot">系统公告</el-badge>
                        </el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native="goIndex">回到首页</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" id="exit-div" divided @click.native="logout">退出
                        </el-dropdown-item>
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
                    <el-menu-item index="/principleWelcome">
                        <i class="el-icon-s-home"></i>
                        负责人首页
                    </el-menu-item>
                    <el-menu-item index="/principalClubInfo">
                        <i class="el-icon-s-shop"></i>
                        社团信息
                    </el-menu-item>
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
                        <i class="el-icon-star-on"></i>
                        赞助申报
                    </el-menu-item>
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
        data()
        {
            return {
                showDot: false,
                username: window.sessionStorage.getItem('name'),
                // imgUrl: 'https://tongji4m3.oss-cn-beijing.aliyuncs.com/f_f_object_156_s512_f_object_156_0.png'
                imgUrl: window.sessionStorage.getItem('imgUrl'),

            }
        },
        mounted()
        {
            this.$nextTick(() =>
            {
                setInterval(this.CurentTime, 1000);
            })
        },
        methods: {
            CurentTime()
            {
                let loginTime = window.sessionStorage.getItem('loginTime');
                if (loginTime!=null && new Date().getTime() - loginTime > 7200000)//2*60*60*1000 两小时
                {
                    this.$message.success("太久未登录,强制退出!");
                    this.logout();
                }
            },
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
                this.showDot = true;
                this.$router.push("/principalSystemInformation")
            },
            systemNotice()
            {
                this.showDot = true;
                this.$router.push("/principalSystemNotice")
            },
            goIndex()
            {
                this.$router.push("/index")
            },
            handleCommand(command)
            {
                this.showDot = true;
            }
        }
    };
</script>

<style scoped>
    #clock {
        color: white;
        margin-right: 30px;
    }

    .navigation-text {


    }

    #username-div {
        font-size: 20px;
        font-weight: bold;
        font-family: 楷体;
    }

    #exit-div {
        text-align: center;
        font-weight: bold;
    }

    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: rgb(43, 43, 43);
        display: flex;
        justify-content: space-between;
        margin-left: 0;
        padding-left: 0;

    }

    .el-aside {
        /*background-color: gray;*/
        background-color: rgb(239, 239, 239);
    }

    .el-main {
        /*background-color: lightgoldenrodyellow;*/
        background-color: rgb(255, 255, 255);
    }

    .out-button {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

</style>
