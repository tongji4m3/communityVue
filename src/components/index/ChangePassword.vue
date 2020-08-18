<template>
    <div class="login_container">
        <div class="login_box">
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="80px">
                <el-form-item label="旧密码:" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="新密码:" prop="password">
                    <el-input type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-row style="margin-left: 600px">
                    <el-button type="primary" @click="login">确认</el-button>
                </el-row>

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
                loginFormRules: {
                    //    验证用户名是否合法
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"},
                        {min: 3, max: 10, message: "用户名必须在3-10个字符之间", trigger: "blur"}
                    ],
                    //    验证密码是否合法
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {min: 6, max: 15, message: "密码必须在6-15个字符之间", trigger: "blur"}
                    ],

                }
            }
        },
        methods: {
            //异步操作
            login()
            {
                this.$refs.loginFormRef.validate(async valid =>
                {
                    if (!valid) return;

                    let msg = "";
                    let status = 200;

                    let result = await this.$http.post(this.$api.LoginUrl, this.loginForm)
                        .catch(function (error)
                        {
                            if (error.response)
                            {
                                status = error.response.status;
                                msg = error.response.data.msg;
                            }
                        });

                    if (status === 400)
                    {
                        this.$message.info(msg);
                    } else
                    {
                        let userType = result.data.userType;
                        let newToken = "bearer " + result.data.token;
                        window.sessionStorage.setItem('token', newToken);

                        if (userType === 0)
                        {
                            let result1 = await this.$http.post(this.$api.getStudentNameUrl);
                            window.sessionStorage.setItem('name', result1.data.name);
                            await this.$router.push({path: '/studentHome'});
                        }
                        else if (userType === 1)
                        {
                            let result1 = await this.$http.post(this.$api.getClubNameUrl);
                            window.sessionStorage.setItem('name', result1.data.name);
                            await this.$router.push({path: '/principalHome'});
                        }
                        else
                            await this.$router.push({path: '/adminHome'});
                    }
                });


            }
        }
    }
</script>
<style scoped></style>

