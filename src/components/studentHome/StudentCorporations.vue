<template>
    <div>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/StudentWelcome' }">学生首页</el-breadcrumb-item>
            <el-breadcrumb-item>社团信息查询</el-breadcrumb-item>
        </el-breadcrumb>

        <!--        卡片-->
        <el-card class="box-card">
            <!--            搜索与添加-->
            <el-row :gutter="20">
                <el-col :span="7">
                    <!--                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特定内容的社团-->
                    <el-input clearable @clear="getCorporationList" placeholder="请根据社团名搜索社团" v-model="query">
                        <el-button slot="append" icon="el-icon-search" @click="getCorporationList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible=true">查询社团</el-button>
                </el-col>
            </el-row>
            <!--            活动列表 只展示一些活动信息,详细信息可在详情查看-->
            <el-table :data="corporationsList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="社团编号" prop="clubId"></el-table-column>
                <el-table-column label="社团名称" prop="name"></el-table-column>
                <el-table-column label="社团性质" prop="description"></el-table-column>
                <el-table-column label="成立时间" prop="establishmentDate"></el-table-column>
                <el-table-column label="会长"  prop="presidentName"></el-table-column>
                <el-table-column label="社团简介">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="showCorporationSummary(1)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--                        加入按钮-->
                        <!--<el-button type="primary" @click="showEditDialog(scope.row.id)" >加入</el-button>-->
                        <el-button type="primary">加入</el-button>
                    </template>
                </el-table-column>

            </el-table>

            <!--            分页区域-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
            </el-pagination>
        </el-card>

        <!--        展示活动对话框-->
        <el-dialog title="社团简介" ref="showFormRef" :visible.sync="showDialogVisible"
                   width="50%">
            <!--            展示内容主体区域 -->
            <el-form :model="addForm" label-width="150px">
                简介：
            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="closeDialogVisible">确 定</el-button>
  </span>
        </el-dialog>

        <!--        修改活动对话框-->
        <el-dialog title="提交申请" ref="editFormRef" :visible.sync="editDialogVisible"
                   width="50%">
            <el-form :model="addForm" label-width="150px">
                上传审核文件：
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelEdit">取 消</el-button>
                    <el-button type="primary" @click="editActivity">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data()
        {
            return {
                //    获取活动列表参数对象

                query: '',
                //当前的页码
                pageNum: 1,
                //每页显示的条数
                pageSize: 2,

                //查询到的当页活动
                corporationsList: [],
                //总页码数,用于分页的显示
                totalCount: 0,
                //添加,修改,展示活动对话框的显示与隐藏
                addDialogVisible: false,
                editDialogVisible: false,
                showDialogVisible: false,
                //添加活动表单数据
                addForm: {
                    summary: "",
                },
            }
        },
        //一开始就显示活动列表
        created()
        {
            //this.getCorporationsList();
            this.getCorporationList();
        },
        methods: {
            async getCorporationList()
            {
                let result = await this.$http.post(this.$api.StudentCorporationsUrl,
                    {
                    query: this.query,
                    pageNumber: this.pageNum,
                    pageSize: this.pageSize,
                    status: true
                });
                this.corporationsList = result.data.data;
                console.log(this.corporationsList);
                this.totalCount = parseInt(result.data.totalCount);
                console.log(this.totalCount);
            },
            //监听pageSize改变的事件
            handleSizeChange(newSize)
            {
                this.pageSize = newSize;
                this.getCorporationList();
            },
            //监听pageNum改变的事件
            handleCurrentChange(newPage)
            {
                this.pageNum = newPage;
                this.getCorporationList();
            },

            //抽取出来,当弹出的页面结束后,会清空内容
            // 因为公有addForm所以必须有这个操作,且点击后都是重新axios请求新信息,所以没有问题
            clearAddForm()
            {
                //清空数据
                this.addForm.id = "";
                this.addForm.name = "";
                this.addForm.description = "";
                this.addForm.cost = "";
                this.addForm.fund = "";
                this.addForm.place = "";
                this.addForm.time = "";
                this.addForm.range = "";
                this.addForm.apply_date = "";
                this.addForm.status = "";
                this.addForm.information = "";
                this.addForm.is_public = "";
            },

            //添加活动框里面的取消添加活动按钮触发的事件
            cancelAdd()
            {
                //清空表单的校验项
                this.$refs.addFormRef.resetFields();
                //防止非必填项没清理掉
                this.clearAddForm();
                //隐藏添加活动对话框
                this.addDialogVisible = false;
                this.$message.info("取消添加活动!");
            },

            async showDialog(id)
            {
                let result = await this.$http.post(this.$api.PrincipalGetOneActivityUrl, id);
                status = result.data.status;
                if (!status || status !== "200")
                {
                    this.$message.info(result.data.msg);
                } else
                {
                    this.addForm = result.data.data;
                    this.showDialogVisible = true;
                }
            },

            closeDialogVisible()
            {
                this.clearAddForm();
                this.showDialogVisible = false;
            },
            cancelEdit()
            {
                this.editDialogVisible = false;
                this.clearAddForm();
                this.$message.info("取消修改活动!");
            },

            //详情页面弹出后,会查询该社团的简介内容并显示
            async showCorporationSummary(id)
            {
                let result = await this.$http.post(this.$api.StudentCorporationInformationUrl, id);
                status = result.data.status;
                if (!status || status !== "200")
                {
                    this.$message.info(result.data.msg);
                } else
                {
                    this.addForm = result.data.data;
                    this.editDialogVisible = true;
                }
            },
            async editActivity()
            {
                let result = await this.$http.post(this.$api.PrincipalUpdateOneActivityUrl, this.addForm);
                status = result.data.status;
                if (!status || status !== "200")
                {
                    this.$message.info(result.data.msg);
                }
                this.clearAddForm();
                //关闭对话框
                this.editDialogVisible = false;
                //    刷新数据列表
                this.getCorporationList();
                //    提示成功
                this.$message.success("提交审核成功!");
            },
        }
    }
</script>
<style scoped></style>