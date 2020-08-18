<template>
    <div>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/StudentWelcome' }">学生首页</el-breadcrumb-item>
            <el-breadcrumb-item>参加活动</el-breadcrumb-item>
        </el-breadcrumb>

<!--        <el-alert-->
<!--                title="已加入的社团为橙色"-->
<!--                type="info"-->
<!--                center-->
<!--                show-icon>-->
<!--        </el-alert>-->

        <el-divider></el-divider>
        <!--        卡片-->
        <el-card class="box-card">
            <!--            搜索与添加-->
            <el-row :gutter="20">
                <el-col :span="7">
                    <!--                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特定内容的社团-->
                    <el-input clearable @clear="getActivityList" placeholder="请根据活动名搜索活动" v-model="query">
                        <el-button slot="append" icon="el-icon-search" @click="getActivityList"></el-button>
                    </el-input>
                </el-col>
                <!--                <el-col :span="4">-->
                <!--                    <el-button type="primary" @click="addDialogVisible=true">查询社团</el-button>-->
                <!--                </el-col>-->
            </el-row>
            <!--            活动列表 只展示一些活动信息,详细信息可在详情查看-->
            <el-table :data="activityList" :row-class-name="tableRowClassName">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="活动名称" prop="Name"></el-table-column>
                <el-table-column label="活动地点" prop="Place"></el-table-column>
                <el-table-column label="查看详情">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="showCorporationSummary(scope.row.ActivityId,scope.row.ApplyDate,scope.row.AdminName)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="参加活动">
                    <template slot-scope="scope">
                        <!--                        加入按钮-->
                        <!--<el-button type="primary" @click="showEditDialog(scope.row.id)" >加入</el-button>-->
                        <el-button type="primary" @click="joinActivity(scope.row.ActivityId,scope.row.Name)">加入</el-button>
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
                <el-form-item label="成立时间">
                    <el-input v-model="addForm.date" disabled></el-input>
                </el-form-item>
                <el-form-item label="会长">
                    <el-input v-model="addForm.president" disabled></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input v-model="addForm.summary" type="textarea" disabled></el-input>
                </el-form-item>

            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
                 <el-button type="primary" @click="closeDialogVisible">确 定</el-button>
            </span>
        </el-dialog>

        <!--        退出社团对话框-->
        <el-dialog title="提交申请" :visible.sync="addDialogVisible"
                   width="50%">
            <!--            内容主体区域 放置一个表单-->
            <el-form :model="addForm"  ref="addFormRef" label-width="150px">
                <el-form-item label="学号:" prop="studentID">
                    <el-input v-model="addForm.studentId"></el-input>
                </el-form-item>
                <el-form-item label="活动编号:" prop="activityId">
                    <el-input v-model="addForm.activityId"></el-input>
                </el-form-item>
                <el-form-item label="活动名称:" prop="activityName">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="参加理由:" prop="reason">
                    <el-input type="textarea" v-model="addForm.summary"></el-input>
                </el-form-item>
            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
    <el-button @click="cancelAdd">取 消</el-button>
    <el-button type="primary" @click="addApply">确 定</el-button>
</span>
        </el-dialog>
    </div>
</template>



<style>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>

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
                activityList: [],
                //存放简介
                summaryList:[],
                //总页码数,用于分页的显示
                totalCount: 0,
                //添加,修改,展示活动对话框的显示与隐藏
                addDialogVisible: false,
                editDialogVisible: false,
                showDialogVisible: false,
                //添加活动表单数据
                addForm: {
                    studentId:"",
                    name:"",
                    activityId:"",
                    summary: "",
                },

                //添加活动的校验规则
                addFormRules: {
                    studentID: [
                        {required: true, message: '请输入学号', trigger: 'blur'},
                    ],
                    activityName: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'}
                    ],
                    activityId: [
                        {required: true, message: '请输入活动编号', trigger: 'blur'}
                    ],
                    reason: [
                        {required: true, message: '请输入参加理由', trigger: 'blur'},
                    ],
                }
            }
        },
        //一开始就显示活动列表
        created()
        {

            this.getActivityList();
        },
        methods: {

            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 0) {
                    return 'warning-row';
                }
                // else if (rowIndex === 3) {
                //     return 'success-row';
                // }
                return '';
            },

            joinNewActivity(){

                this.$router.push({ path:'/joinNewCorporation'})

            },

            async getActivityList()
            {
                let result = await this.$http.post(this.$api.StudentActivitesInformationUrl,
                    {
                        query: this.query,
                        pageNumber: this.pageNum,
                        pageSize: this.pageSize,
                        status: true
                    });
                this.activityList = result.data.data;
                console.log(this.activityList);
                this.totalCount = parseInt(result.data.totalCount);
                console.log(this.totalCount);
            },
            //监听pageSize改变的事件
            handleSizeChange(newSize)
            {
                this.pageSize = newSize;
                this.getActivityList();
            },
            //监听pageNum改变的事件
            handleCurrentChange(newPage)
            {
                this.pageNum = newPage;
                this.getActivityList();
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
            async showCorporationSummary(id,date,president)
            {
                let result = await this.$http.post(this.$api.StudentCorporationInformationUrl+'/'+id);
                this.addForm.summary= result.data;
                this.addForm.date=date;
                this.addForm.president=president;
                console.log(this.addForm.summary);
                this.showDialogVisible = true;
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
                this.getActivityList();
                //    提示成功
                this.$message.success("提交审核成功!");
            },

            joinActivity(activityid,name)
            {

                this.addDialogVisible = true;
                //清空表单的校验项
                this.$nextTick(() =>
                {
                    this.$refs.addFormRef.resetFields();
                });
                this.addForm.studentid="";
                this.addForm.name=name;
                this.addForm.clubid=activityid;
                this.addForm.summary="";

            },

            //提交申请
            addApply()
            {
                this.$refs.addFormRef.validate(
                    async valid =>
                    {
                        if (!valid) return;

                        console.log(this.addForm);
                        // let result = await this.$http.post(this.$api.PrincipalAddOneActivityUrl,
                        //     {
                        //         activityId: 0,
                        //         name: this.addForm.name,
                        //         fund: parseFloat(this.addForm.fund),
                        //         cost: parseFloat(this.addForm.cost),
                        //         place: this.addForm.place,
                        //         time: this.addForm.time,
                        //         description: this.addForm.description,
                        //         isPublic: this.addForm.isPublic
                        //     });

                        //隐藏添加活动对话框
                        this.addDialogVisible = false;
                        // this.getActivityList();
                        this.$message.info("提交申请成功!");
                    }
                );
            },
        }
    }
</script>
<style scoped></style>