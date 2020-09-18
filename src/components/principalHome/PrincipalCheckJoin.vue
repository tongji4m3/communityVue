<template>
    <div>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/principleWelcome' }">负责人首页</el-breadcrumb-item>
            <el-breadcrumb-item>入社人员审核</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>
        <!--        卡片-->
        <el-card class="box-card">
            <!--            搜索与添加-->
            <el-row :gutter="20">
                <el-col :span="7">
<!--                                        搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特点内容的学生-->
                    <el-input clearable @clear="getStudentList" placeholder="请输入内容" v-model="query">
                        <el-button slot="append" icon="el-icon-search" @click="getStudentList"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!--            学生列表 只展示一些学生信息,详细文本可在详情查看-->
            <el-table :data="StudentList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="学生ID" prop="number"></el-table-column>
                <el-table-column label="姓名" prop="studentName"></el-table-column>
                <el-table-column label="申请入社时间" prop="applyDate"></el-table-column>
                <el-table-column label="显示详情">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="showDialog(scope.row.studentId)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="审核">
                    <template slot-scope="scope">
                        <!--                        通过按钮-->
                        <el-button type="success" @click="agreeStudent(scope.row.studentId,1)"
                                   icon="el-icon-check" circle></el-button>
                        <!--                        不通过按钮-->
                        <el-button type="danger" @click="rejectStudent(scope.row.studentId,0)"
                                   icon="el-icon-close" circle></el-button>
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

        <!--        展示申请原因-->
        <el-dialog title="申请入社详情" ref="showFormRef" :visible.sync="showDialogVisible"
                   width="50%" center>
            <!--            展示内容主体区域 -->
            <el-form :model="checkForm" label-width="130px">
                <el-form-item label="学生ID:">
                    <el-input v-model="checkForm.number" readonly></el-input>
                </el-form-item>
                <el-form-item label="姓名:">
                    <el-input v-model="checkForm.studentName" readonly></el-input>
                </el-form-item>
                <el-form-item label="申请入社时间:">
                    <el-date-picker type="date" v-model="checkForm.applyDate" style="width: 100%;" readonly></el-date-picker>
                </el-form-item>
                <el-form-item label="申请入社理由:" prop="applyReason">
                    <el-input
                        type="textarea"
                        :rows="7"
                        placeholder="请输入申请入社理由..."
                        v-model="checkForm.applyReason" readonly>
                    </el-input>
                </el-form-item>
            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
                <!--                        通过按钮-->
                <el-button type="success" @click="agreeStudent(checkForm.studentId,1)"
                       icon="el-icon-check" circle style="margin-right:30px ;"></el-button>
                <!--                        不通过按钮-->
                <el-button type="danger" @click="rejectStudent(checkForm.studentId,0)"
                       icon="el-icon-close " circle></el-button>
                <!-- <el-button type="primary" @click="closeDialogVisible">确 定</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data()
    {
        return {
            //获取列表参数对象
            query: '',
            //当前的页码
            pageNumber: 1,
            //每页显示的条数
            pageSize: 5,

            //查询到的当页学生
            StudentList: [
                {
                    number: "",
                    studentName:"",
                    applyDate:"",
                    applyReason:"",
                    status: false,
                }
            ],
            //总条数,用于分页的显示
            totalCount: 0,
            //展示学生对话框的显示与隐藏
            showDialogVisible: false,

            //添加学生表单数据
            checkForm: {
                number: "",
                studentId:"",
                studentName:"",
                applyDate:"",
                applyReason:"",
                status: false,
            },


            //添加学生的校验规则
            checkFormRules: {},
            //社团名称
            clubName:"",
        }
    },
    //一开始就显示申请学生的页面
    created()
    {
        this.getStudentList();
        this.getClubName();
    },
    methods: {
        async getStudentList()
        {
            let result = await this.$http.post(this.$api.PrincipalGetJoinUrl,
                {
                    query: this.query,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    status: true
                });
            this.StudentList = result.data.data;
            for (let i = 0; i < this.StudentList.length; i++)
            {
                this.StudentList[i].applyDate=this.StudentList[i].applyDate.substring(0,10)
            }
            this.totalCount = parseInt(result.data.totalCount);
        },
        //监听pageSize改变的事件
        handleSizeChange(newSize)
        {
            this.pageSize = newSize;
            this.getStudentList();
        },
        //监听pageNum改变的事件
        handleCurrentChange(newPage)
        {
            this.pageNumber = newPage;
            this.getStudentList();
        },

        async showDialog(StudentId)
        {
            // console.log(StudentId);
            let result = await this.$http.post(this.$api.PrincipalGetOneJoinUrl + "/" + StudentId);

            this.checkForm = result.data;

            this.showDialogVisible = true;
        },
        //显示学生申请详情页面按确定后的触发事件
        closeDialogVisible()
        {
            this.showDialogVisible = false;
        },
        async agreeStudent(studentId_in, status_in)
        {
            await this.$http.post(this.$api.PrincipalJoinResult, {
              studentId:studentId_in,
              status:status_in
            });
            await this.sendAgreeMessage(studentId_in);
            // console.log(studentId_in, status_in);
            //关闭对话框
            this.showDialogVisible = false;
            //    刷新数据列表
            await this.getStudentList();
            //    提示成功
            this.$message.success("申请审核已通过!");
        },

        async rejectStudent(studentId_in, status_in)
        {
          await this.$http.post(this.$api.PrincipalJoinResult, {
            studentId:studentId_in,
            status:status_in
          });
          await this.sendRejectMessage(studentId_in);
          // console.log(studentId_in, status_in);
          //关闭对话框
          this.showDialogVisible = false;
          //    刷新数据列表
          await this.getStudentList();
          //    提示成功
          this.$message.success("申请审核未通过!");
        },

        async sendRejectMessage(userId_in)
        {
            console.log(this.clubName);
            await this.$http.post(this.$api.PrincipalRejectSendMessage, {
                userId:userId_in,
                title:'拒绝入社消息',

                content:'很抱歉地通知您，您被拒绝加入社团',
            });
        },

        async sendAgreeMessage(userId_in)
        {
            await this.$http.post(this.$api.PrincipalRejectSendMessage, {
                userId:userId_in,
                title:'通过入社消息',

                content:'很高兴地通知您，您被同意加入社团',
            });
        },

        async getClubName()
        {
            let result = await this.$http.post(this.$api.PrincipalGetClubName);
            thrtis.clubName = result.name;
            console.log(this.clubName);
            // console.log(this.addForm.description);
        },
    }
}
</script>

<style scoped></style>

