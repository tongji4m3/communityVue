<template>
    <div>
         <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/adminWelcome' }">管理员首页</el-breadcrumb-item>
            <el-breadcrumb-item>社团赞助审核</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <!-- 卡片 -->
        <el-card class="box-card">
            <!-- 分类查询 -->
            <el-row :gutter="20">
                <el-col :span="3"  class="center">
                    <p>分类：</p>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="getSponsorList('all', 1)">全部</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="getSponsorList('unaudited', 1)">待审核</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="getSponsorList('pass', 1)">已通过</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="getSponsorList('failed', 1)">未通过</el-button>
                </el-col>
            </el-row>
        </el-card>
        <!-- 赞助列表 -->
        <el-table :data="sponsorList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="社团名称" prop="clubName"></el-table-column>
                <el-table-column label="赞助商" prop="sponsor"></el-table-column>
                <el-table-column label="赞助金额" prop="amount"></el-table-column>
                <el-table-column label="提交时间" prop="applyTime"></el-table-column>
                <el-table-column label="审核状态" prop="status_name"></el-table-column>
                <el-table-column label="申请详情">
                    <template slot-scope="scope">
                        <el-button type="success" 
                            @click="showReplyDialog(scope.$index)">
                            查看详情
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- 通过按钮 -->
                        <el-button 
                            type="success" 
                            @click="updateStatusAndRefresh(scope.row.sponsorshipId, 1, 0)"
                            icon="el-icon-check" 
                            circle>
                        </el-button>
                        <!-- 拒绝按钮 -->
                        <el-button 
                            type="danger" 
                            @click="updateStatusAndRefresh(scope.row.sponsorshipId, 2, 0)"
                            icon="el-icon-close" 
                            circle>
                        </el-button>
                    </template>
                </el-table-column>
        </el-table>
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
         <!-- 展示批复对话框 -->
        <el-dialog title="活动详情" :visible.sync="replyDialogVisible"
                   width="50%">
            <!-- 展示内容主体区域 -->
            <el-form :model="this.replyForm" label-width="150px">
                <el-form-item label="社团名称:">
                    <el-input v-model="this.replyForm.clubName" readonly></el-input>
                </el-form-item>
                <el-form-item label="赞助商:">
                    <el-input v-model="this.replyForm.sponsor" readonly></el-input>
                </el-form-item>
                <el-form-item label="赞助金额:">
                    <el-input v-model="this.replyForm.amount" readonly></el-input>
                </el-form-item>
                <el-form-item label="提交时间:">
                    <el-date-picker type="date" v-model="this.replyForm.applyTime" style="width: 100%;" readonly></el-date-picker>
                </el-form-item>
                <el-form-item label="审核状态:">
                    <el-input v-model="this.replyForm.status_name" readonly></el-input>
                </el-form-item>
                <el-form-item label="赞助商需求:">
                    <el-input 
                        v-model="replyForm.requirement"
                        type="textarea"
                        :autosize = "{ minRows: 3, maxRows: 8 }"
                        readonly>
                    </el-input>
                </el-form-item>
                <el-form-item label="建议:">
                    <el-input 
                        v-model="replyForm.suggestion"
                        type="textarea"
                        :autosize = "{ minRows: 3, maxRows: 10 }"
                        palceholder="请在此处输入您对这项赞助的建议"
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
                    type="success" 
                    @click="updateStatusAndRefresh(this.replyForm.sponsorshipId, 1, 1)"
                    icon="el-icon-check" 
                    circle>
                </el-button>
                <!-- 拒绝按钮 -->
                <el-button 
                    type="danger" 
                    @click="updateStatusAndRefresh(this.replyForm.sponsorshipId, 2, 1)"
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
            //获取赞助列表参数对象
            query: 'all',
            //当前的页码
            pageNumber: 1,
            //每页显示的条数
            pageSize: 5,
            //查询到的当前页赞助列表
            sponsorList: [
                {
                    sponsorshipId: 0,
                    clubName: "",
                    applyTime: "",
                    sponsor: "",
                    amount: 0,
                    adminName: "",
                    status_name: "",
                    suggestion: ""
                },
            ],
            //总条数,用于分页的显示
            totalCount: 0,
            //批复对话框显示状态
            replyDialogVisible: false,
            //分类按钮状态
            buttonUsable: [true, true, true, true],
            //赞助审核表单数据
            replyForm: {
                sponsorshipId: 0,
                clubName: "",
                applyTime: "",
                sponsor: "",
                amount: 0,
                requirement: "",
                // adminName: "",
                status_name: "",
                suggestion: ""
            },
        }
    },
    //创建时显示全部赞助列表
    created()
    {
        this.getSponsorList('all');
    },
    methods: {
        //获取query_in分类，第pageNumber_in页的赞助列表      
        async getSponsorList(query_in = this.query, pageNumber_in = this.pageNumber)
        {
            this.query = query_in;
            this.pageNumber = pageNumber_in;
            let result = await this.$http.post(this.$api.AdminGetSponsorListUrl,
                {
                    query: this.query,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    status: true
                });
            while(this.sponsorList.length > 0){
                this.sponsorList.pop();
            }
            // console.log(result.data);
            var dataItem;
            for(let i = 0; i < result.data.data.length; i++){
                // console.log(result.data.data[i]);
                let sponsorItem = {
                    sponsorshipId: result.data.data[i].sponsorshipId,
                    clubName: result.data.data[i].clubName,
                    applyTime: result.data.data[i].applyTime.slice(0, result.data.data[i].applyTime.indexOf('T')),
                    sponsor: result.data.data[i].sponsor,
                    amount: result.data.data[i].amount,
                    status_name: this.status_str(result.data.data[i].status)
                };
                this.sponsorList.push(sponsorItem);
            }
            // console.log(this.sponsorList);
            this.totalCount = parseInt(result.data.totalCount);
        },
        //监听pageSize改变的事件
        handleSizeChange(newSize)
        {
            this.pageSize = newSize;
            this.getSponsorList(this.query);
        },
        //监听pageNum改变的事件
        handleCurrentChange(newPage)
        {
            this.pageNumber = newPage;
            this.getSponsorList(this.query);
        },
        //输出status的文字描述
        status_str(status_int)
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
            this.replyForm.sponsorshipId = this.sponsorList[pos_in].sponsorshipId;
            // console.log(this.replyForm.sponsorshipId);
            // let result = await this.$http.post(this.$api.AdminGetSponsorshipDetailsUrl, 
            //     {
            //         sponsorshipId: this.replyForm.sponsorshipId
            //     });
            // this.replyForm.suggestion = result.data.suggestion;
            // this.replyForm.requirement = result.data.requirement;
            // this.replyForm.clubName = result.data.clubName
            // this.replyForm.applyTime = result.data.applyTime;
            // this.replyForm.sponsor = result.data.sponsor;
            // this.replyForm.amount = result.data.amount;
            // this.replyForm.status_name = status_str(result.data.status);
            this.replyForm.clubName = this.sponsorList[pos_in].clubName
            this.replyForm.applyTime = this.sponsorList[pos_in].applyTime;
            this.replyForm.sponsor = this.sponsorList[pos_in].sponsor;
            this.replyForm.amount = this.sponsorList[pos_in].amount;
            this.replyForm.status_name = this.sponsorList[pos_in].status_name;
            this.replyForm.suggestion = ""
            this.replyForm.requirement = "无"
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
            let result = await this.$http.post(this.$api.AdminUpdateSuggestionUrl, 
                {
                    suggestion: this.replyForm.suggestion
                });
        },
        //更新审核状态并刷新
        async updateStatusAndRefresh(sponsorshipId_in, status_in, dialog = 0)
        {
            let result = await this.$http.post(this.$api.AdminUpdateStatusUrl, 
                {
                    sponsorshipId: sponsorshipId_in,
                    status: status_in
                });
            switch(dialog)
            {
                case 0://列表界面
                    this.getSponsorList();
                    break;
                case 1://详情界面
                    this.replyForm.status_name = status_str(status_in);
                    break;
                default:
                    console.log("出现未定义界面变号");
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

