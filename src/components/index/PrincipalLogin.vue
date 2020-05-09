<template>
    <div>
        <h3>
            PrincipalLogin组件
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
                this.$router.push({path: '/principalHome'});
            }
        }
    }
</script>
<style scoped></style>
