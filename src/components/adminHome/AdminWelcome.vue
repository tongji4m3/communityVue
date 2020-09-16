<template>
    <div>
        <el-card class="box-card1" shadow="never">
            <div class="text1 item1" >

                <img src="../../assets/img/welcome.png" alt="" style="vertical-align: middle">
                <span> 欢迎回来 {{username}} ！</span>
            </div>
        </el-card>

        <!--        日历按钮-->
        <el-button type="text" @click="openCalendar">查看日历</el-button>
        <el-button type="text" @click="openSchoolCalendar">查看校历</el-button>
        <!--        日历框-->
        <el-dialog :visible.sync="showCalendar"
                   width="50%">
            <el-calendar>
            </el-calendar>
        </el-dialog>

        <el-dialog :visible.sync="showSchoolCalendar"
                   width="50%">
            <img src="../../assets/img/calendar.jpg" alt="" style="width: 100%;margin:0;">
        </el-dialog>

        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
                <h3 class="medium">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>

        <el-card>

            <div>
                <img src="../../assets/img/icon_announcement.png" alt="" style="vertical-align: middle">
                <span> <h3>   系统公告</h3></span>
            </div>
            <el-divider></el-divider>
            <!--            搜索与添加-->
            <el-row :gutter="20">
                <el-col :span="7">
                    <!--                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特点内容的系统公告-->
                    <el-input clearable @clear="getAnnouncementList" placeholder="请输入内容" v-model="query">
                        <el-button slot="append" icon="el-icon-search" @click="getAnnouncementList"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!--            系统公告列表 只展示一些系统公告信息,详细文本可在详情查看-->
            <el-table :data="AnnouncementList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="系统公告时间" prop="time"></el-table-column>
                <el-table-column label="显示详情">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="showDialog(scope.row.announcementId)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNumber"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </el-card >

        <!--        展示系统公告对话框-->
        <el-dialog title="系统公告详情" ref="showFormRef" :visible.sync="showDialogVisible"
                   width="50%">
            <!--            展示内容主体区域 -->
            <el-form :model="addForm" label-width="150px">
                <el-form-item label="系统公告标题:">
                    <el-input v-model="addForm.title" disabled></el-input>
                </el-form-item>
                <el-form-item label="系统公告内容:">
                    <el-input v-model="addForm.content" disabled></el-input>
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
    data()
    {
        return {
            //获取系统公告列表参数对象
            query: '',
            //当前的页码
            pageNumber: 1,
            //每页显示的条数
            pageSize: 5,

            //查询到的当页系统公告
            AnnouncementList: [],
            //总条数,用于分页的显示
            totalCount: 0,
            showDialogVisible: false,

            showCalendar: false,
            showSchoolCalendar: false,

            //添加系统公告表单数据
            addForm: {
                AnnouncementId: "",
                title:"",
                content: "",
                time: "",
                status: false,
            },

            username: window.sessionStorage.getItem('name')
        }
    },
    //一开始就显示系统公告列表
    created()
    {
        this.getAnnouncementList();
    },
    methods: {
        async getAnnouncementList()
        {
            let result = await this.$http.post(this.$api.GetAnnouncementsUrl,
                {
                    query: this.query,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    status: true
                });
            this.AnnouncementList = result.data.data;
            for (let i = 0; i < this.AnnouncementList.length; i++)
            {
                this.AnnouncementList[i].time=this.AnnouncementList[i].time.substring(0,10)
            }
            this.totalCount = parseInt(result.data.totalCount);
        },
        //监听pageSize改变的事件
        handleSizeChange(newSize)
        {
            this.pageSize = newSize;
            this.getAnnouncementList();
        },
        //监听pageNum改变的事件
        handleCurrentChange(newPage)
        {
            this.pageNumber = newPage;
            this.getAnnouncementList();
        },

        async showDialog(AnnouncementId)
        {
            let result = await this.$http.post(this.$api.GetOneAnnouncementUrl + "/" + AnnouncementId);
            this.addForm = result.data;
            this.showDialogVisible = true;
        },
        //显示系统公告详情页面按确定后的触发事件
        closeDialogVisible()
        {
            this.showDialogVisible = false;
        },

        async openCalendar()
        {
            this.showCalendar = true;
        },
        async openSchoolCalendar()
        {
            this.showSchoolCalendar = true;
        },
    }
}
</script>
<style>
    *{
        margin: 0;
        padding: 0;
    }
    .text1 {
        font-size: 16px;
        /*color: #409EFF;*/
    }
    .box-card1 {
        width: 95%;
        height:40px;
        padding: 2px;
        margin: 10px;

        display: flex;
        align-items: center;
    }
    .box-card1 img{

        height:20px;
    }

    #announce{
        width: 95%;
        height:300px;
        padding: 2px;
        margin-left: 10px;
        margin-top: 30px;
        margin-right: 20px;
    }

    #announce_head{
        display: flex;
    }

    #announce_head img{
        height: 30px;
        margin-right: 10px;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

</style>
