<template>
    <div class="login_container">
        <div class="login_box">
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="80px">
                <el-form-item label="用户名:" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password">
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
                },
                //表单的验证规则
                loginFormRules:{
                //    验证用户名是否合法
                    username:[
                        {required:true,message:"请输入用户名",trigger:"blur"},
                        {min:3,max:10,message:"用户名必须在3-10个字符之间",trigger:"blur"}
                    ],
                    //    验证密码是否合法
                    password:[
                        {required:true,message:"请输入密码",trigger:"blur"},
                        {min:6,max:15,message:"密码必须在6-15个字符之间",trigger:"blur"}
                    ],

                }
            }
        },
        methods: {
            //异步操作
            login(){
                this.$refs.loginFormRef.validate(async valid =>
                {
                    console.log(valid);
                    if(!valid) return;
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
                });

            }
        }
    }
</script>
<style scoped></style>
