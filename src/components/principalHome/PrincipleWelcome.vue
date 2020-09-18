<template>
    <div>
        <el-row :gutter="0" class="el-row">
            <el-col :span="6">
                <el-card class="card0" :body-style="{ padding: '20px'}">
                    <br>
                    <div class="image" >

<!--                        <img width="140" height="140" src="imgUrl">-->
                        <img width="140" height="140" src="../../assets/img/jitaxiehui.png">
                    </div>
                    <br>
                    <div class="image">{{clubForm.type}}</div>
                    <br>
                    <div class="image">{{clubForm.name}}负责人</div>
                    <br>
                    <div class="image">{{clubForm.number}} {{clubForm.presidentName}}</div>
<!--                    <br>-->
<!--                    <div class="image">{{clubForm.establishmentDate}}</div>-->

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
                        <el-table-column label="标题" prop="title" width="490%"></el-table-column>
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
		<!-- 图表 -->
        <el-row :gutter="0" class="el-row">
            <el-col :span="24">
                <el-card>
                    <el-row :gutter="20">
                        <el-col :span="12"><div id="gradeChart" style="width: 600px;height:400px;"></div></el-col>
                        <el-col :span="12"><div id="majorChart" style="width: 600px;height:400px;"></div></el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <!--        展示系统公告对话框-->
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


    </div>

</template>

<script>
import {
    quillEditor
} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
    name: 'FuncFormsEdit',
    components: {
        quillEditor
    },
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
            //社团成员年级分布图表数据
            gradeGraphDescription:["16级","17级","18级","19级","20级","21级"],
            gradeGraphData:[5, 20, 36, 10, 10,20],
            //社团成员专业分布图表数据
            majorGraphData:[
                {value:235, name:'软件工程'},
                {value:400, name:'土木工程'},
                {value:400, name:'车辆工程'},
                ],

            editDialogVisible: false,
            editDialogVisible2: false,
            //添加赞助表单数据
            clubForm: {
                name: "",
                description:"",
                logo:"",
                status: false,
                type:"",
                presidentName:"",
                establishmentDate:"",
                number:"",
            },
            //添加赞助申请的校验规则
            clubFormRules: {},

            content: null,
            editorOption: {},

            imgUrl: window.sessionStorage.getItem('imgUrl'),
        }
    },
    mounted()
    {
        this.getCommunityGraph();

    },
    //一开始就显示赞助列表
    created()
    {
        this.getAnnouncementList();
        this.getClubInfo();

    },
    methods: {
        async getCommunityGraph()
        {
            let result = await this.$http.post(this.$api.PrincipalGetCommunityGraph);

            this.gradeGraphDescription = result.data.gradeGraphDescription;
            this.gradeGraphData = result.data.gradeGraphData;
            this.majorGraphData = result.data.majorGraphData;
            console.log("getCommunityGraph")
            console.log(this.gradeGraphDescription);
            this.drawPeople();

            /*
            //社团成员年级分布图表数据
            gradeGraphDescription:["16级","17级","18级","19级","20级","21级"],
                gradeGraphData:[5, 20, 36, 10, 10,20],
            //社团成员专业分布图表数据
            majorGraphData:[
            {value:235, name:'软件工程'},
            {value:400, name:'土木工程'},
            {value:400, name:'车辆工程'},
            */
        },
        drawPeople(){
            //年级分布图
            // 基于准备好的dom，初始化echarts实例
            let gradeChart = this.$echarts.init(document.getElementById('gradeChart'),'light')
            // 绘制图表
            gradeChart.setOption({
                title: { text: '社团成员分布',left:'center'},
                tooltip: {},
                xAxis: {
                    data: this.gradeGraphDescription
                },
                yAxis: {},
                series: [{
                    name: '人数',
                    type: 'bar',
                    data: this.gradeGraphData
                }]
            });

            //年级分布饼状图
            let majorChart = this.$echarts.init(document.getElementById('majorChart'), 'light');
            majorChart.setOption({
                title: { text: '社团人员专业分布',left:'center' },
                series : [
                    {

                        name: '访问来源',
                        type: 'pie',    // 设置图表类型为饼图
                        radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                        data: this.majorGraphData
                    }
                ]
            })

        },

        async getClubInfo()
        {
            let result = await this.$http.post(this.$api.PrincipalGetClubInfo);
            this.clubForm = result.data;
            // console.log(this.clubForm.description);

            if(this.clubForm.type===0){
                this.clubForm.type="学术科技类";
            }
            else if(this.clubForm.type===1){
                this.clubForm.type="传统文化与文学类";
            }
            else if(this.clubForm.type===2){
                this.clubForm.type="公益实践类";
            }
            else if(this.clubForm.type===3){
                this.clubForm.type="文化艺术类";
            }
            else if(this.clubForm.type===4){
                this.clubForm.type="体育竞技类";
            }
            else{
                this.clubForm.type="创新创业类";
            }
        },
        cancelEdit()
        {
            this.editDialogVisible = false;
            this.$message.info("取消修改社团信息!");
        },
        async showEditClubInfo()
        {
            let result = await this.$http.post(this.$api.PrincipalGetClubInfo);
            this.clubForm = result.data;
            this.editDialogVisible = true;
        },
        async showEditClubLogo()
        {
            let result = await this.$http.post(this.$api.PrincipalGetClubInfo);
            this.clubForm = result.data;
            this.editDialogVisible2 = true;
        },
        //点击确定按钮后,修改社团信息
        async editClubInfo()
        {
            this.$refs.clubFormRef.validate(
                async valid =>
                {
                    if (!valid) return;
                    // console.log(this.clubForm);
                    await this.$http.post(this.$api.PrincipalEditClubInfo, this.clubForm);
                    // this.clearclubForm();
                    // this.$refs.clubFormRef.resetFields();
                    //关闭对话框
                    this.editDialogVisible = false;
                    //    刷新数据列表
                    await this.getClubInfo();
                    //    提示成功
                    this.$message.success("修改社团信息成功!");
                }
            );
        },
        async editClubLogo()
        {
            this.$refs.clubFormRef.validate(
                async valid =>
                {
                    if (!valid) return;
                    // console.log(this.clubForm);
                    await this.$http.post(this.$api.PrincipalEditClubInfo, this.clubForm);
                    // this.clearclubForm();
                    // this.$refs.clubFormRef.resetFields();
                    //关闭对话框
                    this.editDialogVisible2 = false;
                    //    刷新数据列表
                    await this.getClubInfo();
                    //    提示成功
                    this.$message.success("修改社团Logo成功!");
                }
            );
        },
        async deleteClub()
        {
            await this.$http.post(this.$api.PrincipalDissolveClub);
        },
        async getAnnouncementList()
        {
            let result = await this.$http.post(this.$api.GetAnnouncementsUrl,
                {
                    query: this.query,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    status: true,
                    value: new Date()//日历
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

<style scoped>


.el-row {
    margin-bottom: 20px;
    height: 380px;
    display: flex;
    flex-wrap: wrap;
}

.el-row2 {
    margin-bottom: 20px;
    height: 100px;
    display: flex;
    flex-wrap: wrap
}

.el-row3 {
    /*margin-bottom: 20px;*/
    height: 600px;
    display: flex;
    flex-wrap: wrap
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
.img{
    width: 100%;
    display: block;
    text-align:center;
}
.more{
    /*width: 100%;*/
    /*height:100%;*/
    /*display: block;*/
    text-align:right;
}
/*.card1{*/
/*    !*margin-left: 10px;*!*/
/*    !*margin-right: 10px;*!*/
/*    height:100%;*/
/*}*/
#announce_head{
    display: flex;
}

#announce_head img{
    height: 30px;
    margin-right: 10px;
}
</style>
<<<<<<< HEAD
=======

<!--<template>-->
<!--    <div>-->

<!--        <el-card class="box-card1" shadow="never">-->
<!--            <div class="text1 item1" >-->

<!--                <img src="../../assets/img/welcome.png" alt="" style="vertical-align: middle">-->
<!--                <span> 欢迎回来 {{username}} ！</span>-->
<!--            </div>-->

<!--        </el-card>-->

<!--        &lt;!&ndash;       日历按钮&ndash;&gt;-->
<!--        &lt;!&ndash; <el-button type="text" @click="openCalendar">查看日历</el-button>-->
<!--        <el-button type="text" @click="openSchoolCalendar">查看校历</el-button> &ndash;&gt;-->
<!--        &lt;!&ndash;        日历框&ndash;&gt;-->
<!--        &lt;!&ndash; <el-dialog :visible.sync="showCalendar"-->
<!--                   width="50%">-->
<!--            <el-calendar v-model="value">-->
<!--            </el-calendar>-->
<!--        </el-dialog> &ndash;&gt;-->

<!--        &lt;!&ndash; <el-dialog :visible.sync="showSchoolCalendar"-->
<!--                   width="50%">-->
<!--            <img src="../../assets/img/calendar.jpg" alt="" style="width: 100%;margin:0;">-->
<!--        </el-dialog> &ndash;&gt;-->

<!--        <el-row :gutter="20">-->
<!--            <el-col :span="12"><div id="gradeChart" style="width: 600px;height:400px;"></div></el-col>-->
<!--            <el-col :span="12"><div id="majorChart" style="width: 600px;height:400px;"></div></el-col>-->
<!--        </el-row>-->


<!--        <el-carousel :interval="4000" type="card" height="200px">-->
<!--            <el-carousel-item v-for="item in 6" :key="item">-->
<!--                <h3 class="medium">{{ item }}</h3>-->
<!--            </el-carousel-item>-->
<!--        </el-carousel>-->

<!--        <div id="announce_head">-->
<!--            <img src="../../assets/img/icon_announcement.png" alt="" style="vertical-align: middle">-->
<!--            <span> <h3>   系统公告</h3></span>-->
<!--        </div>-->
<!--        <el-divider></el-divider>-->
<!--&lt;!&ndash;            &lt;!&ndash;            搜索与添加&ndash;&gt;-->
<!--&lt;!&ndash;            <el-row :gutter="20">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-col :span="7">&ndash;&gt;-->
<!--&lt;!&ndash;                    &lt;!&ndash;                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特点内容的系统公告&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-input clearable @clear="getAnnouncementList" placeholder="请输入内容" v-model="query">&ndash;&gt;-->
<!--&lt;!&ndash;                        <el-button slot="append" icon="el-icon-search" @click="getAnnouncementList"></el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                    </el-input>&ndash;&gt;-->
<!--&lt;!&ndash;                </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-row>&ndash;&gt;-->
<!--        &lt;!&ndash;            系统公告列表 只展示一些系统公告信息,详细文本可在详情查看&ndash;&gt;-->
<!--&lt;!&ndash;            <el-table :data="AnnouncementList">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-table-column type="index"></el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-table-column label="标题" prop="title"></el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-table-column label="系统公告时间" prop="time"></el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-table-column label="显示详情">&ndash;&gt;-->
<!--&lt;!&ndash;                    <template slot-scope="scope">&ndash;&gt;-->
<!--&lt;!&ndash;                        <el-button type="primary" @click="showDialog(scope.row.announcementId)">查看</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                    </template>&ndash;&gt;-->
<!--&lt;!&ndash;                </el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-table>&ndash;&gt;-->
<!--        &lt;!&ndash;            分页区域&ndash;&gt;-->
<!--&lt;!&ndash;            <el-pagination&ndash;&gt;-->
<!--&lt;!&ndash;                @size-change="handleSizeChange"&ndash;&gt;-->
<!--&lt;!&ndash;                @current-change="handleCurrentChange"&ndash;&gt;-->
<!--&lt;!&ndash;                :current-page="pageNumber"&ndash;&gt;-->
<!--&lt;!&ndash;                :page-sizes="[1, 2, 5, 10]"&ndash;&gt;-->
<!--&lt;!&ndash;                :page-size="pageSize"&ndash;&gt;-->
<!--&lt;!&ndash;                layout="total, sizes, prev, pager, next, jumper"&ndash;&gt;-->
<!--&lt;!&ndash;                :total="totalCount">&ndash;&gt;-->
<!--&lt;!&ndash;            </el-pagination>&ndash;&gt;-->
<!--        &lt;!&ndash;        <div v-for="n in evenNumbers">&ndash;&gt;-->
<!--        <div v-for="announcement in AnnouncementList">-->
<!--            <el-card id="myCard">-->
<!--                <div id="announcementContent">{{ announcement.content }}</div>-->
<!--                <br>-->
<!--                <div id="announcementTime">{{ announcement.time }}</div>-->
<!--                <br>-->
<!--                <el-button id="checkButton" type="text" @click="showDialog(announcement.announcementId)">查看</el-button>-->
<!--            </el-card>-->
<!--            <br>-->
<!--        </div>-->

<!--        &lt;!&ndash;        展示系统公告对话框&ndash;&gt;-->
<!--        <el-dialog title="系统公告详情" ref="showFormRef" :visible.sync="showDialogVisible"-->
<!--                   width="50%">-->
<!--            &lt;!&ndash;            展示内容主体区域 &ndash;&gt;-->
<!--            <el-form :model="addForm" label-width="150px">-->
<!--                <el-form-item label="系统公告标题:">-->
<!--                    <el-input v-model="addForm.title" disabled></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="系统公告内容:">-->
<!--                    <el-input v-model="addForm.content" disabled></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="系统公告时间:" prop="time">-->
<!--                    <el-date-picker type="date" v-model="addForm.time" style="width: 100%;" disabled></el-date-picker>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            &lt;!&ndash;            底部区域&ndash;&gt;-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--                    <el-button type="primary" @click="closeDialogVisible">确 定</el-button>-->
<!--                </span>-->
<!--        </el-dialog>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--    data()-->
<!--    {-->
<!--        return {-->
<!--            //获取系统公告列表参数对象-->
<!--            query: '',-->
<!--            //当前的页码-->
<!--            pageNumber: 1,-->
<!--            //每页显示的条数-->
<!--            pageSize: 10,-->

<!--            //社团成员年级分布图表数据-->
<!--            gradeGraphDescription:["16级","17级","18级","19级","20级","21级"],-->
<!--            gradeGraphData:[5, 20, 36, 10, 10,20],-->

<!--            //社团成员专业分布图表数据-->
<!--            majorGraphData:[-->
<!--                {value:235, name:'软件工程'},-->
<!--                {value:400, name:'土木工程'},-->
<!--                {value:400, name:'车辆工程'},-->
<!--            ],-->

<!--            //查询到的当页系统公告-->
<!--            AnnouncementList: [],-->
<!--            //总条数,用于分页的显示-->
<!--            totalCount: 0,-->
<!--            showDialogVisible: false,-->

<!--            showCalendar: false,-->
<!--            showSchoolCalendar: false,-->

<!--            //添加系统公告表单数据-->
<!--            addForm: {-->
<!--                AnnouncementId: "",-->
<!--                title:"",-->
<!--                content: "",-->
<!--                time: "",-->
<!--                status: false,-->
<!--            },-->

<!--            username: window.sessionStorage.getItem('name')-->
<!--        }-->
<!--    },-->
<!--    //一开始就显示系统公告列表-->
<!--    created()-->
<!--    {-->
<!--        this.getAnnouncementList();-->
<!--    },-->
<!--    mounted()-->
<!--    {-->
<!--        this.drawPeople();-->
<!--    },-->
<!--    methods: {-->
<!--        drawPeople(){-->
<!--            //年级分布图-->
<!--            // 基于准备好的dom，初始化echarts实例-->
<!--            let gradeChart = this.$echarts.init(document.getElementById('gradeChart'),'light')-->
<!--            // 绘制图表-->
<!--            gradeChart.setOption({-->
<!--                title: { text: '社团成员分布' },-->
<!--                tooltip: {},-->
<!--                xAxis: {-->
<!--                    data: this.gradeGraphDescription-->
<!--                },-->
<!--                yAxis: {},-->
<!--                series: [{-->
<!--                    name: '人数',-->
<!--                    type: 'bar',-->
<!--                    data: this.gradeGraphData-->
<!--                }]-->
<!--            });-->

<!--            //性别分布饼状图-->
<!--            let majorChart = this.$echarts.init(document.getElementById('majorChart'), 'light');-->
<!--            majorChart.setOption({-->
<!--                title: { text: '社团人员专业分布' },-->
<!--                series : [-->
<!--                    {-->

<!--                        name: '访问来源',-->
<!--                        type: 'pie',    // 设置图表类型为饼图-->
<!--                        radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。-->
<!--                        data: this.majorGraphData-->
<!--                    }-->
<!--                ]-->
<!--            })-->

<!--        },-->
<!--        async getAnnouncementList()-->
<!--        {-->
<!--            let result = await this.$http.post(this.$api.GetAnnouncementsUrl,-->
<!--                {-->
<!--                    query: this.query,-->
<!--                    pageNumber: this.pageNumber,-->
<!--                    pageSize: this.pageSize,-->
<!--                    status: true,-->
<!--                    value: new Date()//日历-->
<!--                });-->
<!--            this.AnnouncementList = result.data.data;-->
<!--            for (let i = 0; i < this.AnnouncementList.length; i++)-->
<!--            {-->
<!--                this.AnnouncementList[i].time=this.AnnouncementList[i].time.substring(0,10)-->
<!--            }-->
<!--            this.totalCount = parseInt(result.data.totalCount);-->
<!--        },-->
<!--        //监听pageSize改变的事件-->
<!--        handleSizeChange(newSize)-->
<!--        {-->
<!--            this.pageSize = newSize;-->
<!--            this.getAnnouncementList();-->
<!--        },-->
<!--        //监听pageNum改变的事件-->
<!--        handleCurrentChange(newPage)-->
<!--        {-->
<!--            this.pageNumber = newPage;-->
<!--            this.getAnnouncementList();-->
<!--        },-->

<!--        async showDialog(AnnouncementId)-->
<!--        {-->
<!--            let result = await this.$http.post(this.$api.GetOneAnnouncementUrl + "/" + AnnouncementId);-->
<!--            this.addForm = result.data;-->
<!--            this.showDialogVisible = true;-->
<!--        },-->
<!--        //显示系统公告详情页面按确定后的触发事件-->
<!--        closeDialogVisible()-->
<!--        {-->
<!--            this.showDialogVisible = false;-->
<!--        },-->

<!--        async openCalendar()-->
<!--        {-->
<!--            this.showCalendar = true;-->
<!--        },-->
<!--        async openSchoolCalendar()-->
<!--        {-->
<!--            this.showSchoolCalendar = true;-->
<!--        },-->
<!--    }-->
<!--}-->
<!--</script>-->
<!--<style>-->
<!--    *{-->
<!--        margin: 0;-->
<!--        padding: 0;-->
<!--    }-->
<!--    .text1 {-->
<!--        font-size: 16px;-->
<!--        /*color: #409EFF;*/-->
<!--    }-->
<!--    .box-card1 {-->
<!--        width: 95%;-->
<!--        height:40px;-->
<!--        padding: 2px;-->
<!--        margin: 10px;-->

<!--        display: flex;-->
<!--        align-items: center;-->
<!--    }-->
<!--    .box-card1 img{-->

<!--        height:20px;-->
<!--    }-->

<!--    #announce{-->
<!--        width: 95%;-->
<!--        height:300px;-->
<!--        padding: 2px;-->
<!--        margin-left: 10px;-->
<!--        margin-top: 30px;-->
<!--        margin-right: 20px;-->
<!--    }-->

<!--    #announce_head{-->
<!--        display: flex;-->
<!--    }-->

<!--    #announce_head img{-->
<!--        height: 30px;-->
<!--        margin-right: 10px;-->
<!--    }-->

<!--    .el-carousel__item h3 {-->
<!--        color: #475669;-->
<!--        font-size: 14px;-->
<!--        opacity: 0.75;-->
<!--        line-height: 200px;-->
<!--        margin: 0;-->
<!--    }-->

<!--    .el-carousel__item:nth-child(2n) {-->
<!--        background-color: #99a9bf;-->
<!--    }-->

<!--    .el-carousel__item:nth-child(2n+1) {-->
<!--        background-color: #d3dce6;-->
<!--    }-->

<!--    #announcementContent{-->
<!--        float: left;-->
<!--    }-->
<!--    #announcementTime{-->
<!--        float: right;-->
<!--    }-->
<!--    #announcementId{-->
<!--        float: right;-->
<!--    }-->
<!--    #checkButton {-->
<!--        float: right;-->
<!--        /*margin-top: 10px;*/-->
<!--    }-->
<!--</style>-->
>>>>>>> bf88343655adf4408a9f4682d1a1b7a4942a80fa
