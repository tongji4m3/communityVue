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
            123
            <!--            搜索与添加-->

            <!--                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特点内容的活动-->
            <el-input placeholder="lyr is poisonous">

            </el-input>
        </el-card>

    </div>
</template>

<script></script>
<style scoped></style>