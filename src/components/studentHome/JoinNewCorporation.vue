<template>
  <div>
    <!--        面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/StudentWelcome' }">社团信息查询</el-breadcrumb-item>
      <el-breadcrumb-item>加入社团</el-breadcrumb-item>
    </el-breadcrumb>

    <el-alert title="加入社团" type="info" center show-icon></el-alert>

    <el-divider></el-divider>
    <!--        卡片-->
    <el-card class="box-card">
      <!--            搜索与添加-->
      <el-row :gutter="20">
        <el-col :span="7">
          <!--                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特定内容的社团-->
          <el-steps
            :active="activeIndex-0"
            finish-status="success"
            :space="200"
            style="margin-left: 12px"
          >
            <el-step title="步骤1" description="确定是这个社团了吗"></el-step>
            <el-step title="步骤2" description="为什么想加入这个社团"></el-step>
          </el-steps>

          <el-tabs v-model="activeIndex" :tab-position="tabPosition" style="height: 200px;">
            <el-tab-pane label="步骤1" name="0">
              <el-table :data="corporationsList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="社团信息核对">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      @click="showCorporationSummary(scope.row.clubId,scope.row.name,scope.row.type,scope.row.establishmentDate,scope.row.presidentName)"
                    >核对</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="步骤2" name="1">
              <el-table :data="corporationsList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="确认加入">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="joinClub(scope.row.clubId)">加入原因</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!--                <el-col :span="4">-->
        <!--                    <el-button type="primary" @click="addDialogVisible=true">查询社团</el-button>-->
        <!--                </el-col>-->
      </el-row>
      <!--            活动列表 只展示一些活动信息,详细信息可在详情查看-->
    </el-card>

    <!--        展示活动对话框-->
    <el-dialog title="社团简介" ref="showFormRef" :visible.sync="showDialogVisible" width="50%" center>
      <!--            展示内容主体区域 -->
      <el-form :model="addForm" label-width="150px">
        <el-form-item label="社团编号">
          <el-input v-model="addForm.id" disabled style="width:82%;"></el-input>
        </el-form-item>
        <el-form-item label="社团名称">
          <el-input v-model="addForm.name" disabled style="width:82%;"></el-input>
        </el-form-item>
        <el-form-item label="社团性质">
          <el-input v-model="addForm.type" disabled style="width:82%;"></el-input>
        </el-form-item>
        <el-form-item label="成立时间">
          <el-input v-model="addForm.date" disabled style="width:82%;"></el-input>
        </el-form-item>
        <el-form-item label="会长">
          <el-input v-model="addForm.president" disabled style="width:82%;"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="addForm.summary" type="textarea" disabled style="width:82%;"></el-input>
        </el-form-item>
      </el-form>
      <!--            底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDialogVisible">确 定</el-button>
      </span>
    </el-dialog>

    <!--        退出社团对话框-->
    <el-dialog title="提交申请" :visible.sync="addDialogVisible" width="50%" center>
      <!--            内容主体区域 放置一个表单-->
      <el-form :model="addForm" ref="addFormRef" label-width="150px">
        <el-form-item label="社团编号:" prop="corporationId">
          <el-input v-model="addForm1.id" disabled style="width:82%;"></el-input>
        </el-form-item>
        <el-form-item label="退社理由:" prop="reason">
          <el-input type="textarea" v-model="addForm1.reason" style="width:82%;"></el-input>
        </el-form-item>
      </el-form>
      <!--            底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="addApply">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    let checkCost = (rule, value, cb) => {
      const regCost = /^\d{1,8}\.?\d{0,2}$/;
      if (regCost.test(value)) {
        //合法密码
        return cb();
      }
      cb(new Error("活动开销必须是数字,且小于一千万!"));
    };
    let checkFund = (rule, value, cb) => {
      const regFund = /^\d{1,8}\.?\d{0,2}$/;
      if (regFund.test(value)) {
        //合法密码
        return cb();
      }
      cb(new Error("活动经费必须是数字,且小于一千万!"));
    };
    return {
      activeIndex: "0",
      tabPosition: "left",
      //    获取活动列表参数对象

      query: "",
      //当前的页码
      pageNumber: 1,
      //每页显示的条数
      pageSize: 5,

      //查询到的当页活动
      corporationsList: [],
      //总页码数,用于分页的显示
      totalCount: 0,
      //添加,修改,展示活动对话框的显示与隐藏
      addDialogVisible: false,
      editDialogVisible: false,
      showDialogVisible: false,
      //添加活动表单数据
      addForm: {
        id: "",
        name: "",
        type: "",
        summary: "",
        date: "",
        president: "",
      },
      addForm1: {
        id: "",
        reason: "",
      },
      //添加活动的校验规则
      addFormRules: {
        studentID: [{ required: true, message: "请输入学号", trigger: "blur" }],
        corporationName: [
          { required: true, message: "请输入社团名称", trigger: "blur" },
        ],
        corporationId: [
          { required: true, message: "请输入社团编号", trigger: "blur" },
        ],
        reason: [
          { required: true, message: "请输入退社理由", trigger: "blur" },
        ],
      },
    };
  },
  //一开始就显示活动列表
  created() {
    //this.getCorporationsList();
    this.getCorporationList();
  },
  //获取已加入社团列表
  methods: {
    async getCorporationList() {
      let result = await this.$http.post(
        this.$api.StudentCorporationInformationUrl + "/" + 3
      );
      this.corporationsList = result.data.data;
      console.log(this.corporationsList);
      this.totalCount = parseInt(result.data.totalCount);
      console.log(this.totalCount);
    },

    next() {
      if (this.active++ > 2) this.active = 0;
    },

    //监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getCorporationList();
    },
    //监听pageNum改变的事件
    handleCurrentChange(newPage) {
      this.pageNumber = newPage;
      this.getCorporationList();
    },

    //抽取出来,当弹出的页面结束后,会清空内容
    // 因为公有addForm所以必须有这个操作,且点击后都是重新axios请求新信息,所以没有问题
    clearAddForm() {
      //清空数据
      this.addForm.summary = "";
    },

    //添加活动框里面的取消添加活动按钮触发的事件
    cancelAdd() {
      //清空表单的校验项
      this.$refs.addFormRef.resetFields();
      //防止非必填项没清理掉
      this.clearAddForm();
      //隐藏添加活动对话框
      this.addDialogVisible = false;
      this.$message.info("取消提交申请!");
    },

    async showDialog(id) {
      let result = await this.$http.post(
        this.$api.StudentCorporationInformationUrl + "/" + id
      );
      status = result.data.status;
      if (!status || status !== "200") {
        this.$message.info(result.data.msg);
      } else {
        this.addForm = result.data.data;
        this.showDialogVisible = true;
      }
    },

    //修改活动页面弹出后,会查询要修改的id所对应活动的内容
    async showEditDialog(activityId) {
      let result = await this.$http.post(
        this.$api.PrincipalGetOneActivityUrl + "/" + activityId
      );
      this.addForm = result.data;
      this.editDialogVisible = true;
    },

    //提交申请
    exitCorporation(clubid, name) {
      this.addDialogVisible = true;
      //清空表单的校验项
      this.$nextTick(() => {
        this.$refs.addFormRef.resetFields();
      });
      this.addForm.studentid = "";
      this.addForm.name = name;
      this.addForm.clubid = clubid;
      this.addForm.summary = "";
    },

    closeDialogVisible() {
      this.clearAddForm();
      this.showDialogVisible = false;
    },
    cancelEdit() {
      this.editDialogVisible = false;
      this.clearAddForm();
      this.$message.info("取消提交申请!");
    },

    //提交申请
    addApply() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;

        var clubId = this.corporationsList[0].clubId;
        var reason = this.addForm1.reason;
        console.log(clubId, reason);
        let result = await this.$http.post(this.$api.StudentJoinClub, {
          clubId,
          reason,
        });

        //隐藏添加活动对话框
        this.addDialogVisible = false;
        console.log(result);
        this.$message.info("提交申请成功!");
      });
    },

    //详情页面弹出后,会查询该社团的简介内容并显示
    async showCorporationSummary(id, name, type, date, president) {
      let result = await this.$http.post(
        this.$api.StudentCorporationInformationUrl + "/" + id
      );
      this.addForm.id = id;
      this.addForm.name = name;
      this.addForm.type = type;
      this.addForm.summary = result.data;
      this.addForm.date = date;
      this.addForm.president = president;
      this.showDialogVisible = true;
    },

    async joinClub(id) {
      this.addForm1.id = id;
      this.addDialogVisible = true;
    },

    async editActivity() {
      let result = await this.$http.post(
        this.$api.PrincipalUpdateOneActivityUrl,
        this.addForm
      );
      status = result.data.status;
      if (!status || status !== "200") {
        this.$message.info(result.data.msg);
      }
      this.clearAddForm();
      //关闭对话框
      this.editDialogVisible = false;
      //    刷新数据列表
      this.getCorporationList();
      //    提示成功
      this.$message.success("提交审核成功!");
    },
  },
};
</script>
<style scoped></style>