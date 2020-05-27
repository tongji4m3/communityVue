<template>
    <div>
        <!--        面包屑 （导航区域)-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/studentWelcome' }">学生首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/joinActivity' }">参加活动</el-breadcrumb-item>
            <el-breadcrumb-item>参加新活动</el-breadcrumb-item>
        </el-breadcrumb>

        <!--        卡片-->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="7">
                    <!--                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特点内容的活动-->
                    <el-input clearable @clear="getActivityList" placeholder="请输入内容" v-model="QueryInfo.query">
                        <el-button slot="append" icon="el-icon-search" @click="getActivityList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="joinDialogVisible=true">参加活动</el-button>
                </el-col>
            </el-row>
            <el-table :data="activityList">
                <!--    用户能见表单-->
                <el-table-column type="index"></el-table-column>
                <!--                <el-table-column label="活动编号" prop="id"></el-table-column>-->
                <el-table-column label="活动名称" prop="name"></el-table-column>
                <!--                <el-table-column label="活动介绍" prop="description"></el-table-column>-->
                <!--                <el-table-column label="活动开销" prop="cost"></el-table-column>-->
                <!--                <el-table-column label="活动经费" prop="fund"></el-table-column>-->
                <el-table-column label="活动位置" prop="place"></el-table-column>
                <el-table-column label="活动时间" prop="time"></el-table-column>
                <el-table-column label="活动人数" prop="range"></el-table-column>
                <!--                <el-table-column label="活动申请时间" prop="apply_date"></el-table-column>-->
                <!--                <el-table-column label="活动审核状态" prop="status"></el-table-column>-->
                <!--                <el-table-column label="活动审核信息" prop="information"></el-table-column>-->

            </el-table>
        </el-card>

    </div>
</template>

<script>
export default {
    data(){
        return {
            //获取用户列表的参数对象
           QueryInfo:{
               query:'',
               //当前页码
               page_num:1,
               //每页显示的消息条数
               page_size:2
           },
            //查询到的当页活动
            activityList: [],
            //总页码数,用于分页的显示
            total: 0,
            //添加,修改,展示活动对话框的显示与隐藏
            joinDialogVisible: false,
            editDialogVisible: false,
            showDialogVisible: false,
        }
    },
    created(){
        this.getActivityList()
    },
    methods:{
        async getActivityList()
        {
            let result =await this.$http.post(this.$api.PrincipalGetActivityUrl, this.QueryInfo);
            console.log(result)
            if (result.data.status !== "200")
            {
                this.$message.info(result.data.msg);
            } else
            {
                this.activityList = result.data.activities;
                this.total = parseInt(result.data.total);
            }
        },

    }
}


</script>
<style scoped></style>