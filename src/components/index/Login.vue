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
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            //异步操作
            async login(){
                let result=await this.$http.post(this.$api.LoginUrl,this.loginForm);
                status = result.data.status;
                console.log(result.data);
                if(!status || status!=="200")
                {
                    this.$message.info("登陆失败");
                }
                else
                {
                    let userType = result.data.userType;
                    window.sessionStorage.setItem('token', result.data.token);
                    window.sessionStorage.setItem('username', result.data.username);
                    if(userType==="student")
                    await this.$router.push({path: '/studentHome'});
                    else if(userType==="admin")
                        await this.$router.push({path: '/adminHome'});
                    else
                        await this.$router.push({path: '/principalHome'});
                }
            }
        }
    }
</script>
<style scoped></style>
