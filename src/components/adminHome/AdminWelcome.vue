<template>
    <div>
        <el-row :gutter="24" class="card-row">
            <el-col :span="6">
                <el-card class="card0" :body-style="{ padding: '20px'}">
                    <br>
                    <div class="image" >
                        <img width="140" height="140" src="https://tongji4m3.oss-cn-beijing.aliyuncs.com/f_f_object_156_s512_f_object_156_0.png">
                    </div>
                    <br><br>
                    <div class="image">{{username}}</div>
                    <br><br>
                    <div class="image">
                        <el-button @click="openCalendar" type="text">
                            查看日历
                        </el-button>
                        <el-button @click="openSchoolCalendar" type="text">
                            查看校历
                        </el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card class="card1" :body-style="{ padding: '20px'}">
                    <!--                    系统公告列表 只展示一些系统公告信息,详细文本可在详情查看-->
                    <div id="announce_head">
                        <img src="../../assets/img/icon_announcement.png" alt="" style="vertical-align: middle">
                        <span @click="SystemNotice"> <h3>   系统公告</h3></span>
                        <!--                        <span @click="SystemNotice" class="more"> <h3>更多</h3></span>-->
                    </div>
                    <!--                    <div @click="SystemNotice">系统公告：</div>-->

                    <el-table :data="AnnouncementList" height="300" :cell-style="{padding:'5px 0'}">
                        <el-table-column type="index" width="40"></el-table-column>
                        <el-table-column label="标题" prop="title"></el-table-column>
                        <el-table-column label="系统公告时间" prop="time"></el-table-column>
                        <el-table-column label="详情">
                            <template slot-scope="scope">
                                <el-button type="text" @click="showDialog(scope.row.announcementId)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>

        <!-- 待办事项 -->
        <el-card class="chart-card" >
            <div id="announce_head">
                <img src="../../assets/img/mention.png" alt="" style="vertical-align: middle">
                <span> <h3>   待办事项</h3></span>
            </div>
            <el-divider></el-divider>
            <div id="chart" style="width: 100%;height:300px;"/>
        </el-card>


        <!--        展示系统公告对话框-->
        <el-dialog title="系统公告详情" ref="showFormRef" :visible.sync="showDialogVisible"
                   width="50%">
            <!--            展示内容主体区域 -->
            <el-form :model="addForm" label-width="150px">
                <el-form-item label="系统公告标题:">
                    <el-input v-model="addForm.title" readonly></el-input>
                </el-form-item>
                <el-form-item label="系统公告内容:">
                    <el-input v-model="addForm.content" readonly></el-input>
                </el-form-item>
                <el-form-item label="系统公告时间:" prop="time">
                    <el-date-picker type="date" v-model="addForm.time" style="width: 100%;" readonly></el-date-picker>
                </el-form-item>
            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="closeDialogVisible">确 定</el-button>
            </span>
        </el-dialog>

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
            pageSize: 100,

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
    //一开始就显示系统公告列表，待办事项
    created()
    {
        this.getAnnouncementList();
    },
    mounted()
    {
        this.genChart();
    },
    methods: {
        async genChart(){
            let chart = this.$echarts.init(document.getElementById('chart'),'light');
            let result = await this.$http.post(this.$api.AdminGetTodoUrl);
            let resultData = [
                result.data.club,
                result.data.sponsorship,
                result.data.activity
            ]
            // 绘制图表
            chart.setOption({
                title: {
                    text: ''
                },
                tooltip: {},
                legend: {
                    data:['待处理数量']
                },
                xAxis: {
                    
                },
                yAxis: {
                    data: ["社团","赞助","活动"],
                    nameTextStyle: {
                        fontSize: 15
                    },
                    axisLabel: {
                        fontSize: 15
                    }
                },
                series: [{
                    name: '待处理数量',
                    type: 'bar',
                    data: resultData,
                    barWidth: '30%'
                }],
            });
        },
        async getAnnouncementList()
        {
            let result = await this.$http.post(this.$api.AdminGetAnnouncementsUrl,
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
            this.addForm.time=this.addForm.time.substring(0,10);
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
        async SystemNotice()
        {
            await this.$router.push('/principalSystemNotice');
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
    .chart-card {
        width: 95%;
        margin: 10px;
		padding: 2px;
        /* margin-bottom: 50px; */
        align-items: center;
    }
	#box-card2{
		width: 95%;
		margin: 10px;
		padding: 2px;
		/* margin-bottom: 50px; */
		align-items: center;
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
    .card-row {
        margin-bottom: 40px;
        height: 380px;
        display: flex;
        flex-wrap: wrap;
    }

    .card0 {
        /*min-width: 100%;*/
        height: 100%;
        margin-right: 20px;

        /*transition: all .5s;*/
    }

    .card1 {
        /*min-width: 100%;*/
        height: 100%;
        margin-right: 20px;
        width: 100%;
        /*transition: all .5s;*/
    }

    .image{
        width: 100%;
        /*height:100%;*/
        display: block;
        text-align:center;
    }

</style>
