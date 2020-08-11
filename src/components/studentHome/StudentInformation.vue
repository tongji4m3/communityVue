<template>
    <div>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/principleWelcome' }">学生首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人信息管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <!--            搜索与添加-->
            <el-row :gutter="20">
                <el-row :gutter="20">
                    <el-col :span="7">
                    </el-col>

                </el-row>
            </el-row>
            <!--            竖着展示信息，对应一个按钮修改-->
            <el-table :data="activityList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="学号" prop="place"></el-table-column>

            </el-table>

        </el-card>

    </div>
</template>


<script>

</script>

<style scoped></style>

