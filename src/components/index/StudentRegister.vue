<template>
    <div class="login_container">
        <div class="login_box">
            <el-form :model="registerForm" label-width="80px">
                <el-form-item label="用户名:">
                    <el-input v-model="registerForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码:">
                    <el-input type="password" v-model="registerForm.password"></el-input>
                </el-form-item>
                <el-form-item label="手机号:">
                    <el-input  v-model="registerForm.phone"></el-input>
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
                    username: 'zhangsan',
                    password: '123',
                    phone:"1254111124"
                }
            }
        },
        methods: {
            register()
            {
                //登录成功,进入下一个页面,不成功提示,并且还在本页面
                this.$router.push({path: '/studentLogin'});
            }
        }
    }
</script>
<style scoped></style>
