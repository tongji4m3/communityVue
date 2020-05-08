<template>
    <div class="login_container">
        <div class="login_box">
            <el-form :model="loginForm" label-width="80px">
                <el-form-item label="用户名:">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码:">
                    <el-input type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data()
        {
            return {
                //登录表单数据绑定
                loginForm: {
                    username: 'zhangsan',
                    password: '123'
                }
            }
        },
        methods: {
            async login(){
                let result=await this.$http.post(this.$api.IndexUrl,this.loginForm);
                console.log(result.data);
                window.sessionStorage.setItem('id', result.data.id);
                await this.$router.push({path: '/home'})
            }
        }
    }
</script>

<!--scoped使得样式只在本组件使用-->
<style scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: aliceblue;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>
