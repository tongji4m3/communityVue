<!--有前端验证注册信息是否合理-->
<template>
    <body id="poster">
    <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules"
             class="login-container" label-position="left"
             label-width="0px">
        <h3 class="login_title">注册</h3>
        <el-form-item  prop="number">
            <el-input v-model="registerForm.number" placeholder="学号"></el-input>
        </el-form-item>
        <el-form-item  prop="username">
            <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
            <el-input type="password" v-model="registerForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item  prop="confirmPassword">
            <el-input type="password" v-model="registerForm.confirmPassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="register">注册
            </el-button>
        </el-form-item>
    </el-form>
    </body>
</template>

<script>
    export default {
        data()
        {
            let checkPassword = (rule, value, cb) =>
            {
                const regPassword = /^\w{6,15}$/;
                if (regPassword.test(value))
                {
                    //合法密码
                    return cb();
                }
                cb(new Error("密码必须在6-15个字符之间,只能由大小写字母数字下划线组成"));

            };
            let checkConfirmPassword = (rule, value, cb) =>
            {
                const regPassword = this.registerForm.password;
                if (regPassword === value)
                {
                    //合法密码
                    return cb();
                }
                cb(new Error("前后两次输入的密码必须一致!"));

            };
            let checkNumber = (rule, value, cb) =>
            {
                const regNumber = /^\d{7}$/;
                if (regNumber.test(value))
                {
                    //合法密码
                    return cb();
                }
                cb(new Error("学号必须是7位数字!"));

            };

            return {
                //登录表单数据绑定
                registerForm: {
                    number: '',
                    username: '',
                    password: '',
                    confirmPassword: ''
                },
                //表单的验证规则
                registerFormRules: {
                    //    验证用户名是否合法
                    number: [
                        {required: true, message: "请输入学号", trigger: "blur"},
                        {validator: checkNumber, trigger: "blur"}
                    ],
                    //    验证用户名是否合法
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"},
                        {min: 3, max: 10, message: "用户名必须在3-10个字符之间", trigger: "blur"}
                    ],
                    //    验证密码是否合法
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {validator: checkPassword, trigger: "blur"}
                    ],
                    confirmPassword: [
                        {required: true, message: "请再次确认密码", trigger: "blur"},
                        {validator: checkConfirmPassword, trigger: "blur"}
                    ],

                }
            }
        },
        //回车注册操作
        created()
        {
            //创建后挂载
            let _this = this;

            document.onkeydown = function (e)
            {

                let key = window.event.keyCode;

                if (key === 13)
                {
                    _this.register();//注册
                }
            }

        },
        methods: {
            //异步操作
            //根据status判断是否注册成功,成功跳转页面,失败显示msg在合适的地方
            register()
            {
                this.$refs.registerFormRef.validate(async valid =>
                {
                    if (!valid) return;

                    let msg = "";
                    let status = 200;

                    let result = await this.$http.post(this.$api.RegisterUrl,
                        {
                            number: this.registerForm.number,
                            username: this.registerForm.username,
                            password: this.registerForm.password,
                        }).catch(function (error)
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
                        this.$router.push({path: '/studentLogin'}, onComplete =>
                        {
                        }, onAbort =>
                        {
                        })
                    }
                })
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
