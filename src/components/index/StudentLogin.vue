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
                    username: 'zhangsan',
                    password: '123'
                }
            }
        },
        methods:{
            login()
            {
                //登录成功,进入下一个页面,不成功提示,并且还在本页面
                this.$router.push({path: '/studentHome'});
            }
        }
        // methods: {
        //     //异步操作
        //     async login(){
        //         let result=await this.$http.post(this.$api.IndexUrl,this.loginForm);
        //         status = result.data.status;
        //         console.log(status);
        //         if(!status)
        //         {
        //             //说明为null,undefined之类的
        //         }
        //         else
        //         {
        //             window.sessionStorage.setItem('token', result.data.id);
        //             if(status==="true")
        //             {
        //                 await this.$router.push({path: '/home'});
        //             }
        //             else
        //             {
        //                 await this.$router.push({path: '/login'});
        //             }
        //         }
        //     }
        // }
    }
</script>
<style scoped></style>
