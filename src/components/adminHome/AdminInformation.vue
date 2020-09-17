<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/adminWelcome' }">管理员首页</el-breadcrumb-item>
            <el-breadcrumb-item>社团信息管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <!-- 卡片 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <!-- 模糊搜索 -->
                <el-col :span="10">
                    <el-input clearable @clear="getClubList('all', query)"  placeholder="请输入内容" v-model="query">
                        <el-button slot="append" icon="el-icon-search" @click="getClubList('all', query)"></el-button>
                    </el-input>
                </el-col>
                 <!-- 带状态的模糊搜索 -->
                <el-col :span="1"  class="center">
                    <el-button type="text" disabled>状态：</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="getClubList('all', query)">{{quanbu}}</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="getClubList('unaudited', query)">待审核</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="getClubList('pass', query)">运行中</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="getClubList('dissolved', query)">已解散</el-button>
                </el-col>
            </el-row>
        
        <!-- 社团列表 -->
        <el-table :data="clubList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="社团名称" prop="name"></el-table-column>
                <el-table-column label="负责人姓名" prop="presidentName"></el-table-column>
                <el-table-column label="类型" prop="type"></el-table-column>
                <el-table-column label="成立时间" prop="establishmentDate"></el-table-column>
                <el-table-column label="社团状态" prop="status_name"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="clubList[scope.$index].isChecking" 
                            type="primary" 
                            @click="showReplyDialog(scope.$index)">
                            审核
                        </el-button>
                        <el-button v-else 
                            type="primary" 
                            @click="showReplyDialog(scope.$index)">
                            详情
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
        </el-card>
        <!-- 详细内容对话框 -->
        <el-dialog title="社团详情" :visible.sync="replyDialogVisible"
                   width="50%">
            <!-- 展示内容主体区域 -->
            <el-form :model="this.replyForm" label-width="150px">
                <el-form-item label="社团名称:">
                    <el-input v-model="this.replyForm.name" readonly></el-input>
                </el-form-item>
                <el-form-item label="社团状态:">
                    <el-input v-model="this.replyForm.status_name" readonly></el-input>
                </el-form-item>
                <el-form-item label="社团类型:">
                    <el-input v-model="this.replyForm.type" readonly></el-input>
                </el-form-item>
                <el-form-item label="成立时间:">
                    <el-date-picker type="date" v-model="this.replyForm.establishmentDate" style="width: 100%;" readonly></el-date-picker>
                </el-form-item>
                <el-form-item label="社团描述:">
                    <div v-html="this.replyForm.description">{{this.replyForm.description}}</div>
                </el-form-item>
                <el-form-item label="负责人姓名:">
                    <el-input v-model="this.replyForm.presidentName" readonly></el-input>
                </el-form-item>
                <el-form-item label="负责人电话:">
                    <el-input v-model="this.replyForm.phone" readonly></el-input>
                </el-form-item>
                <el-form-item label="负责人邮箱:">
                    <el-input v-model="this.replyForm.mail" readonly></el-input>
                </el-form-item>
                <el-form-item label="负责人年级:">
                    <el-input v-model="this.replyForm.grade" readonly></el-input>
                </el-form-item>
                <el-form-item label="负责人专业:">
                    <el-input v-model="this.replyForm.major" readonly></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <!-- 取消按钮 -->
                <el-button @click="closeReplyDialog()">返 回</el-button>
                <!-- 联系按钮 -->
                <el-button type="primary" @click="showMessageDialog()">联系负责人</el-button>
                <!-- 通过按钮 -->
                <el-button 
                    v-if="replyForm.isChecking"
                    type="success"
                    @click="updateStatusAndRefresh(replyForm.clubId, 1, 1)"
                    icon="el-icon-check" 
                    circle>
                </el-button>
                <!-- 拒绝按钮 -->
                <el-button 
                    v-if="replyForm.isChecking"
                    type="danger" 
                    @click="showMessageDialog()"
                    icon="el-icon-close" 
                    circle>
                </el-button>
            </span>
        </el-dialog>
         <!-- 消息对话框 -->
        <el-dialog title="消息" :visible.sync="messageDialogVisible"
                   width="50%">
            <!-- 展示内容主体区域 -->
            <el-form :model="this.messageForm" label-width="150px">
                <el-form-item label="负责人:">
                    <el-input v-model="this.replyForm.presidentName" readonly></el-input>
                </el-form-item>
                <el-form-item label="标  题:">
                    <el-input 
                        v-model="messageForm.title"
                        type="textarea"
                        :autosize = "{ minRows: 1, maxRows: 2 }"
                        maxlength="2000">
                    </el-input>
                </el-form-item>
                <el-form-item label="内  容:">
                    <el-input 
                        v-model="messageForm.content"
                        type="textarea"
                        :autosize = "{ minRows: 3, maxRows: 10 }"
                        palceholder="请在此处输入您想发送的消息的内容"
                        maxlength="2000"
                        show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <!-- 取消按钮 -->
                <el-button @click="closeMessageDialog()">取 消</el-button>
                <!-- 发送按钮 -->
                <el-button type="primary" @click="sendMessage()">发 送</el-button>
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
            quanbu:"全　部",
            //查询到的当前页社团列表
            clubList: [
                {
                    clubId: 0,
                    isChecking: false,
                    name: "",
                    presidentName: "",
                    type: "",
                    establishmentDate: "",
                    managerId: "",
                    status_name: ""
                },
            ],
            //总条数,用于分页的显示
            totalCount: 0,
            //批复对话框显示状态
            replyDialogVisible: false,
            //消息对话框的显示
            messageDialogVisible: false,
            //分类按钮状态
            buttonUsable: [true, true, true, true],
            //社团详情表单数据
            replyForm: {
                clubId: 0,
                isChecking: false,
                name: "",
                status_name: "",
                type: "",
                description: "",
                establishmentDate: "",
                presidentName: "",
                managerId: "",
                phone: "",
                mail: "",
                grade: "",
                major: ""
            },
            //消息表单
            messageForm:{
                userId: "",
                content: "",
                title: ""
            }
        }
    },
    //创建时显示全部社团列表
    created()
    {
        this.getClubList('all');
    },
    methods: {
        //获取query_in关键字，status状态，第pageNumber_in页的列表      
        async getClubList(status_in = this.status, query_in = this.query, pageNumber_in = this.pageNumber)
        {
            this.status = status_in;
            this.query = query_in;
            this.pageNumber = pageNumber_in;
            let result = await this.$http.post(this.$api.AdminGetClubListUrl,
                {
                    status: this.status,
                    PageQO:{
                        query: this.query,
                        pageNumber: this.pageNumber,
                        pageSize: this.pageSize,
                    },
                });
            while(this.clubList.length > 0){
                this.clubList.pop();
            }
            // console.log(result.data);
            var dataItem;
            for(let i = 0; i < result.data.data.length; i++){
                // console.log(result.data.data[i]);
                let clubItem = {
                    clubId: result.data.data[i].clubId,
                    name: result.data.data[i].name,
                    presidentName: result.data.data[i].presidentName,
                    type: result.data.data[i].type,
                    managerId: result.data.data[i].managerId,
                    establishmentDate: result.data.data[i].establishmentDate.slice(0, result.data.data[i].establishmentDate.indexOf('T')),
                    status_name: this.statusToStr(result.data.data[i].status),
                    isChecking: this.statusToIsChecking(result.data.data[i].status)
                };
                this.clubList.push(clubItem);
            }
            // console.log(this.totalList);
            this.totalCount = parseInt(result.data.totalCount);
        },
        //生成isChecking
        statusToIsChecking(status){
            switch(status) {
                case 2:
                    return true;
                    break;
                default:
                    return false;
                    break;
            }
        },
        //监听pageSize改变的事件
        handleSizeChange(newSize)
        {
            this.pageSize = newSize;
            this.getClubList(this.status, this.query);
        },
        //监听pageNum改变的事件
        handleCurrentChange(newPage)
        {
            this.pageNumber = newPage;
            this.getclubList(this.status, this.query);
        },
        //输出status的文字描述
        statusToStr(status_int)
        {
            switch(status_int) {
                case 0:
                    return '解散';
                    break;
                case 1:
                    return '运行';
                    break;
                case 2:
                    return '待审核';
                    break;
                default:
                    return '未定义';
                    break;
            }
        },
        //弹出详情对话框
        async showReplyDialog(pos_in)
        {
            this.replyForm.clubId = this.clubList[pos_in].clubId;
            this.replyForm.managerId = this.clubList[pos_in].managerId;
            // console.log(this.replyForm.clubId);
            let result = await this.$http.post(this.$api.AdminGetClubDetailsUrl, 
                {
                    clubId: this.replyForm.clubId,
                    managerId: this.replyForm.managerId
                });
            this.replyForm.clubId = result.data.clubId;
            this.replyForm.name = result.data.name;
            this.replyForm.type = result.data.type;
            this.replyForm.description = result.data.description;
            this.replyForm.presidentName = result.data.presidentName;
            this.replyForm.establishmentDate = result.data.establishmentDate.slice(0, result.data.establishmentDate.indexOf('T'));
            this.replyForm.status_name = this.statusToStr(result.data.status);
            this.replyForm.isChecking = this.statusToIsChecking(result.data.status);
            // this.replyForm.isChecking = true;
            this.replyForm.phone = result.data.phone;
            this.replyForm.mail = result.data.mail;
            this.replyForm.grade = result.data.grade;
            this.replyForm.major = result.data.major;

            this.replyDialogVisible = true;
        },
        //关闭详情对话框
        closeReplyDialog()
        {
            this.replyDialogVisible = false;
        },
        showMessageDialog(){
            this.messageForm.userId = this.replyForm.managerId;
            this.messageForm.title = "";
            this.messageForm.content = "";
            this.messageDialogVisible = true;
        },
        closeMessageDialog(){
            this.messageDialogVisible = false;
        },
        //发送消息
        async sendMessage()
        {
            this.closeMessageDialog();
            if(this.messageForm.title == ""){this.messageForm.title = "无标题";}
            // console.log({
            //         userId: this.messageForm.userId,
            //         content: this.messageForm.content,
            //         title: this.messageForm.title
            //     });
            let result = await this.$http.post(this.$api.AdminSendMessageUrl, 
                {
                    userId: this.messageForm.userId,
                    content: this.messageForm.content,
                    title: this.messageForm.title
                });
        },
        //更新状态并刷新
        async updateStatusAndRefresh(clubId_in, status_in, dialog = 0)
        {
            let result = await this.$http.post(this.$api.AdminUpdateClubStatusUrl, 
                {
                    clubId: clubId_in,
                    status: status_in
                });
            this.messageForm.userId = this.replyForm.managerId;
            this.messageForm.title = "社团申请通过";
            this.messageForm.content = "恭喜您的新社团申请已通过审核，社团负责人账号已启用，默认用户名为社团名，默认密码为xxxx。请注意修改密码";
            this.sendMessage();
            switch(dialog)
            {
                case 0://列表界面
                    this.getClubList();
                    break;
                case 1://详情界面
                    this.replyForm.status_name = this.statusToStr(status_in);
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