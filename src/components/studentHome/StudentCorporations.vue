<template>
    <div>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/StudentWelcome' }">学生首页</el-breadcrumb-item>
            <el-breadcrumb-item>社团信息查询</el-breadcrumb-item>
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
                    <el-input clearable @clear="getCorporationList" placeholder="请根据社团名搜索社团" v-model="query">
                        <el-button slot="append" icon="el-icon-search" @click="getCorporationList"></el-button>
                    </el-input>
                </el-col>
<!--                <el-col :span="4">-->
<!--                    <el-button type="primary" @click="addDialogVisible=true">查询社团</el-button>-->
<!--                </el-col>-->
            </el-row>
            <!--            活动列表 只展示一些活动信息,详细信息可在详情查看-->
            <el-table :data="corporationsList" >
                <el-table-column type="index"></el-table-column>
                <el-table-column label="社团名称" prop="name"></el-table-column>
                <el-table-column label="社团性质" prop="type"></el-table-column>
                <el-table-column label="社团简介">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="showCorporationSummary(scope.row.clubId,scope.row.establishmentDate,scope.row.presidentName)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="加入社团">
                    <template slot-scope="scope">
                        <!--                        加入按钮-->
                        <!--<el-button type="primary" @click="showEditDialog(scope.row.id)" >加入</el-button>-->
                        <el-button type="primary" @click="joinNewClub(scope.row.clubId,scope.row.name,scope.row.establishmentDate,scope.row.presidentName)">加入</el-button>
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
                   width="70%">
            <!--            展示内容主体区域 -->
            <el-form :model="addForm" label-width="150px">
                <el-form-item label="成立时间">
                    <el-input v-model="addForm.date" disabled></el-input>
                </el-form-item>
                <el-form-item label="会长">
                    <el-input v-model="addForm.president" disabled></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <div v-html="addForm.summary">{{addForm.summary}}</div>
<!--                    <el-input v-model="addForm.summary" type="textarea" disabled></el-input>-->
                </el-form-item>

            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
                 <el-button type="primary" @click="closeDialogVisible">确 定</el-button>
            </span>
        </el-dialog>


        <!--        展示活动对话框-->
        <el-dialog title="社团简介"  :visible.sync="addDialogVisible"
                   width="50%">
            <!--            展示内容主体区域 -->
            <el-form :model="addForm" ref="addFormRef" label-width="150px">
<!--                <el-form-item label="社团编号">-->
<!--                    <el-input v-model="addForm.id" disabled></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="社团名称">
                    <el-input v-model="addForm.name" disabled></el-input>
                </el-form-item>
<!--                <el-form-item label="社团性质">-->
<!--                    <el-input v-model="addForm.type" disabled></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="成立时间">
                    <el-input v-model="addForm.date" disabled></el-input>
                </el-form-item>
<!--                <el-form-item label="会长">-->
<!--                    <el-input v-model="addForm.president" disabled></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="简介">-->
<!--                    <el-input v-model="addForm.summary" type="textarea" disabled></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="加入原因:">
                    <el-input type="textarea" v-model="addForm.reason" placeholder="请务必写明学号、专业和姓名,方便我们审核！"></el-input>
                </el-form-item>

            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
    <el-button type="primary" @click="addApply">确 定</el-button>
            </span>
        </el-dialog>

<!--        &lt;!&ndash;        修改活动对话框&ndash;&gt;-->
<!--        <el-dialog title="提交申请" ref="editFormRef" :visible.sync="editDialogVisible"-->
<!--                   width="50%">-->
<!--            <el-form :model="addForm" label-width="150px">-->
<!--                上传审核文件：-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--                    <el-button @click="cancelEdit">取 消</el-button>-->
<!--                    <el-button type="primary" @click="editActivity">确 定</el-button>-->
<!--            </span>-->
<!--        </el-dialog>-->
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
                corporationsList: [],
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
                    summary: "",
                    date:"",
                    president:"",
                    id:"",
                    name:"",
                    type:"",
                    reason:"",
                },
                //添加活动的校验规则
                addFormRules: {
                    studentID: [
                        {required: true, message: '请输入修改后的手机号', trigger: 'blur'},
                    ],
                    corporationName: [
                        {required: true, message: '请输入社团名称', trigger: 'blur'}
                    ],
                    corporationId: [
                        {required: true, message: '请输入社团编号', trigger: 'blur'}
                    ],
                    reason: [
                        {required: true, message: '请输入退社理由', trigger: 'blur'},
                    ],
                }
            }
        },
        //一开始就显示活动列表
        created()
        {
            //this.getCorporationsList();
            this.getCorporationList();
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
                for(var i=0;i<result.data.totalCount-1;i++){
                    if(this.corporationsList[i].type===0){
                        this.corporationsList[i].type="学术科技类";
                    }
                    else if(this.corporationsList[i].type===1){
                        this.corporationsList[i].type="传统文化与文学类";
                    }
                    else if(this.corporationsList[i].type===2){
                        this.corporationsList[i].type="公益实践类";
                    }
                    else if(this.corporationsList[i].type===3){
                        this.corporationsList[i].type="文化艺术类";
                    }
                    else if(this.corporationsList[i].type===4){
                        this.corporationsList[i].type="体育竞技类";
                    }
                    else{
                        this.corporationsList[i].type="创新创业类";
                    }
                }

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
                this.addForm.summary="";
                this.addForm.president="";
                this.addForm.id="";
                this.addForm.name="";
                this.addForm.type="";
                this.addForm.reason="";
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
                this.$message.info("取消加入社团!");
            },

            closeDialogVisible()
            {
                this.clearAddForm();
                this.showDialogVisible = false;
            },


            //详情页面弹出后,会查询该社团的简介内容并显示
            async showCorporationSummary(id,date,president)
            {
                console.log(id);
                let result = await this.$http.post(this.$api.StudentCorporationInformationUrl+'/'+id);

                this.addForm.summary= result.data;
                this.addForm.date=date;
                this.addForm.date=this.addForm.date.substring(0,10);
                this.addForm.president=president;
                this.showDialogVisible = true;
            },
            //提交申请
            addApply()
            {
                console.log(this.addForm.id,this.addForm.reason);
                this.$refs.addFormRef.validate(
                    async valid =>
                    {
                        if (!valid) return;
                        var clubId=this.addForm.id;
                        var applyReason=this.addForm.reason;

                        let result = await this.$http.post(this.$api.StudentJoinClub,
                            {
                                clubId,
                                applyReason,
                            });
                        console.log(clubId,applyReason);
                        //隐藏添加活动对话框
                        this.addDialogVisible = false;
                        console.log(result);
                        this.$message.info("申请加入社团成功!");
                    }
                );

            },

            async joinNewClub(id,name,date,president){

                let result = await this.$http.post(this.$api.StudentCorporationInformationUrl+'/'+id);
                this.addForm.id=id;
                this.addForm.name=name;
                this.addForm.summary= result.data;
                this.addForm.date=date;
                this.addForm.date=this.addForm.date.substring(0,10);
                this.addForm.president=president;
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
                this.getCorporationList();
                //    提示成功
                this.$message.success("提交审核成功!");
            },
        }
    }
</script>
<style scoped></style>