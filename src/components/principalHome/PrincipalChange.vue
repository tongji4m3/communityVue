<template>
    <div>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/principleWelcome' }">负责人首页</el-breadcrumb-item>
            <el-breadcrumb-item>负责人换届</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>
        <!--        卡片-->
        <el-card class="box-card">
            <!--            搜索与添加-->
            <el-row :gutter="20">
                <el-col :span="7">
                    <!--                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特点内容的成员-->
                    <el-input clearable @clear="getNextMembers" placeholder="请输入内容" v-model="query">
                        <el-button slot="append" icon="el-icon-search" @click="getNextMembers"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="showHistoryPrincipal">查看历史负责人</el-button>
                </el-col>
            </el-row>

            <!--            成员列表 详细信息可在详情查看-->
            <el-table :data="memberList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="学号" prop="number"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="年级" prop="grade"></el-table-column>
                <el-table-column label="专业" prop="major"></el-table-column>
                <el-table-column label="电话" prop="phone"></el-table-column>
                <el-table-column label="选为负责人">
                    <template slot-scope="scope">
                        <el-button type="success" @click="changeManager(scope.row.studentId)"
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

        <!--        查看历史负责人对话框-->
        <el-dialog title="历史负责人" :visible.sync="dialogVisible"
                   width="50%">
            <el-table :data="memberList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="学号" prop="number"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="年级" prop="grade"></el-table-column>
                <el-table-column label="专业" prop="major"></el-table-column>
                <el-table-column label="电话" prop="phone"></el-table-column>
            </el-table>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeDialog">确 定</el-button>
            </span>
        </el-dialog>
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
                pageSize: 2,

                //查询到的当页成员
                memberList: [],
                //总条数,用于分页的显示
                totalCount: 0,
                //添加,修改,展示成员对话框的显示与隐藏
                addDialogVisible: false,
                editDialogVisible: false,
                showDialogVisible: false,

                //添加成员表单数据
                addForm: {},
            }
        },
        //一开始就显示成员列表
        created()
        {
            this.getNextMembers();
        },
        methods: {
            async getNextMembers()
            {
                let result = await this.$http.post(this.$api.PrincipalGetNextMembers,
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
                this.getNextMembers();
            },
            //监听pageNum改变的事件
            handleCurrentChange(newPage)
            {
                this.pageNumber = newPage;
                this.getNextMembers();
            },

            //根据ID换届
            async changeManager(memberId)
            {
                //    弹框提示
                let confirmResult = await this.$confirm('此操作将该成员设为负责人, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err);
                //    如果选择不删除
                if (confirmResult !== "confirm")
                {
                    return this.$message.info("已经取消换届");
                } else
                {
                    await this.$http.post(this.$api.PrincipalChangeManager + "/" + memberId);
                    this.$message.info("换届成功!");
                    await this.getNextMembers();
                }
            },

            //查看历史负责人
            async showHistoryPrincipal()
            {
                this.dialogVisible = true;
                let result = await this.$http.post(this.$api.PrincipalGetHistoryPrincipalsUrl,
                    {
                        query: this.query,
                        pageNumber: this.pageNumber,
                        pageSize: this.pageSize,
                        status: true
                    });

                this.memberList = result.data.data;
            },
            closeDialog()
            {
                this.dialogVisible = false;
                this.getNextMembers();
            }
        }
    }
</script>
