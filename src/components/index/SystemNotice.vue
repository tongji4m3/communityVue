<template>
    <div>

        <el-divider></el-divider>
        <!--        <div v-for="n in evenNumbers">-->
        <div v-for="announcement in AnnouncementList">
            <el-card>
                <div id="announcementContent">{{ announcement.content }}</div>
                <br>
                <div id="announcementTime">{{ announcement.time }}</div>
                <br>
                <el-button id="checkButton" type="text" @click="showDialog(announcement.announcementId)">查看</el-button>
            </el-card>
            <br>
        </div>

        <!--        展示系统公告对话框-->
        <el-dialog title="系统公告详情" ref="showFormRef" :visible.sync="showDialogVisible"
                   width="50%">
            <!--            展示内容主体区域 -->
            <el-form :model="addForm" label-width="150px">
                <el-form-item label="系统公告标题:">
                    <el-input v-model="addForm.title" disabled></el-input>
                </el-form-item>
                <!--                <el-form-item label="系统公告内容:">-->
                <!--                    <el-input v-model="addForm.content" disabled></el-input>-->
                <!--                </el-form-item>-->
                <el-form-item label="系统公告内容:" prop="content">
                    <el-input
                        type="textarea"
                        :rows="7"
                        v-model="addForm.content" disabled>
                    </el-input>
                </el-form-item>
                <el-form-item label="系统公告时间:" prop="time">
                    <el-date-picker type="date" v-model="addForm.time" style="width: 100%;" disabled></el-date-picker>
                </el-form-item>
            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="closeDialogVisible">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {

        return {
            //获取系统公告列表参数对象
            query: '',
            //当前的页码
            pageNumber: 1,
            //每页显示的条数
            pageSize: 10,

            //查询到的当页系统公告
            AnnouncementList: [],
            AnnouncementContent: [],
            //总条数,用于分页的显示
            totalCount: 0,
            showDialogVisible: false,

            //添加系统公告表单数据
            addForm: {
                AnnouncementId: "",
                title: "",
                content: "",
                time: "",
                status: false,
            },
            // numbers: [1, 2, 3, 4, 5],
        }
    },
    // computed: {
    //     evenNumbers: function () {
    //         this.getAnnouncementList();
    //         let myThis = this;
    //         console.log(this.AnnouncementContent);
    //         // return myThis.AnnouncementList.content
    //         return this.AnnouncementList.content
    //     }
    // },
    //一开始就显示系统公告列表
    created() {
        this.getAnnouncementList();
    },
    methods: {
        async getAnnouncementList() {
            let result = await this.$http.post(this.$api.GetAnnouncementsUrl,
                {
                    query: this.query,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    status: true
                });
            this.AnnouncementList = result.data.data;
            for (let i = 0; i < this.AnnouncementList.length; i++) {
                this.AnnouncementList[i].time = this.AnnouncementList[i].time.substring(0, 10);
                this.AnnouncementContent[i] = this.AnnouncementList[i].content;
            }
            this.totalCount = parseInt(result.data.totalCount);
        },
        //监听pageSize改变的事件
        handleSizeChange(newSize) {
            this.pageSize = newSize;
            this.getAnnouncementList();
        },
        //监听pageNum改变的事件
        handleCurrentChange(newPage) {
            this.pageNumber = newPage;
            this.getAnnouncementList();
        },

        async showDialog(AnnouncementId) {
            console.log(AnnouncementId);
            console.log(this.AnnouncementList[0].AnnouncementId);
            let result = await this.$http.post(this.$api.GetOneAnnouncementUrl + "/" + AnnouncementId);
            this.addForm = result.data;
            this.showDialogVisible = true;
        },
        //显示系统公告详情页面按确定后的触发事件
        closeDialogVisible() {
            this.showDialogVisible = false;
        },
    }
}
</script>

<style scoped>
#announcementContent{
    float: left;
}
#announcementTime{
    float: right;
}
#announcementId{
    float: right;
}
#checkButton {
    float: right;
    /*margin-top: 10px;*/
}
</style>