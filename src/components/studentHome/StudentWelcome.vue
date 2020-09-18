<template>
<<<<<<< Updated upstream
    <div>
        <el-row :gutter="0" class="el-row">
            <el-col :span="6">
                <el-card class="card0" :body-style="{ padding: '20px'}">
                    <br>
                    <div class="image" >
                        <img width="140" height="140" :src="imgUrl">
                    </div>
                    <br>
                    <div class="image">
                        学生用户
                    </div>
                    <br>
                    <div class="image">{{informationList[0].number}} {{informationList[0].name}}</div>

                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card class="card1" :body-style="{ padding: '20px'}">
                    <!--                    系统公告列表 只展示一些系统公告信息,详细文本可在详情查看-->
                    <div id="announce_head">
                        <img src="../../assets/img/icon_announcement.png" alt="" style="vertical-align: middle">
                        <span @click="SystemNotice"> <h3>   社团公告</h3></span>
                        <!--                        <span @click="SystemNotice" class="more"> <h3>更多</h3></span>-->
                    </div>
                    <!--                    <div @click="SystemNotice">系统公告：</div>-->

                    <el-table :data="AnnouncementList" height="220" :cell-style="{padding:'5px 0'}">
                        <el-table-column type="index" width="40"></el-table-column>
                        <el-table-column label="社团" prop="name" width="290%"></el-table-column>
                        <el-table-column label="标题" prop="title" ></el-table-column>
                        <el-table-column label="公告时间" prop="time"></el-table-column>
                        <el-table-column label="详情">
                            <template slot-scope="scope">
                                <el-button type="text" @click="showDialog(scope.row.announcementId)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>

        </el-row>
        <br>


        <!-- 图表 -->
<!--        <el-row :gutter="0" class="el-row">-->
<!--            <el-col :span="24">-->
<!--                <el-card>-->
<!--                    <el-row :gutter="20">-->
<!--                        <el-col :span="12"><div id="gradeChart" style="width: 600px;height:400px;"></div></el-col>-->
<!--                        <el-col :span="12"><div id="genderChart" style="width: 600px;height:400px;"></div></el-col>-->
<!--                    </el-row>-->
<!--                </el-card>-->
<!--            </el-col>-->
<!--        </el-row>-->
        <!--        日历按钮-->
<!--        <el-button type="success" @click="openCalendar">查看日历</el-button>-->
        <!--        日历框-->
<!--        <el-dialog :visible.sync="showCalendar"-->
<!--                   width="50%">-->
<!--            <el-calendar v-model="value">-->
<!--            </el-calendar>-->
<!--        </el-dialog>-->




<!--            <el-card class="card1" >-->
<!--                &lt;!&ndash;                    系统公告列表 只展示一些系统公告信息,详细文本可在详情查看&ndash;&gt;-->

<!--                <div id="announce_head">-->
<!--                    <img src="../../assets/img/icon_announcement.png" alt="" style="vertical-align: middle">-->
<!--                    <span> <h3> 社团公告</h3></span>-->
<!--                    &lt;!&ndash;                        <span @click="SystemNotice" class="more"> <h3>更多</h3></span>&ndash;&gt;-->
<!--                </div>-->
<!--                <el-divider></el-divider>-->
<!--                <el-row :gutter="20">-->
<!--                    <el-col :span="7">-->
<!--                        &lt;!&ndash;                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特点内容的系统公告&ndash;&gt;-->
<!--                        <el-input clearable @clear="getAnnouncementList" placeholder="请输入内容" v-model="query">-->
<!--                            <el-button slot="append" icon="el-icon-search" @click="getAnnouncementList"></el-button>-->
<!--                        </el-input>-->
<!--                    </el-col>-->
<!--                </el-row>-->
<!--                <el-table :data="AnnouncementList">-->
<!--                    <el-table-column type="index"></el-table-column>-->
<!--                    <el-table-column label="社团" prop="name"></el-table-column>-->
<!--                    <el-table-column label="标题" prop="title"></el-table-column>-->
<!--                    <el-table-column label="公告时间" prop="time"></el-table-column>-->
<!--                    <el-table-column label="显示详情">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-button type="primary" @click="showDialog(scope.row.announcementId)">查看</el-button>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--                </el-table>-->
<!--            </el-card>-->

<!--        <div id="announce_head">-->
<!--            <img src="../../assets/img/icon_announcement.png" alt="" style="vertical-align: middle">-->
<!--            <span> <h3> 社团公告</h3></span>-->
<!--            &lt;!&ndash;                        <span @click="SystemNotice" class="more"> <h3>更多</h3></span>&ndash;&gt;-->
<!--        </div>-->
<!--        <el-divider></el-divider>-->
<!--        <div v-for="announcement in AnnouncementList">-->
<!--            <el-card id="myCard">-->
<!--                <div id="announcementContent">{{ announcement.title }}</div>-->
<!--                <br>-->
<!--                <div id="announcementTime">{{ announcement.time }}</div>-->
<!--                <br>-->
<!--                <el-button id="checkButton" type="text" @click="showDialog(announcement.announcementId)">查看</el-button>-->
<!--            </el-card>-->
<!--            <br>-->
<!--        </div>-->

<!--        <div id="announce_head">-->

<!--            <img src="../../assets/img/icon_announcement.png" alt="" style="vertical-align: middle">-->
<!--            <span> <h3> 社团公告</h3></span>-->
<!--        </div>-->
            <!--            搜索与添加-->
<!--            <el-row :gutter="20">-->
<!--                <el-col :span="7">-->
<!--                    &lt;!&ndash;                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特点内容的系统公告&ndash;&gt;-->
<!--                    <el-input clearable @clear="getAnnouncementList" placeholder="请输入内容" v-model="query">-->
<!--                        <el-button slot="append" icon="el-icon-search" @click="getAnnouncementList"></el-button>-->
<!--                    </el-input>-->
<!--                </el-col>-->
<!--            </el-row>-->
            <!--            系统公告列表 只展示一些系统公告信息,详细文本可在详情查看-->






            <!--            分页区域-->
<!--            <el-pagination-->
<!--                    @size-change="handleSizeChange"-->
<!--                    @current-change="handleCurrentChange"-->
<!--                    :current-page="pageNumber"-->
<!--                    :page-sizes="[1, 2, 5, 10]"-->
<!--                    :page-size="pageSize"-->
<!--                    layout="total, sizes, prev, pager, next, jumper"-->
<!--                    :total="totalCount">-->
<!--            </el-pagination>-->




        <!--        展示系统公告对话框-->
        <el-dialog title="社团公告详情" ref="showFormRef" :visible.sync="showDialogVisible"
                   width="50%">
            <!--            展示内容主体区域 -->
            <el-form :model="addForm" label-width="150px">
                <el-form-item label="社团:">
                    <el-input v-model="addForm.name" readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="社团公告标题:">
                    <el-input v-model="addForm.title" readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="社团公告时间:" prop="time">
                    <el-date-picker type="date" v-model="addForm.time" style="width: 100%;" readonly="true"></el-date-picker>
                </el-form-item>
                <el-form-item label="社团公告内容:">
                    <el-input v-model="addForm.content" readonly="true"></el-input>
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
    var width = window.innerWidth,
        height = window.innerHeight;

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

                //添加系统公告表单数据
                addForm: {
                    AnnouncementId: "",
                    title:"",
                    content: "",
                    time: "",
                    name:"",
                    status: false,
                },
                informationList: [],
                username: "",
                imgUrl: window.sessionStorage.getItem('imgUrl'),
            }
        },
        mounted() {
          this.drawPeople()
        },
        //一开始就显示系统公告列表
        created()
        {
            this.getAnnouncementList();
            this.getCorporationList();
        },


        methods: {

            drawPeople(){
                //年级分布图
                // 基于准备好的dom，初始化echarts实例
                let gradeChart = this.$echarts.init(document.getElementById('gradeChart'),'light')
                // 绘制图表
                gradeChart.setOption({
                    title: { text: '已加入社团数',left:'center'},
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

                //性别分布饼状图
                let genderChart = this.$echarts.init(document.getElementById('genderChart'), 'light');
                genderChart.setOption({
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

            async getCorporationList()
            {
                let result = await this.$http.post(this.$api.StudentGetInformation,
                    {
                    });
                this.informationList = result.data;
                console.log(this.informationList);
                console.log(this.informationList[0].name);
                this.username=this.informationList[0].name;
            },


            async getAnnouncementList()
            {
                let result = await this.$http.post(this.$api.StudentInClubAnnouncements,
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
                console.log(this.AnnouncementList);
                this.totalCount = parseInt(result.data.totalCount);
                console.log(this.totalCount);
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
                console.log(this.AnnouncementList[0].announcementId);
                for(var i=0;i<this.totalCount;i++){
                    if(this.AnnouncementList[i].announcementId===AnnouncementId){
                        this.addForm.name=this.AnnouncementList[i].name;
                        this.addForm.title = this.AnnouncementList[i].title;
                        this.addForm.AnnouncementId=AnnouncementId;
                        this.addForm.time=this.AnnouncementList[i].time;
                        this.addForm.content=this.AnnouncementList[i].content;
                        break;
                    }
                }
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
=======
  <div>
    <el-card class="box-card1" shadow="never">
      <div class="text1 item1">
        <img src="../../assets/img/welcome.png" alt style="vertical-align: middle" />
        <span>欢迎回来 {{username}} ！</span>
      </div>
    </el-card>

    <!--        日历按钮-->
    <!--        <el-button type="success" @click="openCalendar">查看日历</el-button>-->
    <!--        日历框-->
    <!--        <el-dialog :visible.sync="showCalendar"-->
    <!--                   width="50%">-->
    <!--            <el-calendar v-model="value">-->
    <!--            </el-calendar>-->
    <!--        </el-dialog>-->

    <el-carousel :interval="4000" type="card" height="366px">
      <el-carousel-item>
        <img src="../../assets/img/tj_cp1.jpg" alt style="height: 366px;width: 100%;margin:0;" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/img/tj_cp2.jpg" alt style="height: 366px;width: 100%;margin:0;" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/img/tj_cp4.jpg" alt style="height: 366px;width: 100%;margin:0;" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/img/tj_cp3.jpg" alt style="height: 366px;width: 100%;margin:0;" />
      </el-carousel-item>
      <!--            <el-carousel-item >-->
      <!--                <img src="../../assets/img/tj_cp4.jpg" alt="" style="height: 366px;width: 100%;margin:0;">-->
      <!--            </el-carousel-item>-->
      <el-carousel-item>
        <img src="../../assets/img/tj_cp5.jpg" alt style="height: 366px;width: 100%;margin:0;" />
      </el-carousel-item>
    </el-carousel>

    <el-card class="announce">
      <div id="announce_head">
        <img src="../../assets/img/icon_announcement.png" alt style="vertical-align: middle" />
        <span>
          <h3>社团公告</h3>
        </span>
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
        <el-table-column label="社团" prop="name"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="公告时间" prop="time"></el-table-column>
        <el-table-column label="显示详情">
          <template slot-scope="scope">
            <el-button type="primary" @click="showDialog(scope.row.announcementId)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--            分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNumber"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </el-card>

    <!--        展示系统公告对话框-->
    <el-dialog title="社团公告详情" ref="showFormRef" :visible.sync="showDialogVisible" width="50%">
      <!--            展示内容主体区域 -->
      <el-form :model="addForm" label-width="150px">
        <el-form-item label="社团:">
          <el-col :span="22">
            <el-input v-model="addForm.name" readonly="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="社团公告标题:">
          <el-col :span="22">
            <el-input v-model="addForm.title" readonly="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="社团公告时间:" prop="time">
          <el-col :span="22">
            <el-date-picker type="date" v-model="addForm.time" style="width: 100%;" readonly="true"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="社团公告内容:">
          <el-col :span="22">
            <el-input v-model="addForm.content" readonly="true"></el-input>
          </el-col>
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
var width = window.innerWidth,
  height = window.innerHeight;

export default {
  data() {
    return {
      //获取系统公告列表参数对象
      query: "",
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

      //添加系统公告表单数据
      addForm: {
        AnnouncementId: "",
        title: "",
        content: "",
        time: "",
        name: "",
        status: false,
      },
      informationList: [],
      username: "",
    };
  },
  //一开始就显示系统公告列表
  created() {
    this.getAnnouncementList();
    this.getCorporationList();
  },

  methods: {
    async getCorporationList() {
      let result = await this.$http.post(this.$api.StudentGetInformation, {});
      this.informationList = result.data;
      console.log(this.informationList);
      console.log(this.informationList[0].name);
      this.username = this.informationList[0].name;
    },

    async getAnnouncementList() {
      let result = await this.$http.post(this.$api.StudentInClubAnnouncements, {
        query: this.query,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        status: true,
      });
      this.AnnouncementList = result.data.data;
      for (let i = 0; i < this.AnnouncementList.length; i++) {
        this.AnnouncementList[i].time = this.AnnouncementList[i].time.substring(
          0,
          10
        );
      }
      console.log(this.AnnouncementList);
      this.totalCount = parseInt(result.data.totalCount);
      console.log(this.totalCount);
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
      console.log(this.AnnouncementList[0].announcementId);
      for (var i = 0; i < this.totalCount; i++) {
        if (this.AnnouncementList[i].announcementId === AnnouncementId) {
          this.addForm.name = this.AnnouncementList[i].name;
          this.addForm.title = this.AnnouncementList[i].title;
          this.addForm.AnnouncementId = AnnouncementId;
          this.addForm.time = this.AnnouncementList[i].time;
          this.addForm.content = this.AnnouncementList[i].content;
          break;
>>>>>>> Stashed changes
        }
      }
      this.showDialogVisible = true;
    },
    //显示系统公告详情页面按确定后的触发事件
    closeDialogVisible() {
      this.showDialogVisible = false;
    },

    async openCalendar() {
      this.showCalendar = true;
    },
  },
};
</script>
<style>
<<<<<<< Updated upstream
    *{
        margin: 0;
        padding: 0;
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
    .text1 {
        font-size: 16px;
        /*color: #409EFF;*/
    }
    .announce{
        height: 380px;
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
        height:400px;
        padding: 2px;
        margin-left: 10px;
        margin-top: 0px;
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

    }
    #announce_head{
        display: flex;
    }

    #announce_head img{
        height: 30px;
        margin-right: 10px;
    }

    /*#myCard {*/
    /*    float: right;*/
    /*    !*margin-top: 10px;*!*/
    /*}*/

=======
* {
  margin: 0;
  padding: 0;
}
.text1 {
  font-size: 16px;
  /*color: #409EFF;*/
}
.announce {
  height: 380px;
}
.box-card1 {
  width: 95%;
  height: 40px;
  padding: 2px;
  margin: 10px;

  display: flex;
  align-items: center;
}
.box-card1 img {
  height: 20px;
}

#announce {
  width: 95%;
  height: 400px;
  padding: 2px;
  margin-left: 10px;
  margin-top: 0px;
  margin-right: 20px;
}

#announce_head {
  display: flex;
}

#announce_head img {
  height: 20px;
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

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
>>>>>>> Stashed changes
</style>
