<template>
    <div>
        <el-card class="box-card1" shadow="never">
            <div class="text1 item1" >

                <img src="../../assets/img/welcome.png" alt="" style="vertical-align: middle">
                <span> 欢迎回来 {{username}} ！</span>
            </div>
        </el-card>
        <el-card id="announce">
            <div id="announce_head">
                <img src="../../assets/img/icon_announcement.png" alt="" style="vertical-align: middle">
                <span> <h3>   系统公告</h3></span>
            </div>

            <el-divider></el-divider>
        </el-card >

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
    .text1 {
        font-size: 16px;
        /*color: #409EFF;*/
    }
    .box-card1 {
        width: 95%;
        height:40px;
        padding: 2px;
        margin: 10px;

        display: flex;
        align-items: center;
    }
    .box-card1 img{

        height:20px;
    }

    #announce{
        width: 95%;
        height:300px;
        padding: 2px;
        margin-left: 10px;
        margin-top: 30px;
        margin-right: 20px;
    }

    #announce_head{
        display: flex;
    }

    #announce_head img{
        height: 30px;
        margin-right: 10px;
    }
    
</style>
