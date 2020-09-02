<template>
    <div>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/StudentWelcome' }">学生首页</el-breadcrumb-item>
            <el-breadcrumb-item>参加活动</el-breadcrumb-item>
        </el-breadcrumb>


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
                <el-row :gutter="20">
                    <el-button type="primary" icon="" @click="toAcitivity">公开活动</el-button>
                </el-row>
                <!--                <el-col :span="4">-->
                <!--                    <el-button type="primary" @click="addDialogVisible=true">查询社团</el-button>-->
                <!--                </el-col>-->
            </el-row>
            <!--            活动列表 只展示一些活动信息,详细信息可在详情查看-->
            <el-table :data="activityList" :row-class-name="tableRowClassName">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="活动名称" prop="name"></el-table-column>
                <el-table-column label="活动地点" prop="place"></el-table-column>
                <el-table-column label="查看详情">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="showActivitySummary(scope.row.activityId,scope.row.name,scope.row.place,scope.row.description,scope.row.eventTime,scope.row.clubName,'nb')">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="参加活动">
                    <template slot-scope="scope">
                        <!--                        加入按钮-->
                        <!--<el-button type="primary" @click="showEditDialog(scope.row.id)" >加入</el-button>-->
                        <el-button type="primary" @click="joinOneActivity(scope.row.ActivityId)">加入</el-button>
                    </template>
                </el-table-column>

            </el-table>

            <el-divider></el-divider>


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
        <el-dialog title="活动详情" ref="showFormRef" :visible.sync="showDialogVisible"
                   width="50%">
            <!--            展示内容主体区域 -->
            <el-form :model="addForm" label-width="150px">
                <el-form-item label="活动编号">
                    <el-input v-model="addForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动名称">
                    <el-input v-model="addForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动地点">
                    <el-input v-model="addForm.place" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动简介">
                    <el-input v-model="addForm.description" type="textarea" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-input v-model="addForm.eventTime" disabled></el-input>
                </el-form-item>
                <el-form-item label="所属社团">
                    <el-input v-model="addForm.clubName" disabled></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-input v-model="addForm.adminName" disabled></el-input>
                </el-form-item>
            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
                 <el-button type="primary" @click="closeDialogVisible">确 定</el-button>
            </span>
        </el-dialog>

        <!--        参加活动对话框-->
        <el-dialog title="提交申请" :visible.sync="addDialogVisible"
                   width="50%">
            <!--            内容主体区域 放置一个表单-->
            <el-form :model="addForm1"  ref="addFormRef" label-width="150px">
                <el-form-item label="活动编号:" prop="id">
                    <el-input v-model="addForm1.id"></el-input>
                </el-form-item>
                <el-form-item label="参加理由:" prop="reason">
                    <el-input type="textarea" v-model="addForm.reason"></el-input>
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
                    id:'',
                    name:'',
                    place:'',
                    description:'',
                    eventTime:'',
                    clubName:'',
                    adminName:'',
                },
                addForm1:{
                    id:"",
                    reason:"",
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
                let result = await this.$http.post(this.$api.StudentInActivitesInformationUrl,
                    {
                        query: this.query,
                        pageNumber: this.pageNum,
                        pageSize: this.pageSize,
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
            toAcitivity(){
                this.$router.push({ path:'/JoinActivity'})
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

            //详情页面弹出后,会查询该活动的简介内容并显示
            async showActivitySummary(id,name,place,description,eventTime,clubName,adminName)
            {
                this.addForm.id=id;
                this.addForm.name=name;
                this.addForm.place=place;
                this.addForm.description=description;
                this.addForm.eventTime=eventTime;
                this.addForm.clubName=clubName;
                this.addForm.adminName=adminName;
                this.showDialogVisible = true;
            },
            async joinOneActivity(id){
                this.addForm1.id=id;
                this.reason="";
                this.addDialogVisible=true;
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

                        console.log(this.addForm1);
                        var activityId=this.addForm1.id;
                        var applyReason=this.addForm1.reason;
                        let result = await this.$http.post(this.$api.StudentJoinActivity,
                            {
                                activityId,
                                applyReason,
                            });
                        console.log(applyReason);
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