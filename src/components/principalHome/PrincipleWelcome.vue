<template>
    <div>
        <h3>PrincipleWelcome组件</h3>
        <el-card class="box-card" shadow="never">
            <div class="text item">

                <img src="../../assets/img/welcome.png" alt="">
                <span> 欢迎回来 {{username}} ！</span>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                username: window.sessionStorage.getItem('name')
            }
        }
    }
</script>

<style>

    *{
        margin: 0;
        padding: 0;
    }
    .text {
        font-size: 16px;
        /*color: #409EFF;*/
    }
    .box-card {
        width: 1050px;
        height:40px;
        padding: 2px;
        margin: 10px;

        position: relative;
    }
    .box-card img{
        position: relative;
        height:20px;
    }
    
</style>
