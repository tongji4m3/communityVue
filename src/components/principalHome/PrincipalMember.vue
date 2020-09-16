<template>
    <div>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/principleWelcome' }">负责人首页</el-breadcrumb-item>
            <el-breadcrumb-item>成员管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>
        <!--        卡片-->
        <el-card class="box-card">
            <!--            搜索与添加-->
            <el-row :gutter="20">
                <el-col :span="7">
                    <!--                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特点内容的成员-->
                    <el-input clearable @clear="getClubMembers" placeholder="请输入内容" v-model="query">
                        <el-button slot="append" icon="el-icon-search" @click="getClubMembers"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!--            成员列表 只展示一些成员信息,详细信息可在详情查看-->
            <el-table :data="memberList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="学号" prop="number"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="年级" prop="grade"></el-table-column>
                <el-table-column label="专业" prop="major"></el-table-column>
                <el-table-column label="电话" prop="phone"></el-table-column>
                <el-table-column label="删除成员">
                    <template slot-scope="scope">
                        <!--                        删除按钮-->
                        <el-button type="primary" @click="removeById(scope.row.studentId)"
                                   icon="el-icon-delete"></el-button>

                    </template>
                </el-table-column>

            </el-table>

            <!--            分页区域-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNumber"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
            </el-pagination>
        </el-card>

    </div>
</template>

<script>
    export default {
        data()
        {
            return {
                //    获取成员列表参数对象
                query: '',
                //当前的页码
                pageNumber: 1,
                //每页显示的条数
                pageSize: 5,

                //查询到的当页成员
                memberList: [],
                //总条数,用于分页的显示
                totalCount: 0,
                //添加,修改,展示成员对话框的显示与隐藏
                addDialogVisible: false,
                editDialogVisible: false,
                showDialogVisible: false,

                //添加成员表单数据
                addForm: {
                },
            }
        },
        //一开始就显示成员列表
        created()
        {
            this.getClubMembers();
        },
        methods: {
            async getClubMembers()
            {
                let result = await this.$http.post(this.$api.PrincipalGetClubMembers,
                    {
                        query: this.query,
                        pageNumber: this.pageNumber,
                        pageSize: this.pageSize,
                        status: true
                    });

                this.memberList = result.data.data;
                console.log(this.memberList)
                this.totalCount = parseInt(result.data.totalCount);
            },
            //监听pageSize改变的事件
            handleSizeChange(newSize)
            {
                this.pageSize = newSize;
                this.getClubMembers();
            },
            //监听pageNum改变的事件
            handleCurrentChange(newPage)
            {
                this.pageNumber = newPage;
                this.getClubMembers();
            },

            //根据ID删除对应信息
            async removeById(memberId)
            {
                //    弹框提示
                let confirmResult = await this.$confirm('此操作将永久删除该成员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err);
                //    如果选择不删除
                if (confirmResult !== "confirm")
                {
                    return this.$message.info("已经取消删除");
                } else
                {
                    await this.$http.post(this.$api.PrincipalDeleteClubMember + "/" + memberId);
                    this.$message.info("删除成功!");
                    await this.getClubMembers();
                }
            }
        }
    }
</script>

<style scoped>

</style>
