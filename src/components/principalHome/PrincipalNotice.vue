<template>
    <div>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/principleWelcome' }">负责人首页</el-breadcrumb-item>
            <el-breadcrumb-item>公告管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>
        <!--        卡片-->
        <el-card class="box-card">
            <!--            搜索与添加-->
            <el-row :gutter="20">
                <el-col :span="7">
                    <!--                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特点内容的公告-->
                    <el-input clearable @clear="getAnnouncementList" placeholder="请输入内容" v-model="query">
                        <el-button slot="append" icon="el-icon-search" @click="getAnnouncementList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="showAddAnnouncement">添加公告</el-button>
                </el-col>
            </el-row>
            <!--            公告列表 只展示一些公告信息,详细文本可在详情查看-->
            <el-table :data="AnnouncementList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="公告时间" prop="time"></el-table-column>
                <el-table-column label="显示详情">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="showDialog(scope.row.announcementId)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--                        修改按钮-->
                        <el-button type="primary" @click="showEditDialog(scope.row.announcementId)"
                                   icon="el-icon-edit"></el-button>
                        <!--                        删除按钮-->
                        <el-button type="primary" @click="removeById(scope.row.announcementId)"
                                   icon="el-icon-delete"></el-button>

                    </template>
                </el-table-column>

            </el-table>
            <br>
            <!--            分页区域-->
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

        <!--        展示公告对话框-->
        <el-dialog ref="showFormRef" :visible.sync="showDialogVisible"
                   width="630px" top="120px" center>
            <p style="text-align:center; font-size:20px ;white-space: pre-wrap">{{showForm.title}}</p>
            <br>
            <hr>
            <br>
            <p style="font-size:16px;text-indent: 2em;line-height: 22px;
  letter-spacing: 0.4px;" class="text-wrapper">{{showForm.content}}</p>
            <br>
            <hr>
            <br>
            <p style="text-align: right;font-size:15px">{{showForm.time}}</p>

            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="closeDialogVisible">确 定</el-button>
  </span>
        </el-dialog>


        <!--        添加公告对话框-->
        <el-dialog title="添加公告" :visible.sync="addDialogVisible"
                   width="630px" top="120px" center>
            <!--            内容主体区域 放置一个表单-->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="150px">
                <el-form-item label="公告标题:" prop="title">
                    <el-input style="width:360px" v-model="addForm.title"></el-input>
                </el-form-item>
                <el-form-item label="公告内容:" prop="content">
                    <el-input type="textarea"
                              :autosize="{ minRows: 3, maxRows: 10}" style="width:360px"
                              v-model="addForm.content"
                              ></el-input>
                </el-form-item>
            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
    <el-button @click="cancelAdd" style="margin-right: 20px;">取 消</el-button>
    <el-button type="primary" @click="addAnnouncement">确 定</el-button>
  </span>
        </el-dialog>

        <!--        修改公告对话框-->
        <el-dialog title="修改公告" :visible.sync="editDialogVisible"
                   width="630px" top="120px" center>
            <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="150px">
                <el-form-item label="公告标题:" prop="title">
                    <el-input  style="width:360px" v-model="editForm.title" ></el-input>
                </el-form-item>
                <el-form-item label="公告内容:" prop="content">
                    <el-input type="textarea"
                              :autosize="{ minRows: 3, maxRows: 10}" style="width:360px"
                              v-model="editForm.content"
                              ></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelEdit" style="margin-right: 20px;">取 消</el-button>
                    <el-button type="primary" @click="editAnnouncement">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data()
        {
            return {
                //获取公告列表参数对象
                query: '',
                //当前的页码
                pageNumber: 1,
                //每页显示的条数
                pageSize: 5,

                //查询到的当页公告
                AnnouncementList: [],
                //总条数,用于分页的显示
                totalCount: 0,
                //添加,修改,展示公告对话框的显示与隐藏
                addDialogVisible: false,
                editDialogVisible: false,
                showDialogVisible: false,

                //添加公告表单数据
                addForm: {
                    AnnouncementId: "",
                    title:"",
                    content: "",
                    time: "",
                    status: false,
                },
                showForm: {},
                editForm: {},
                //添加公告的校验规则
                addFormRules: {
                    title: [
                        {required: true, message: '请输入公告标题', trigger: 'blur'},
                        {min: 2, max: 20, message: '公告标题必须在2-20字符之间', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '请输入公告内容', trigger: 'blur'},
                    ],
                }
            }
        },
        //一开始就显示公告列表
        created()
        {
            this.getAnnouncementList();
        },
        methods: {
            async getAnnouncementList()
            {
                let result = await this.$http.post(this.$api.PrincipalGetAnnouncementsUrl,
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

            //添加公告
            showAddAnnouncement()
            {

                this.addDialogVisible = true;
                //清空表单的校验项
                this.$nextTick(() =>
                {
                    this.$refs.addFormRef.resetFields();
                });

                this.addForm.AnnouncementId = "";
                this.addForm.title = "";
                this.addForm.content = "";
                this.addForm.time = '';
            },

            //点击确定按钮后,添加公告
            addAnnouncement()
            {
                this.$refs.addFormRef.validate(
                    async valid =>
                    {
                        if (!valid) return;
                        this.addForm.AnnouncementId = 0;
                        let result = await this.$http.post(this.$api.PrincipalAddOneAnnouncement,
                            {
                                AnnouncementId: 0,
                                title: this.addForm.title,
                                content: this.addForm.content,
                                time: this.addForm.time,
                            });

                        //隐藏添加公告对话框
                        this.addDialogVisible = false;
                        await this.getAnnouncementList();
                        this.$message.info("添加公告成功!");
                    }
                );
            },
            //添加公告框里面的取消添加公告按钮触发的事件
            cancelAdd()
            {
                //隐藏添加公告对话框
                this.addDialogVisible = false;
                this.$message.info("取消添加公告!");
            },

            async showDialog(AnnouncementId)
            {
                let result = await this.$http.post(this.$api.PrincipalGetOneAnnouncement + "/" + AnnouncementId);
                this.showForm = result.data;
                this.showForm.time = this.showForm.time.substring(0, 10);
                this.showDialogVisible = true;
            },
            //显示公告详情页面按确定后的触发事件
            closeDialogVisible()
            {
                this.showDialogVisible = false;
            },
            cancelEdit()
            {
                this.editDialogVisible = false;
                this.$message.info("取消修改公告!");
            },
            //修改公告页面弹出后,会查询要修改的id所对应公告的内容
            async showEditDialog(AnnouncementId)
            {
                let result = await this.$http.post(this.$api.PrincipalGetOneAnnouncement + "/" + AnnouncementId);
                this.editForm = result.data;
                this.editDialogVisible = true;
            },
            async editAnnouncement()
            {
                this.$refs.editFormRef.validate(
                    async valid =>
                    {
                        if (!valid) return;
                        console.log(this.editForm);
                        await this.$http.post(this.$api.PrincipalUpdateOneAnnouncement + "/" + this.editForm.AnnouncementId, this.editForm);
                        // this.clearAddForm();
                        // this.$refs.addFormRef.resetFields();
                        //关闭对话框
                        this.editDialogVisible = false;
                        //    刷新数据列表
                        await this.getAnnouncementList();
                        //    提示成功
                        this.$message.success("更新用户成功!");
                    }
                );
            },
            //根据ID删除对应信息
            async removeById(AnnouncementId)
            {
                //    弹框提示
                let confirmResult = await this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err);
                //    如果选择不删除
                if (confirmResult !== "confirm")
                {
                    return this.$message.info("已经取消删除");
                } else
                {
                    await this.$http.post(this.$api.PrincipalDeleteOneAnnouncement + "/" + AnnouncementId);
                    this.$message.info("删除成功!");
                    await this.getAnnouncementList();
                }
            }
        }
    }
</script>

<style scoped>
    .text-wrapper {
        white-space: pre-wrap;
    }
</style>

