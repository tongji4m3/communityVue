<!--有前端验证注册信息是否合理-->

<template>
    <div class="login_container">
        <div class="login_box">
            <el-form :model="registerForm" label-width="80px">
                <el-form-item label="学号:">
                    <el-input  v-model="registerForm.id"></el-input>
                </el-form-item>
                <el-form-item label="用户名:">
                    <el-input v-model="registerForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码:">
                    <el-input type="password" v-model="registerForm.password"></el-input>
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
                }
            }
        },
        methods: {
            //异步操作
            //根据status判断是否注册成功,成功跳转页面,失败显示msg在合适的地方
            async register(){
                let result=await this.$http.post(this.$api.RegisterUrl,this.registerForm);
                status = result.data.status;
                //!status说明为null,undefined之类的
                if(!status||status!=="200")
                {
                    this.$message.info(result.data.msg);
                }
                else
                {
                    this.$router.push({path: '/studentLogin'});
                }
            }
        }
    }
</script>
<style scoped></style>
