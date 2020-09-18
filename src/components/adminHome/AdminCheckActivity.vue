<template>
    <div>
         <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/adminWelcome' }">管理员首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动审核</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <!-- 卡片 -->
        <el-card class="box-card">
            <el-row :gutter="24">
                <!-- 模糊搜索 -->
                <el-col :span="10">
                    <el-input clearable @clear="getActivityList('all', query)"  placeholder="请输入内容" v-model="query">
                        <el-button slot="append" icon="el-icon-search" @click="getActivityList('all', query)"></el-button>
                    </el-input>
                </el-col>
                 <!-- 带状态的模糊搜索 -->
                <el-col :span="1"  class="center">
                    <el-button type="text" disabled>状态：</el-button>
                </el-col>
                <!-- <el-col :span="2">
                    <el-button type="primary" @click="getActivityList('all', query)">{{quanbu}}</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="getActivityList('unaudited', query)">待审核</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="getActivityList('pass', query)">已通过</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="getActivityList('failed', query)">未通过</el-button>
                </el-col> -->
				<el-col :span="12">
					<el-button type="primary" @click="getActivityList('all', query)">{{quanbu}}</el-button>
					<el-button type="primary" @click="getActivityList('unaudited', query)">待审核</el-button>
					<el-button type="primary" @click="getActivityList('pass', query)">已通过</el-button>
				    <el-button type="primary" @click="getActivityList('failed', query)">未通过</el-button>
				</el-col>
            </el-row>
        
        <!-- 活动列表 -->
        <el-table :data="activityList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="社团名称" prop="clubName"></el-table-column>
                <el-table-column label="活动名称" prop="name"></el-table-column>
                <el-table-column label="经费" prop="budget"></el-table-column>
                <el-table-column label="活动地点" prop="place"></el-table-column>
                <el-table-column label="活动时间" prop="eventTime"></el-table-column>
                <el-table-column label="审核状态" prop="status_name"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="activityList[scope.$index].status_name == '待审核'" type="primary" 
                            @click="showReplyDialog(scope.$index)">
                            审核
                        </el-button>
                        <el-button v-else type="primary" 
                            @click="showReplyDialog(scope.$index)">
                            详情
                        </el-button>
                    </template>
                </el-table-column>
        </el-table>
		<br>
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
        </el-card>
        <!-- 审核对话框 -->
        <el-dialog title="活动详情" :visible.sync="replyDialogVisible"
                   width="50%" center>
            <!-- 展示内容主体区域 -->
            <el-form :model="this.replyForm" label-width="150px">
                <el-form-item label="社团名称:">
                    <el-input v-model="this.replyForm.clubName" readonly style="width: 82%;"></el-input>
                </el-form-item>
                <el-form-item label="活动名称:">
                    <el-input v-model="this.replyForm.name" readonly style="width: 82%;"></el-input>
                </el-form-item>
                <el-form-item label="是否公开:">
                    <el-input v-model="this.replyForm.isPublic_str" readonly style="width: 82%;"></el-input>
                </el-form-item>
                <el-form-item label="活动经费:">
                    <el-input v-model="this.replyForm.budget" readonly style="width: 82%;"></el-input>
                </el-form-item>
                <el-form-item label="活动地点:">
                    <el-input v-model="this.replyForm.place" readonly style="width: 82%;"></el-input>
                </el-form-item>
                <el-form-item label="活动时间:">
                    <el-date-picker type="date" v-model="this.replyForm.evenTime" style="width: 82%;" readonly></el-date-picker>
                </el-form-item>
                <el-form-item label="提交时间:">
                    <el-date-picker type="date" v-model="this.replyForm.applyDate" style="width: 82%;" readonly></el-date-picker>
                </el-form-item>
                <el-form-item label="审核状态:">
                    <el-input v-model="this.replyForm.status_name" readonly style="width: 82%;"></el-input>
                </el-form-item>
                <el-form-item label="活动描述:">
                    <el-input 
                        v-model="replyForm.description"
                        type="textarea"
                        :autosize = "{ minRows: 3, maxRows: 8 }"
                        readonly
						style="width: 82%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="建    议:">
                    <el-input 
                        v-model="replyForm.suggestion"
                        type="textarea"
						style="width: 82%;"
                        :autosize = "{ minRows: 3, maxRows: 10 }"
                        palceholder="请在此处输入您对这项活动的建议"
                        maxlength="2000"
                        show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <!-- 取消按钮 -->
                <el-button @click="closeReplyDialog()">取 消</el-button>
                <!-- 提交按钮 -->
                <el-button type="primary" @click="submitSuggestion()">提交建议</el-button>
                <!-- 通过按钮 -->
                <el-button 
                    v-if="replyForm.status_name == '待审核'"
                    type="success" 
                    @click="updateStatusAndRefresh(this.replyForm.activityId, 1, 1)"
                    icon="el-icon-check" 
                    circle>
                </el-button>
                <!-- 拒绝按钮 -->
                <el-button 
                    type="danger" 
                    v-if="replyForm.status_name == '待审核'"
                    @click="updateStatusAndRefresh(this.replyForm.activityId, 2, 1)"
                    icon="el-icon-close" 
                    circle>
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
            //获取活动列表参数对象
            query: '',
            status: 'all',
            //当前的页码
            pageNumber: 1,
            //每页显示的条数
            pageSize: 5,
            //查询到的当前页活动列表
            activityList: [
                {
                    actvityId: 0,
                    clubName: "",
                    name: "",
                    budget: 0,
                    place: "",
                    eventTime: "",
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
                actvityId: 0,
                clubName: "",
                name: "",
                budget: 0,
                place: "",
                eventTime: "",
                status_name: "",
                applyDate: "",
                description: "",
                isPublic_str: "",
                adminName: "",
                suggestion: ""
            },
            quanbu: "全　部",
        }
    },
    //创建时显示全部列表
    created()
    {
        this.getActivityList('all');
    },
    methods: {
        //获取query_in关键字，status状态，第pageNumber_in页的列表      
        async getActivityList(status_in = this.status, query_in = this.query, pageNumber_in = this.pageNumber)
        {
            this.status = status_in;
            this.query = query_in;
            this.pageNumber = pageNumber_in;
            let result = await this.$http.post(this.$api.AdminGetActivityListUrl,
                {
                    status: this.status,
                    PageQO:{
                        query: this.query,
                        pageNumber: this.pageNumber,
                        pageSize: this.pageSize,
                    },
                });
            while(this.activityList.length > 0){
                this.activityList.pop();
            }
            // console.log(result.data);
            var dataItem;
            for(let i = 0; i < result.data.data.length; i++){
                // console.log(result.data.data[i]);
                let activityItem = {
                    activityId: result.data.data[i].activityId,
                    clubName: result.data.data[i].clubName,
                    name: result.data.data[i].name,
                    budget: result.data.data[i].budget,
                    place: result.data.data[i].place,
                    eventTime: result.data.data[i].eventTime.slice(0, result.data.data[i].eventTime.indexOf('T')),
                    status_name: this.statusToStr(result.data.data[i].status)
                };
                this.activityList.push(activityItem);
            }
            // console.log(this.sponsorList);
            this.totalCount = parseInt(result.data.totalCount);
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
            this.pageNumber = newPage;
            this.getActivityList();
        },
        //输出status的文字描述
        statusToStr(status_int)
        {
            switch(status_int) {
                case 0:
                    return '待审核';
                    break;
                case 1:
                    return '已通过';
                    break;
                case 2:
                    return '未通过';
                    break;
                default:
                    return '未定义';
                    break;
            }
        },
        //弹出详情对话框
        async showReplyDialog(pos_in)
        {
            this.replyForm.activityId = this.activityList[pos_in].activityId;
            console.log({
                    activityId: this.replyForm.activityId
                });
            let result = await this.$http.post(this.$api.AdminGetActivityDetailsUrl, 
                {
                    activityId: this.replyForm.activityId
                });
            this.replyForm.activityId = result.data.activityId;
            this.replyForm.clubName = result.data.clubName;
            this.replyForm.name = result.data.name;
            this.replyForm.budget = result.data.budget;
            this.replyForm.place = result.data.place;
            this.replyForm.eventTime = result.data.eventTime.slice(0, result.data.eventTime.indexOf('T'));
            this.replyForm.status_name = this.statusToStr(result.data.status);
            this.replyForm.applyDate = result.data.applyDate.slice(0, result.data.applyDate.indexOf('T'));
            this.replyForm.description = result.data.description;
            this.replyForm.isPublic_str = result.data.isPublic?"公开活动":"社内活动";
            this.replyForm.adminName = result.data.adminName;
            this.replyForm.suggestion = result.data.suggestion;
            this.replyDialogVisible = true;
        },
        //关闭详情对话框
        closeReplyDialog()
        {
            this.replyDialogVisible = false;
        },
        //提交建议并关闭批复对话框
        async submitSuggestion()
        {
            this.closeReplyDialog();
            let result = await this.$http.post(this.$api.AdminUpdateActSuggestionUrl, 
                {
                    suggestion: this.replyForm.suggestion
                });
        },
        //更新审核状态并刷新
        async updateStatusAndRefresh(activityId_in, status_in, dialog = 0)
        {
            let result = await this.$http.post(this.$api.AdminUpdateActStatusUrl, 
                {
                    activityId: activityId_in,
                    status: status_in
                });
            switch(dialog)
            {
                case 0://列表界面
                    this.getActivityList();
                    break;
                case 1://详情界面
                    this.replyForm.status_name = statusToStr(status_in);
                    break;
                default:
                    console.log("出现未定义界面编号");
                    break;
            }
        },
    }
}
</script>

<style scoped>
.center{
    margin: auto 0;
    vertical-align: 50%;
}
</style>
