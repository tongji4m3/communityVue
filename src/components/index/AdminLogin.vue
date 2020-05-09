<template>
    <div>
        <h3>
            AdminLogin组件
            <el-button type="primary" @click="login">登录</el-button>
        </h3>
    </div>
</template>

<script>
    export default {
        data()
        {
            return {}
        },
        methods: {
            login()
            {
                this.$router.push({path: '/AdminHome'});
            }
        }
    }
</script>
<style scoped></style>
