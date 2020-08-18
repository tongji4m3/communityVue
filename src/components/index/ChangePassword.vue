<template>
    <div>
        <el-form ref="changeFormRef" :model="changeForm" :rules="changeFormRules" label-width="80px">
            <el-form-item label="当前密码:" prop="prePassword">
                <el-input type="password" v-model="changeForm.prePassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码:" prop="newPassword">
                <el-input type="password" v-model="changeForm.newPassword"></el-input>
            </el-form-item>
            <el-button type="primary" @click="changePassword">修改密码</el-button>
        </el-form>
    </div>
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
<style scoped></style>

