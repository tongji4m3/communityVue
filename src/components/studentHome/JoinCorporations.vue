<template>
    <div>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/StudentWelcome' }">学生首页</el-breadcrumb-item>
            <el-breadcrumb-item>已加入社团</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <el-carousel :interval="4000" type="card" height="366px">

<!--            <el-carousel-item >-->
<!--                <img src="../../assets/img/tj_typlt.jpg" alt="" style="height: 366px;width: 100%;margin:0;">-->
<!--            </el-carousel-item>-->
            <el-carousel-item >
                <img  src="../../assets/img/tj_cp1.jpg" alt="" style="height: 366px;width: 100%;margin:0;">
            </el-carousel-item>
            <el-carousel-item >
                <img src="../../assets/img/tj_cp4.jpg" alt="" style="height: 366px;width: 100%;margin:0;">
            </el-carousel-item>
<!--            <el-carousel-item >-->
<!--                <img src="../../assets/img/tj_cp2.jpg" alt="" style="height: 366px;width: 100%;margin:0;">-->
<!--            </el-carousel-item>-->

            <el-carousel-item >
                <img src="../../assets/img/tj_cp3.jpg" alt="" style="height: 366px;width: 100%;margin:0;">
            </el-carousel-item>
            <!--            <el-carousel-item >-->
            <!--                <img src="../../assets/img/tj_cp4.jpg" alt="" style="height: 366px;width: 100%;margin:0;">-->
            <!--            </el-carousel-item>-->
<!--            <el-carousel-item >-->
<!--                <img src="../../assets/img/tj_cp5.jpg" alt="" style="height: 366px;width: 100%;margin:0;">-->
<!--            </el-carousel-item>-->
        </el-carousel>
        <el-divider></el-divider>
        <!--        卡片-->
        <el-card>
            <div id="announce_head">
<!--                <img src="../../assets/img/icon_announcement.png" alt="" style="vertical-align: middle">-->
                <span> <h3> 已加入社团</h3></span>
                <!--                        <span @click="SystemNotice" class="more"> <h3>更多</h3></span>-->
            </div>
            <el-divider></el-divider>
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
            <el-table :data="corporationsList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="社团名称" prop="name"></el-table-column>
                <el-table-column label="社团性质" prop="type"></el-table-column>
                <el-table-column label="成立时间" prop="establishmentDate"></el-table-column>
                <el-table-column label="社长"  prop="presidentName"></el-table-column>
                <el-table-column label="退出社团">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="exitCorporation(scope.row.clubId,scope.row.name)">退出</el-button>
                    </template>
                </el-table-column>

            </el-table>

            <br>
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



        <!--        社团简介对话框-->
        <el-dialog title="社团简介" ref="showFormRef" :visible.sync="showDialogVisible"
                   width="50%">
            <!--            展示内容主体区域 -->
            <el-form :model="addForm" label-width="150px">
                简介
                <el-input v-model="addForm.summary"></el-input>
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
            <el-form :model="addForm"  ref="addFormRef" :rules="addFormRules" label-width="150px">
<!--                <el-form-item label="社团编号:" prop="corporationId">-->
<!--                    <el-input v-model="addForm.clubid" readonly="true"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="社团名称:" prop="corporationName">
                    <el-input v-model="addForm.name" readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="退社理由:" prop="reason">
                    <el-input type="textarea" v-model="addForm.summary" placeholder="请务必写明学号、专业和姓名,方便我们审核！"></el-input>
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

<script>
    export default {
        data()
        {

            let checkCost = (rule, value, cb) =>
            {
                const regCost = /^\d{1,8}\.?\d{0,2}$/;
                if (regCost.test(value))
                {
                    //合法密码
                    return cb();
                }
                cb(new Error("活动开销必须是数字,且小于一千万!"));

            };
            let checkFund = (rule, value, cb) =>
            {
                const regFund = /^\d{1,8}\.?\d{0,2}$/;
                if (regFund.test(value))
                {
                    //合法密码
                    return cb();
                }
                cb(new Error("活动经费必须是数字,且小于一千万!"));

            };
            return {
                //    获取活动列表参数对象

                query: '',
                //当前的页码
                pageNumber: 1,
                //每页显示的条数
                pageSize: 5,

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
                    studentid:"",
                    name:"",
                    clubid:"",
                    summary: "",
                },
                //添加活动的校验规则
                addFormRules: {
                    studentID: [
                        {required: true, message: '请输入学号', trigger: 'blur'},
                    ],
                    corporationName: [
                        {required: true, message: '请输入社团名称', trigger: 'blur'}
                    ],
                    corporationId: [
                        {required: true, message: '请输入社团编号', trigger: 'blur'}
                    ],
                    summary: [
                        {required: true, message: '请输入退社理由(请务必注明专业和姓名）', trigger: 'blur'},
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
        //获取已加入社团列表
        methods: {
            async getCorporationList()
            {
                let result = await this.$http.post(this.$api.StudentGetJoinedCorporationsUrl,
                    {
                        query: this.query,
                        pageNumber: this.pageNumber,
                        pageSize: this.pageSize,
                        status: true
                    });
                this.corporationsList = result.data.data;
                for(var j=0;j<result.data.totalCount;j++) {
                    this.corporationsList[j].establishmentDate=this.corporationsList[j].establishmentDate.substring(0,10);
                }


                for(var i=0;i<result.data.totalCount;i++){
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

                // this.corporationsList.establishmentDate=this.corporationsList.establishmentDate.substring(0,10);
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
                this.pageNumber = newPage;
                this.getCorporationList();
            },



            //抽取出来,当弹出的页面结束后,会清空内容
            // 因为公有addForm所以必须有这个操作,且点击后都是重新axios请求新信息,所以没有问题
            clearAddForm()
            {
                //清空数据
                this.addForm.summary='';
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
                this.$message.info("取消提交申请!");
            },

            async showDialog(id)
            {
                let result = await this.$http.post(this.$api.StudentCorporationInformationUrl+'/'+id);
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


            //提交申请
            exitCorporation(clubid,name)
            {

                this.addDialogVisible = true;
                //清空表单的校验项
                this.$nextTick(() =>
                {
                    this.$refs.addFormRef.resetFields();
                });
                this.addForm.studentid="";
                this.addForm.name=name;
                this.addForm.clubid=clubid;
                this.addForm.summary="";

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
                this.$message.info("取消提交申请!");
            },

            //提交申请
            addApply()
            {
                this.$refs.addFormRef.validate(
                    async valid =>
                    {
                        if (!valid) return;

                        console.log(this.addForm);
                        var clubId=this.addForm.clubid;
                        console.log(clubId)
                        let result = await this.$http.post(this.$api.StudentExitClub+'/'+clubId);

                        var userid=clubId;
                        var title="退出社团";
                        var content=this.addForm.summary;
                        let result1 =await this.$http.post(this.$api.StudentSendMessage,{
                            userid:this.addForm.clubid,
                            title,
                            content:this.addForm.summary,
                        });
                        //隐藏添加活动对话框
                        this.addDialogVisible = false;
                        // this.getActivityList();
                        this.$message.info("成功退出社团!");
                        location.reload();
                    }
                );
            },


            //详情页面弹出后,会查询该社团的简介内容并显示
            async showCorporationSummary(id)
            {
                let result = await this.$http.post(this.$api.StudentCorporationInformationUrl+'/'+id);
                status = result.data.status;
                console.log(status)
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