<template>
    <body id="poster">
    <el-form ref="changeFormRef" :model="changeForm" :rules="changeFormRules" class="login-container" label-position="left"
             label-width="0px">
        <h3 class="login_title">修改密码</h3>
        <el-form-item prop="prePassword">
            <el-input type="password" v-model="changeForm.prePassword" auto-complete="off" placeholder="当前密码"></el-input>
        </el-form-item>

        <el-form-item prop="newPassword">
            <el-input type="password" v-model="changeForm.newPassword" auto-complete="off" placeholder="新密码"></el-input>
        </el-form-item>

        <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="changePassword">修改
            </el-button>
        </el-form-item>
    </el-form>
    </body>
</template>

<script>
    export default {
        data()
        {
            return {
                //登录表单数据绑定
                changeForm: {
                    prePassword: '',
                    newPassword: ''
                },
                //表单的验证规则
                changeFormRules: {
                    //    验证用户名是否合法
                    prePassword: [
                        {required: true, message: "请输入原来的密码", trigger: "blur"},
                        {min: 6, max: 15, message: "密码必须在6-15个字符之间", trigger: "blur"}
                    ],
                    //    验证密码是否合法
                    newPassword: [
                        {required: true, message: "请输入新密码", trigger: "blur"},
                        {min: 6, max: 15, message: "密码必须在6-15个字符之间", trigger: "blur"}
                    ],

                }
            }
        },
        //回车修改密码操作
        created()
        {
            //创建后挂载
            let _this = this;

            document.onkeydown = function (e)
            {

                let key = window.event.keyCode;

                if (key === 13)
                {
                    _this.changePassword();//修改密码
                }
            }

        },
        methods: {
            //异步操作
            changePassword()
            {
                this.$refs.changeFormRef.validate(async valid =>
                {
                    if (!valid) return;

                    let msg = "";
                    let status = 200;

                    let result = await this.$http.post(this.$api.ChangePasswordUrl, this.changeForm)
                        .catch(function (error)
                        {
                            if (error.response)
                            {
                                status = error.response.status;
                                msg = error.response.data.msg;
                            }
                        });

                    if(status===200)
                    {
                        this.$message.info("修改密码成功!");
                        //重新登录
                        window.sessionStorage.clear();
                        this.$router.push("/login");
                    }
                    else
                    {
                        this.$message.info(msg);
                    }
                });


            }
        }
    }
</script>
<style scoped>
    #poster {
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }

    body {
        margin: 0px;
        padding: 0;
    }

    .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .login_title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
</style>

