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
        <el-alert
                title="欢迎查看公开活动"
                type="info"
                center
                show-icon>
        </el-alert>
        <br>

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
                    <el-button type="primary" icon="" @click="toInclubAcitivity">社团活动</el-button>
                    <el-button type="primary" icon="" >公开活动</el-button>
                </el-row>

                <!--                <el-col :span="4">-->
                <!--                    <el-button type="primary" @click="addDialogVisible=true">查询社团</el-button>-->
                <!--                </el-col>-->
            </el-row>
            <!--            活动列表 只展示一些活动信息,详细信息可在详情查看-->
            <el-table :data="activityList" >
                <el-table-column type="index"></el-table-column>
                <el-table-column label="活动名称" prop="name"></el-table-column>
                <el-table-column label="活动地点" prop="place"></el-table-column>
                <el-table-column label="查看详情">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="showActivitySummary(scope.row.activityId,scope.row.name,scope.row.place,scope.row.description,scope.row.eventTime,scope.row.clubName,scope.row.adminName)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="参加活动">
                    <template slot-scope="scope">
                        <!--                        加入按钮-->
                        <!--<el-button type="primary" @click="showEditDialog(scope.row.id)" >加入</el-button>-->
                        <el-button type="primary" @click="joinOneActivity(scope.row.activityId)">加入</el-button>
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
        <el-dialog  ref="showFormRef" :visible.sync="showDialogVisible"
                   width="50%">
            <!--            展示内容主体区域 -->
            <el-form :model="addForm" label-width="150px">
<!--                <el-form-item label="活动编号">-->
<!--                    <el-input v-model="addForm.id" readonly="true"></el-input>-->
<!--                </el-form-item>-->
                <h3 style="text-align:center; font-size:20px ">活动详情</h3>
                <br>
                <br>
<!--                <hr>-->
<!--                <br>-->
<!--                <p style="font-size:15px" v-html="addForm.summary">简介：{{addForm.summary}}</p>-->
<!--                <br>-->
<!--                <hr>-->
<!--                <br>-->
<!--                <p style="text-align: right;font-size:15px;margin-bottom: 7px;">成立时间：{{addForm.date}}</p>-->

<!--                <p style="text-align: right;font-size:15px">会长：{{addForm.president}}</p>-->
<!--                <p style="text-align:center;font-size:15px" v-html="addForm.name" >{{addForm.name}}</p>-->
                <el-form-item label="活动名称">
                    <el-input v-model="addForm.name" readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="活动地点">
                    <el-input v-model="addForm.place" readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="活动简介">
                    <el-input v-model="addForm.description" type="textarea" readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-input v-model="addForm.eventTime" readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="所属社团">
                    <el-input v-model="addForm.clubName" readonly="true"></el-input>
                </el-form-item>
<!--                <el-form-item label="负责人">-->
<!--                    <el-input v-model="addForm.adminName" readonly="true"></el-input>-->
<!--                </el-form-item>-->
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
<!--                <el-form-item label="活动编号:" prop="id">-->
<!--                    <el-input v-model="addForm1.id" readonly="true"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="参加理由:" prop="reason">
                    <el-input type="textarea" v-model="addForm1.reason" placeholder="请务必写明学号、专业和姓名,方便我们审核！"></el-input>
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
                //活动详情表单数据
                addForm: {
                    id:"",
                    name:"",
                    place:"",
                    description:"",
                    eventTime:"",
                    clubName:"",
                    adminName:"",
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
                let result = await this.$http.post(this.$api.StudentOutActivitesInformationUrl,
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


            //详情页面弹出后,会查询该活动的简介内容并显示
            async showActivitySummary(id,name,place,description,eventTime,clubName,adminName)
            {
                // let result = await this.$http.post(this.$api.StudentActivitesInformationUrl,{
                //     query: this.query,
                //     pageNumber: this.pageNum,
                //     pageSize: this.pageSize,
                //     status: true
                // });
                this.addForm.id=id;
                this.addForm.name=name;
                this.addForm.place=place;
                this.addForm.description=description;
                this.addForm.eventTime=eventTime;
                this.addForm.eventTime=this.addForm.eventTime.substring(0,10)
                this.addForm.clubName=clubName;
                this.addForm.adminName=adminName;
                this.showDialogVisible = true;
            },
            async joinOneActivity(id){
                let judge= await this.$http.post(this.$api.StudentJudgeJoinActivityUrl+'/'+id);
                judge=judge.data.isSuccess;
                if(judge===true){
                    this.addForm1.id=id;
                    this.addForm1.reason="";
                    this.addDialogVisible=true;
                }
                else{
                    this.$message.info("你已经加入了这个活动或正在审核中!");
                }

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

            toInclubAcitivity(){
                this.$router.push({ path:'/JoinInclubActivity'})
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