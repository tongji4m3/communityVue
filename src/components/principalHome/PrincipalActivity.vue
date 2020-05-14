<template>
    <div>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/principleWelcome' }">负责人首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!--        卡片-->
        <el-card class="box-card">
            <!--            搜索与添加-->
            <el-row :gutter="20">
                <el-col :span="7">
                    <!--                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特点内容的活动-->
                    <el-input clearable @clear="getActivityList" placeholder="请输入内容" v-model="queryInfo.query">
                        <el-button slot="append" icon="el-icon-search" @click="getActivityList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible=true">添加活动</el-button>
                </el-col>
            </el-row>
            <!--            活动列表 只展示一些活动信息,详细信息可在详情查看-->
            <el-table :data="activityList">
                <el-table-column type="index"></el-table-column>
                <!--                <el-table-column label="活动编号" prop="id"></el-table-column>-->
                <el-table-column label="活动名称" prop="name"></el-table-column>
                <!--                <el-table-column label="活动介绍" prop="description"></el-table-column>-->
                <!--                <el-table-column label="活动开销" prop="cost"></el-table-column>-->
                <!--                <el-table-column label="活动经费" prop="fund"></el-table-column>-->
                <el-table-column label="活动位置" prop="place"></el-table-column>
                <el-table-column label="活动时间" prop="time"></el-table-column>
                <el-table-column label="活动人数" prop="range"></el-table-column>
                <!--                <el-table-column label="活动申请时间" prop="apply_date"></el-table-column>-->
                <!--                <el-table-column label="活动审核状态" prop="status"></el-table-column>-->
                <!--                <el-table-column label="活动审核信息" prop="information"></el-table-column>-->
                <el-table-column label="显示详情">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="showDialog(scope.row.id)">查看</el-button>
                    </template>

                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--                        修改按钮-->
                        <el-button type="primary" @click="showEditDialog(scope.row.id)" icon="el-icon-edit"></el-button>
                        <!--                        删除按钮-->
                        <el-button type="primary" @click="removeById(scope.row.id)" icon="el-icon-delete"></el-button>

                    </template>
                </el-table-column>

            </el-table>

            <!--            分页区域-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pageNum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="queryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>

        <!--        展示活动对话框-->
        <el-dialog title="活动详情" ref="showFormRef" :visible.sync="showDialogVisible"
                   width="50%">
            <!--            展示内容主体区域 -->
            <el-form :model="addForm" label-width="150px">
                <el-form-item label="活动编号:">
                    <el-input v-model="addForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动名称:">
                    <el-input v-model="addForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动介绍:">
                    <el-input v-model="addForm.description" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动开销:">
                    <el-input v-model="addForm.cost" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动经费:">
                    <el-input v-model="addForm.fund" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动位置:">
                    <el-input v-model="addForm.place" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动时间:">
                    <el-input v-model="addForm.time" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动人数:">
                    <el-input v-model="addForm.range" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动申请时间:">
                    <el-input v-model="addForm.apply_date" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动审核状态:">
                    <el-input v-model="addForm.status" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动审核信息:">
                    <el-input v-model="addForm.information" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动是否公开:">
                    <el-input v-model="addForm.is_public" disabled></el-input>
                </el-form-item>

            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="closeDialogVisible">确 定</el-button>
  </span>
        </el-dialog>


        <!--        添加活动对话框-->
        <el-dialog title="添加活动" :visible.sync="addDialogVisible"
                   width="50%">
            <!--            内容主体区域 放置一个表单-->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="150px">
                <el-form-item label="活动编号:" prop="id">
                    <el-input v-model="addForm.id"></el-input>
                </el-form-item>
                <el-form-item label="活动名称:" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="活动介绍:">
                    <el-input v-model="addForm.description"></el-input>
                </el-form-item>
                <el-form-item label="活动开销:">
                    <el-input v-model="addForm.cost"></el-input>
                </el-form-item>
                <el-form-item label="活动经费:">
                    <el-input v-model="addForm.fund"></el-input>
                </el-form-item>
                <el-form-item label="活动位置:" prop="place">
                    <el-input v-model="addForm.place"></el-input>
                </el-form-item>
                <el-form-item label="活动时间:" prop="time">
                    <el-input v-model="addForm.time"></el-input>
                </el-form-item>
                <el-form-item label="活动人数:">
                    <el-input v-model="addForm.range"></el-input>
                </el-form-item>
                <el-form-item label="活动申请时间:" prop="apply_date">
                    <el-input v-model="addForm.apply_date"></el-input>
                </el-form-item>
                <el-form-item label="活动是否公开:" prop="is_public">
                    <el-input v-model="addForm.is_public"></el-input>
                </el-form-item>
            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
    <el-button @click="cancelAdd">取 消</el-button>
    <el-button type="primary" @click="addActivity">确 定</el-button>
  </span>
        </el-dialog>

        <!--        修改活动对话框-->
        <el-dialog title="修改活动" ref="editFormRef" :visible.sync="editDialogVisible"
                   width="50%">

            <el-form :model="addForm" label-width="150px">
                <el-form-item label="活动编号:">
                    <el-input v-model="addForm.id"></el-input>
                </el-form-item>
                <el-form-item label="活动名称:">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="活动介绍:">
                    <el-input v-model="addForm.description"></el-input>
                </el-form-item>
                <el-form-item label="活动开销:">
                    <el-input v-model="addForm.cost"></el-input>
                </el-form-item>
                <el-form-item label="活动经费:">
                    <el-input v-model="addForm.fund"></el-input>
                </el-form-item>
                <el-form-item label="活动位置:">
                    <el-input v-model="addForm.place"></el-input>
                </el-form-item>
                <el-form-item label="活动时间:">
                    <el-input v-model="addForm.time"></el-input>
                </el-form-item>
                <el-form-item label="活动人数:">
                    <el-input v-model="addForm.range"></el-input>
                </el-form-item>
                <el-form-item label="活动申请时间:">
                    <el-input v-model="addForm.apply_date"></el-input>
                </el-form-item>
                <el-form-item label="活动审核状态:">
                    <el-input v-model="addForm.status"></el-input>
                </el-form-item>
                <el-form-item label="活动审核信息:">
                    <el-input v-model="addForm.information"></el-input>
                </el-form-item>
                <el-form-item label="活动是否公开:">
                    <el-input v-model="addForm.is_public"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelEdit">取 消</el-button>
                    <el-button type="primary" @click="editActivity">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data()
        {
            return {
                //    获取活动列表参数对象
                queryInfo: {
                    query: '',
                    //当前的页码
                    pageNum: 1,
                    //每页显示的条数
                    pageSize: 2
                },
                //查询到的当页活动
                activityList: [],
                //总页码数,用于分页的显示
                total: 0,
                //添加,修改,展示活动对话框的显示与隐藏
                addDialogVisible: false,
                editDialogVisible: false,
                showDialogVisible: false,

                //添加活动表单数据
                addForm: {
                    id: "",
                    name: "",
                    description: "",
                    cost: "",
                    fund: "",
                    place: "",
                    time: "",
                    range: "",
                    apply_date: "",
                    status: "",
                    information: "",
                    is_public: ""
                },
                //添加活动的校验规则
                addFormRules: {
                    id: [
                        {required: true, message: '请输入活动id', trigger: 'blur'},
                        {min: 3, max: 7, message: 'id必须在3-7字符之间', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 2, max: 10, message: '活动名称必须在2-10字符之间', trigger: 'blur'}
                    ],
                    place: [
                        {required: true, message: '请输入活动地点', trigger: 'blur'},
                    ],
                    time: [
                        {required: true, message: '请输入活动时间', trigger: 'blur'},
                        {min: 3, max: 7, message: 'id必须在3-7字符之间', trigger: 'blur'}
                    ],
                    apply_date: [
                        {required: true, message: '请输入活动申请时间', trigger: 'blur'},
                        {min: 3, max: 7, message: 'id必须在3-7字符之间', trigger: 'blur'}
                    ],
                    is_public: [
                        {required: true, message: '请输入活动是否公有', trigger: 'blur'},
                        {min: 3, max: 7, message: 'id必须在3-7字符之间', trigger: 'blur'}
                    ],
                }
            }
        },
        //一开始就显示活动列表
        created()
        {
            this.getActivityList();
        },
        methods: {
            async getActivityList()
            {
                let result = await this.$http.post(this.$api.PrincipalGetActivityUrl, this.queryInfo);
                if (result.data.status !== "200")
                {
                    this.$message.info(result.data.msg);
                } else
                {
                    this.activityList = result.data.activities;
                    this.total = parseInt(result.data.total);
                }
            },
            //监听pageSize改变的事件
            handleSizeChange(newSize)
            {
                this.queryInfo.pageSize = newSize;
                this.getActivityList();
            },
            //监听pageNum改变的事件
            handleCurrentChange(newPage)
            {
                this.queryInfo.pageNum = newPage;
                this.getActivityList();
            },

            //抽取出来,当弹出的页面结束后,会清空内容
            // 因为公有addForm所以必须有这个操作,且点击后都是重新axios请求新信息,所以没有问题
            clearAddForm()
            {
                //清空数据
                this.addForm.id = "";
                this.addForm.name = "";
                this.addForm.description = "";
                this.addForm.cost = "";
                this.addForm.fund = "";
                this.addForm.place = "";
                this.addForm.time = "";
                this.addForm.range = "";
                this.addForm.apply_date = "";
                this.addForm.status = "";
                this.addForm.information = "";
                this.addForm.is_public = "";
            },

            //点击确定按钮后,添加活动
            addActivity()
            {
                this.$refs.addFormRef.validate(
                    async valid =>
                    {
                        if (!valid) return;
                        let result = await this.$http.post(this.$api.PrincipalAddActivityUrl, this.addForm);
                        console.log(result.data);
                        let status = result.data.status;
                        if (!status || status !== "200")
                        {
                            this.$message.info(result.data.msg);
                        } else
                        {

                            //清空表单的校验项
                            this.$refs.addFormRef.resetFields();
                            //防止非必填项没清理掉
                            this.clearAddForm();

                            //隐藏添加活动对话框
                            this.addDialogVisible = false;
                            this.getActivityList();
                            this.$message.info("添加活动成功!");
                        }
                    }
                );
            },
            //添加活动框里面的取消添加活动按钮触发的事件
            cancelAdd()
            {
                //清空表单的校验项
                this.$refs.addFormRef.resetFields();
                //防止非必填项没清理掉
                this.clearAddForm();
                //隐藏添加活动对话框
                this.addDialogVisible = false;
                this.$message.info("取消添加活动!");
            },

            async showDialog(id)
            {
                let result = await this.$http.post(this.$api.PrincipalGetOneActivityUrl, id);
                status = result.data.status;
                if (!status || status !== "200")
                {
                    this.$message.info(result.data.msg);
                } else
                {
                    this.addForm = result.data.activity;
                    this.showDialogVisible = true;
                }
            },
            //显示活动详情页面按确定后的触发事件
            closeDialogVisible()
            {
                this.clearAddForm();
                this.showDialogVisible = false;
            },
            cancelEdit()
            {
                this.editDialogVisible = false;
                this.clearAddForm();
                this.$message.info("取消修改活动!");
            },
            //修改活动页面弹出后,会查询要修改的id所对应活动的内容
            async showEditDialog(id)
            {
                let result = await this.$http.post(this.$api.PrincipalGetOneActivityUrl, id);
                status = result.data.status;
                if (!status || status !== "200")
                {
                    this.$message.info(result.data.msg);
                } else
                {
                    this.addForm = result.data.activity;
                    this.editDialogVisible = true;
                }
            },
            async editActivity()
            {
                let result = await this.$http.post(this.$api.PrincipalUpdateActivityUrl, this.addForm);
                status = result.data.status;
                if (!status || status !== "200")
                {
                    this.$message.info(result.data.msg);
                }
                this.clearAddForm();
                //关闭对话框
                this.editDialogVisible = false;
                //    刷新数据列表
                this.getActivityList();
                //    提示成功
                this.$message.success("更新用户成功!");
            },
            //根据ID删除对应信息
            async removeById(id)
            {
                //    弹框提示
                let confirmResult = await this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
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
                    let result = await this.$http.post(this.$api.PrincipalDeleteActivityUrl, id);
                    status = result.data.status;
                    if (!status || status !== "200")
                    {
                        this.$message.info(result.data.msg);
                    }
                    this.$message.info("删除成功!");
                    this.getActivityList();
                }
            }
        }
    }
</script>

<style scoped></style>

