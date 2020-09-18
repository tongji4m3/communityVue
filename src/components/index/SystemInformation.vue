<template>
    <div>
        <div id="announce_head">
            <img src="../../assets/img/icon_announcement.png" alt="" style="vertical-align: middle">
            <span> <h3>   消息</h3></span>
        </div>
        <el-divider></el-divider>
        <!--        <div v-for="n in evenNumbers">-->
        <div v-for="information in MessageList">
            <el-card id="myCard">
                <div id="announcementContent">{{ information.content }}</div>
                <br>
                <div id="announcementTime">{{ information.time }}</div>
                <br>
                <el-button id="checkButton" type="text" @click="showDialog(information.messageId)">查看</el-button>
            </el-card>
            <br>
        </div>
        <el-dialog ref="showFormRef" :visible.sync="showDialogVisible"
                   width="50%">
            <!--            展示内容主体区域 -->
            <div slot="title">
                <h1>
                    {{addForm.title}}
                </h1>
                <div>
                    {{addForm.time}}
                </div>
            </div>
            {{addForm.content}}
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="closeDialogVisible">确 定</el-button>
  </span>
        </el-dialog>
<!--        &lt;!&ndash;        展示系统消息对话框&ndash;&gt;-->
<!--        <el-dialog title="系统消息详情" ref="showFormRef" :visible.sync="showDialogVisible"-->
<!--                   width="50%">-->
<!--            &lt;!&ndash;            展示内容主体区域 &ndash;&gt;-->
<!--            <el-form :model="addForm" label-width="150px">-->
<!--                <el-form-item label="系统消息标题:">-->
<!--                    <el-input v-model="addForm.title" disabled></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="系统消息内容:">-->
<!--                    <el-input v-model="addForm.content" disabled></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="系统消息时间:" prop="time">-->
<!--                    <el-date-picker type="date" v-model="addForm.time" style="width: 100%;" disabled></el-date-picker>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            &lt;!&ndash;            底部区域&ndash;&gt;-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--    <el-button type="primary" @click="closeDialogVisible">确 定</el-button>-->
<!--  </span>-->
<!--        </el-dialog>-->
    </div>
</template>

<script>
    export default {
        data()
        {
            return {
                //获取系统消息列表参数对象
                query: '',
                //当前的页码
                pageNumber: 1,
                //每页显示的条数
                pageSize: 10,

                //查询到的当页系统消息
                MessageList: [],
                //总条数,用于分页的显示
                totalCount: 0,
                //添加,修改,展示系统消息对话框的显示与隐藏
                showDialogVisible: false,

                //添加系统消息表单数据
                addForm: {
                    MessageId: "",
                    title:"",
                    content: "",
                    time: "",
                    read:false,
                },
                //添加系统消息的校验规则
                addFormRules: {}
            }
        },
        //一开始就显示系统消息列表
        created()
        {
            this.getMessageList();
        },
        methods: {
            async getMessageList()
            {
                let result = await this.$http.post(this.$api.GetMessagesUrl,
                    {
                        query: this.query,
                        pageNumber: this.pageNumber,
                        pageSize: this.pageSize,
                    });
                console.log(result);
                this.MessageList = result.data.data;
                console.log(this.MessageList[0].read);
                for (let i = 0; i < this.MessageList.length; i++)
                {
                    this.MessageList[i].time = this.MessageList[i].time.substring(0, 10);
                    this.MessageList[i].read = this.MessageList[i].read.toString();
                }
                this.totalCount = parseInt(result.data.totalCount);
            },
            //监听pageSize改变的事件
            handleSizeChange(newSize)
            {
                this.pageSize = newSize;
                this.getMessageList();
            },
            //监听pageNum改变的事件
            handleCurrentChange(newPage)
            {
                this.pageNumber = newPage;
                this.getMessageList();
            },

            async showDialog(MessageId)
            {
                console.log(MessageId);
                let result = await this.$http.post(this.$api.GetOneMessagesUrl + '/' + MessageId);
                this.addForm = result.data;
                this.addForm.time=this.addForm.time.substring(0,10);
                this.showDialogVisible = true;
            },
            //显示系统消息详情页面按确定后的触发事件
            closeDialogVisible()
            {
                this.showDialogVisible = false;
            },
            async read(MessageId)
            {
                let result = await this.$http.post(this.$api.SetMessageReadUrl + '/' + MessageId);
                await this.getMessageList();
            }
        }
    }
</script>

<style scoped></style>

