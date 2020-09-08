<template>
    <div>
         <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/adminWelcome' }">管理员首页</el-breadcrumb-item>
            <el-breadcrumb-item>社团学生管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <!-- 卡片 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <!-- 模糊搜索 -->
                <el-col :span="10">
                    <el-input clearable @clear="getStudentList('all', query)"  placeholder="请输入内容" v-model="query">
                        <el-button slot="append" icon="el-icon-search" @click="getStudentList('all', query)"></el-button>
                    </el-input>
                </el-col>
                 <!-- 带状态的模糊搜索 -->
                <el-col :span="2"  class="center">
                    <p>状态：</p>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="getStudentList('all', query)">全部</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="getStudentList('graduated', query)">离校生</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="getStudentList('atSchool', query)">在校生</el-button>
                </el-col>
            </el-row>
        </el-card>
        <!-- 活动列表 -->
        <el-table :data="studentList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="学号" prop="number"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="专业" prop="major"></el-table-column>
                <el-table-column label="年级" prop="grade"></el-table-column>
                <el-table-column label="状态" prop="status_name"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" 
                            @click="showReplyDialog(scope.$index)">
                            修改
                        </el-button>
                    </template>
                </el-table-column>
        </el-table>
        <el-button type="success" 
            @click="showEmptyReplyDialog()">
            新增
        </el-button>
        <!-- 分页区域 -->
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNumber"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
        </el-pagination>
        <!-- 详情对话框 -->
        <el-dialog title="学生信息" :visible.sync="replyDialogVisible"
                   width="50%">
            <!-- 展示内容主体区域 -->
            <el-form :model="this.replyForm" label-width="150px">
                <el-form-item label="姓名:">
                    <el-input v-model="replyForm.name"></el-input>
                </el-form-item>
                <el-form-item label="学号:">
                    <el-input v-model="replyForm.number"></el-input>
                </el-form-item>
                <el-form-item label="专业:">
                    <el-input v-model="replyForm.major"></el-input>
                </el-form-item>
                <el-form-item label="年级:">
                    <el-input v-model="replyForm.grade"></el-input>
                </el-form-item>
                <el-form-item label="状态:">
                    <el-input v-model="replyForm.status_name" readonly></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <!-- 取消按钮 -->
                <el-button @click="closeReplyDialog()">取 消</el-button>
                <!-- 提交按钮 -->
                <el-button type="primary" @click="submit()">提 交</el-button>
                <!-- 标记毕业按钮 -->
                <el-button
                    v-if="replyForm.status && !replyForm.isNew" 
                    type="success" 
                    @click="updateGraduate()">
                    毕业
                </el-button>
                <!-- 删除按钮 -->
                <el-button 
                    v-if="!replyForm.isNew"
                    type="danger" 
                    @click="deleteStudentMeta()">
                    删除
                </el-button>
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
            status: 'all',
            //当前的页码
            pageNumber: 1,
            //每页显示的条数
            pageSize: 5,
            //查询到的当前页活动列表
            studentList: [
                {
                    status: true,
                    number: 0,
                    name: "",
                    major: "",
                    grade: "",
                    status_name: ""
                },
            ],
            //总条数,用于分页的显示
            totalCount: 0,
            //批复对话框显示状态
            replyDialogVisible: false,
            //分类按钮状态
            buttonUsable: [true, true, true, true],
            //活动审核表单数据
            replyForm: {
                status: false,
                number: 0,
                name: "",
                major: "",
                grade: "",
                status_name: "",
                isNew: false
            },
        }
    },
    //创建时显示全部赞助列表
    created()
    {
        this.getStudentList('all');
    },
    methods: {
        //获取query_in关键字，status状态，第pageNumber_in页的赞助列表      
        async getStudentList(status_in = this.status, query_in = this.query, pageNumber_in = this.pageNumber)
        {
            this.status = status_in;
            this.query = query_in;
            this.pageNumber = pageNumber_in;
            let result = await this.$http.post(this.$api.AdminGetStudentMetaListUrl,
                {
                    status: this.status,
                    PageQO:{
                        query: this.query,
                        pageNumber: this.pageNumber,
                        pageSize: this.pageSize,
                    },
                });
            while(this.studentList.length > 0){
                this.studentList.pop();
            }
            // console.log(result.data);
            var dataItem;
            for(let i = 0; i < result.data.data.length; i++){
                // console.log(result.data.data[i]);
                let metaItem = {
                    number: result.data.data[i].number,
                    name: result.data.data[i].name,
                    major: result.data.data[i].major,
                    grade: result.data.data[i].grade,
                    status_name: this.statusToStr(result.data.data[i].status),
                    status: result.data.data[i].status
                };
                this.studentList.push(metaItem);
            }
            // console.log(this.studentList);
            this.totalCount = parseInt(result.data.totalCount);
        },
        //监听pageSize改变的事件
        handleSizeChange(newSize)
        {
            this.pageSize = newSize;
            this.getStudentList(this.query);
        },
        //监听pageNum改变的事件
        handleCurrentChange(newPage)
        {
            this.pageNumber = newPage;
            this.getStudentList(this.query);
        },
        //输出status的文字描述
        statusToStr(status_bool)
        {
            if(status_bool){
                return "在校"
            }
            else {
                return "离校"//毕业、退学
            }
        },
        //弹出详情对话框
        async showReplyDialog(pos_in)
        {
            this.replyForm.number = this.studentList[pos_in].number;
            this.replyForm.name = this.studentList[pos_in].name;
            this.replyForm.major = this.studentList[pos_in].major;
            this.replyForm.grade = this.studentList[pos_in].grade;
            this.replyForm.status_name = this.studentList[pos_in].status_name;
            this.replyForm.status = this.studentList[pos_in].status;
            this.replyForm.isNew = false;
            this.replyDialogVisible = true;
        },
        //弹出空白详情对话框
        async showEmptyReplyDialog()
        {
            this.replyForm.number = 0;
            this.replyForm.name = "";
            this.replyForm.major = "";
            this.replyForm.grade = "";
            this.replyForm.status_name = "在校";
            this.replyForm.status = true;
            this.replyForm.isNew = true;
            this.replyDialogVisible = true;
        },
        //关闭详情对话框
        closeReplyDialog()
        {
            this.replyDialogVisible = false;
        },
        //提交更新并关闭对话框
        async submit()
        {
            this.closeReplyDialog();
            if (this.replyForm.isNew){ return insertStudentMeta(); }
            let result = await this.$http.post(this.$api.AdminUpdateStudentMetaUrl, 
                {
                    number: this.replyForm.number,
                    name: this.replyForm.name,
                    major: this.replyForm.major,
                    grade: this.replyForm.grade,
                    status: this.replyForm.status
                });
            return result.data;
        },
        //新增学生信息
        async insertStudentMeta(){
            let result = await this.$http.post(this.$api.AdminInsertStudentMetaUrl,
                {
                    number: this.replyForm.number,
                    name: this.replyForm.name,
                    major: this.replyForm.major,
                    grade: this.replyForm.grade,
                    status: this.replyForm.status
                })
            return result.data;
        },
        //标记为已离校
        async updateGraduate(){
            this.replyForm.status = false;
            this.replyForm.status_name = "离校"
            let result = await this.$http.post(this.$api.AdminUpdateGraduateUrl,
                {
                    number: this.replyForm.number
                })
            return result.data;
        },
        //删除学生信息
        async deleteStudentMeta(){
            let result = await this.$http.post(this.$api.AdminDeleteStudentMetaUrl,
                {
                    number: this.replyForm.number
                })
            return result.data;
        }
    }
}
</script>

<style scoped>
.center{
    margin: auto 0;
    vertical-align: 50%;
}
</style>


