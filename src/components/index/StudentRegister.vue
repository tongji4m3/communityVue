<!--有前端验证注册信息是否合理-->

<template>
    <div class="login_container">
        <div class="login_box">
            <el-form  ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="80px">
                <el-form-item label="学号:" prop="id">
                    <el-input  v-model="registerForm.id" ></el-input>
                </el-form-item>
                <el-form-item label="用户名:" prop="username">
                    <el-input v-model="registerForm.username" ></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                    <el-input type="password" v-model="registerForm.password" ></el-input>
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
            return {
                //登录表单数据绑定
                registerForm: {
                    id:'',
                    username: '',
                    password: ''
                },
                //表单的验证规则
                registerFormRules:{
                    //    验证用户名是否合法
                    id: [
                        {required: true, message: "请输入学号", trigger: "blur"},
                        {min: 7, max: 7, message: "学号必须是7位数",trigger: "blur"}
                    ],
                    //    验证用户名是否合法
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"},
                        {min: 3, max: 10, message: "用户名必须在3-10个字符之间", trigger: "blur"}
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
            //根据status判断是否注册成功,成功跳转页面,失败显示msg在合适的地方
            register(){

                this.$refs.registerFormRef.validate(async valid =>
                {
                    console.log(valid);
                    if (!valid) return;

                    let result = await this.$http.post(this.$api.RegisterUrl, this.registerForm);
                    status = result.data.status;
                    //!status说明为null,undefined之类的
                    // if (!status || status !== "2010")
                    // {
                    //     this.$message.info(result.data.msg);
                    // } else
                    // {
                    //     this.$router.push({path: '/studentLogin'});
                    // }
                    this.$router.push({path: '/studentLogin'});
                })
            }
        }
    }
</script>
<style scoped></style>
