<template>
    <div>
         <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/adminWelcome' }">管理员首页</el-breadcrumb-item>
            <el-breadcrumb-item>学生管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <!-- 卡片 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <!-- 模糊搜索 -->
                <el-col :span="11">
                    <el-input clearable @clear="getStudentList('all', query)"  placeholder="请输入内容" v-model="query">
                        <el-button slot="append" icon="el-icon-search" @click="getStudentList('all', query)"></el-button>
                    </el-input>
                </el-col>
                 <!-- 带状态的模糊搜索 -->
                <el-col :span="1"  class="center" style="margin-right: 3px;">
                    <el-button type="text" disabled>状态：</el-button>
                </el-col>
                <!-- <el-col :span="3">
                    <el-button type="primary" @click="getStudentList('all', query)">{{quanbu}}</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="getStudentList('graduated', query)">离校生</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="getStudentList('atSchool', query)">在校生</el-button>
                </el-col> -->
				<el-col :span="8">
				    <el-button type="primary" plain @click="getStudentList('all', query)">{{quanbu}}</el-button>
					<el-button type="primary" plain @click="getStudentList('graduated', query)">离校生</el-button>
					<el-button type="primary" plain @click="getStudentList('atSchool', query)">在校生</el-button>
				</el-col>
            </el-row>
        
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
                        <el-button type="primary" 
                            @click="showReplyDialog(scope.$index)">
                            修改
                        </el-button>
                    </template>
                </el-table-column>
        </el-table>
		<br>
            <el-row :gutter="24">
                <el-col :span="13">
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
                </el-col>
                <el-col :span='2'>
                    <el-button type="primary" 
                        @click="showEmptyReplyDialog()">
                        新增
                    </el-button>
                </el-col>
                <el-col :span='0'>
                    <input
                        class="input-file"
                        type="file"
                        @change="exportData"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                </el-col>
                <el-col :span="3">
                    <span>
                        <el-button type="primary" icon="el-icon-upload" @click="freshBtnClick">批量新增</el-button>
                    </span>
                </el-col>

                <el-col :span="3">
                    <span>
                        <el-button type="primary" icon="el-icon-upload" @click="graduateBtnClick">批量离校</el-button>
                    </span>
                </el-col>
            </el-row>

        </el-card>
        <!-- 详情对话框 -->
        <el-dialog title="学生信息" :visible.sync="replyDialogVisible"
                   width="50%" center>
            <!-- 展示内容主体区域 -->
            <el-form :model="this.replyForm" label-width="150px">
                <el-form-item label="姓名:">
                    <el-input v-model="replyForm.name" style="width: 82%;"></el-input>
                </el-form-item>
                <el-form-item label="学号:">
                    <el-input v-model="replyForm.number" style="width: 82%;"></el-input>
                </el-form-item>
                <el-form-item label="专业:">
                    <el-input v-model="replyForm.major" style="width: 82%;"></el-input>
                </el-form-item>
                <el-form-item label="年级:">
                    <el-input v-model="replyForm.grade" style="width: 82%;"></el-input>
                </el-form-item>
                <el-form-item label="状态:">
                    <el-input v-model="replyForm.status_name" readonly style="width: 82%;"></el-input>
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
        <!-- 批量操作出错对话框 -->
        <el-dialog title="批量操作出错" :visible.sync="errorDialogVisible"
                   width="50%">
            <!-- 展示内容主体区域 -->
            <el-form :model="this.errorForm" label-width="150px">
                <el-form-item label="当前操作:">
                    <el-input v-model="errorForm.op" readonly></el-input>
                </el-form-item>
                <el-form-item label="错误行号:">
                    <el-input v-model="errorForm.row" readonly></el-input>
                </el-form-item>
                <el-form-item label="详情:">
                    <el-input v-model="errorForm.notice" readonly></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <!-- 确认按钮 -->
                <el-button type="danger" @click="closeErrorDialog()">确 认</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import importFreshC from "./importFresh.vue";
// import uploadGraduateC from "./uploadGraduate.vue";
import XLSX from "xlsx";

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
            quanbu:"全　部",
            isFresh: true,
            //查询到的当前页活动列表
            studentList: [
                // {
                //     status: true,
                //     number: 0,
                //     name: "",
                //     major: "",
                //     grade: "",
                //     status_name: ""
                // },
            ],
            //总条数,用于分页的显示
            totalCount: 0,
            //批复对话框显示状态
            replyDialogVisible: false,
            //批量操作出错对话框显示状态
            errorDialogVisible: false,
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
            ws: {},
            errorForm:{
                op: "",
                row: 0,
                notice: "",
            }
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
            this.getStudentList(this.status, this.query);
        },
        //监听pageNum改变的事件
        handleCurrentChange(newPage)
        {
            this.pageNumber = newPage;
            this.getStudentList(this.status, this.query);
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
        closeErrorDialog(){
            this.errorDialogVisible = false;
        },
        //提交更新并关闭对话框
        async submit()
        {
            this.closeReplyDialog();
            if (this.replyForm.isNew){ return this.insertStudentMeta(); }
            let result = await this.$http.post(this.$api.AdminUpdateStudentMetaUrl, 
                {
                    number: this.replyForm.number,
                    name: this.replyForm.name,
                    major: this.replyForm.major,
                    grade: this.replyForm.grade,
                    status: this.replyForm.status
                });
            this.getStudentList();
            return result.data.isSuccess;
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
                });
            this.getStudentList();
            return result.data.isSuccess;
        },
        //标记为已离校
        async updateGraduate(){
            this.replyForm.status = false;
            this.replyForm.status_name = "离校";
            console.log({number:this.replyForm.number});
            let result = await this.$http.post(this.$api.AdminUpdateGraduateUrl,
                {
                    number: this.replyForm.number
                })
            return result.data.isSuccess;
        },
        //删除学生信息
        async deleteStudentMeta(){
            console.log({
                    number: this.replyForm.number
                });
            let result = await this.$http.post(this.$api.AdminDeleteStudentMetaUrl,
                {
                    number: this.replyForm.number
                });
            this.getStudentList();
            this.replyDialogVisible = false;
            return result.data.isSuccess;
        },
        async importFresh(){
            console.log(this.ws);
            var irow;
            for(irow = 0; irow < this.ws.length; irow++){
                let questObject = {
                    number: this.ws[irow].学号,
                    name: this.ws[irow].姓名,
                    major: this.ws[irow].专业,
                    grade: this.ws[irow].年级,
                    status: true
                }
                let result = await this.$http.post(this.$api.AdminInsertStudentMetaUrl, questObject);
                console.log(result);
                if(result.data.isSuccess == false){
                    this.errorForm.op = "批量新增";
                    this.errorForm.row = irow;
                    this.errorForm.notice = "已存在同学号学生，请刷新页面并修改错误学生信息";
                    this.errorDialogVisible = true;
                    this.getStudentList();
                    return false;
                    break;
                }

            }
            this.getStudentList();
            return true;
            
        },
        async uploadGraduate(){
            // console.log(data);
            console.log(this.ws);
            var irow;
            for(irow = 0; irow < this.ws.length; irow++){
                let questObject = {
                    number: this.ws[irow].学号
                }
                let result = await this.$http.post(this.$api.AdminUpdateGraduateUrl, questObject);
                console.log(result);
                if(result.data.isSuccess == false){
                    this.errorForm.op = "批量离校";
                    this.errorForm.row = irow;
                    this.errorForm.notice = "无匹配学生学号，请刷新页面并修改错误学生信息";
                    this.errorDialogVisible = true;
                    this.getStudentList();
                    return true;
                    break;
                }

            }
            this.getStudentList();
            return true;
        },
        freshBtnClick(){
            this.isFresh = true;
            this.readBtnClick();
        },
        graduateBtnClick(){
            this.isFresh = false;
            this.readBtnClick();
        },
        readBtnClick() {
            // 点击事件
            document.querySelector(".input-file").click();
        },
        exportData(event) {
            if (!event.currentTarget.files.length) {
                return;
            }
            const that = this;
            // 拿取文件对象
            var f = event.currentTarget.files[0];
            // 用FileReader来读取
            var reader = new FileReader();
            // 重写FileReader上的readAsBinaryString方法
            FileReader.prototype.readAsBinaryString = function (f) {
                var binary = "";
                var wb; // 读取完成的数据
                var outdata; // 你需要的数据
                var reader = new FileReader();
                reader.onload = function () {
                    // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
                    var bytes = new Uint8Array(reader.result);
                    var length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    wb = XLSX.read(binary, {
                        type: "binary"
                    });
                    outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                    console.log(outdata);
                    that.ws = outdata;
                    if(that.isFresh){
                        console.log("fresh");
                        that.importFresh();
                    }
                    else{
                        that.uploadGraduate();
                    }
                };
                reader.readAsArrayBuffer(f);
            };
            reader.readAsBinaryString(f);

        }
    }
}
</script>

<style scoped>
.center{
    margin: auto 0;
    vertical-align: 50%;
}
.input-file {
    display: none;
}
</style>


