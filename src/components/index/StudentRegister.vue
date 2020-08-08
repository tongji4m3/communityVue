<!--有前端验证注册信息是否合理-->

<template>
    <div class="login_container">
        <div class="login_box">
            <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="80px">
                <el-form-item label="学号:" prop="number">
                    <el-input v-model="registerForm.number"></el-input>
                </el-form-item>
                <el-form-item label="用户名:" prop="username">
                    <el-input v-model="registerForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                    <el-input type="password" v-model="registerForm.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" prop="confirmPassword">
                    <el-input type="password" v-model="registerForm.confirmPassword"></el-input>
                </el-form-item>
                <el-button type="primary" @click="register">注册</el-button>
            </el-form>
        </div>
    </div>
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
        methods: {
            //异步操作
            //根据status判断是否注册成功,成功跳转页面,失败显示msg在合适的地方
            register()
            {
                this.$refs.registerFormRef.validate(async valid =>
                {
                    if (!valid) return;

                    let msg="";
                    let status=200;

                    let result = await this.$http.post(this.$api.RegisterUrl,
                        {
                            number: this.registerForm.number,
                            username: this.registerForm.username,
                            password: this.registerForm.password,
                        }).catch(function (error)
                    {
                        if(error.response)
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
<style scoped></style>
