<template>
    <div>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/principleWelcome' }">负责人首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>
        <!--        卡片-->
        <el-card class="box-card">
            <!--            搜索与添加-->
            <el-row :gutter="20">
                <el-col :span="7">
                    <!--                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特定内容的活动-->
                    <el-input clearable @clear="getActivityList" placeholder="请输入内容" v-model="query">
                        <el-button slot="append" icon="el-icon-search" @click="getActivityList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="showAddActivity">添加活动</el-button>
                </el-col>
            </el-row>
            <!--            活动列表 只展示一些活动信息,详细信息可在详情查看-->
            <el-table :data="activityList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="活动名称" prop="name"></el-table-column>
                <el-table-column label="活动位置" prop="place"></el-table-column>
                <el-table-column label="显示详情">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="showDialog(scope.row.activityId)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--                        修改按钮-->
                        <el-button type="primary" @click="showEditDialog(scope.row.activityId)"
                                   icon="el-icon-edit"></el-button>
                        <!--                        删除按钮-->
                        <el-button type="primary" @click="removeById(scope.row.activityId)"
                                   icon="el-icon-delete"></el-button>

                    </template>
                </el-table-column>
            </el-table>

            <!--        添加活动对话框-->
            <el-dialog title="添加活动" :visible.sync="addDialogVisible"
                       width="630px" top="60px" center>
                <!--            内容主体区域 放置一个表单-->
                <!--绑定到addForm中，绑定验证规则对象addFormRules 表单校验项的引用为addFormRef-->
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="150px"
                         style="height:470px">
                    <!-- prop属性指定验证规则-->
                    <el-form-item label="活动名称:" prop="name">
                        <!--v-model双向绑定-->
                        <el-input style="width:360px" v-model="addForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动介绍:" prop="description">
                        <el-input style="width:360px" type="textarea"
                                  :autosize="{ minRows: 1, maxRows: 4}" v-model="addForm.description"></el-input>
                    </el-form-item>
                    <el-form-item label="活动经费:" prop="budget">
                        <el-input style="width:360px" v-model="addForm.budget"></el-input>
                    </el-form-item>
                    <el-form-item label="活动位置:" prop="place">
                        <el-select v-model="addForm.place" placeholder="请选择活动区域" style="width: 360px">
                            <el-option label="本部南楼" value="本部南楼"></el-option>
                            <el-option label="本部北楼" value="本部北楼"></el-option>
                            <el-option label="本部西南七楼" value="本部西南七楼"></el-option>
                            <el-option label="嘉定图书馆" value="嘉定图书馆"></el-option>
                            <el-option label="嘉定友园19号楼" value="嘉定友园19号楼"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动时间:" prop="eventTime">
                        <el-date-picker type="date" placeholder="选择日期" v-model="addForm.eventTime"
                                        style="width: 360px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="是否公开:" prop="isPublic">
                        <el-switch v-model="addForm.isPublic"></el-switch>
                    </el-form-item>
                </el-form>
                <!--            底部区域-->
                <span slot="footer" class="dialog-footer">
                <el-button style="margin-right:20px" @click="cancelAdd">取 消</el-button>
                <el-button style="margin-left:20px" type="primary" @click="addActivity">确 定</el-button>
            </span>
            </el-dialog>

            <!--        展示活动对话框-->
            <el-dialog title="活动详情" :visible.sync="showDialogVisible"
                       width="630px" top="60px" center>
                <!--            展示内容主体区域 -->
                <el-form :model="showForm" label-width="150px" style="height:650px">
                    <el-form-item label="活动名称:">
                        <el-input style="width:360px" v-model="showForm.name" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="活动介绍:">
                        <el-input type="textarea"
                                  :autosize="{ minRows: 1, maxRows: 4}" style="width:360px"
                                  v-model="showForm.description"
                                  readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="活动经费:">
                        <el-input style="width:360px" v-model="showForm.budget" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="活动位置:">
                        <el-input style="width:360px" v-model="showForm.place" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="活动时间:">
                        <el-date-picker style="width:360px" type="date" v-model="showForm.eventTime"
                                        readonly="true"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="申请时间:">
                        <el-date-picker style="width:360px" type="date" v-model="showForm.applyDate"
                                        readonly="true"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="审核状态:">
                        <el-switch v-model="showForm.status" disabled></el-switch>
                    </el-form-item>
                    <el-form-item label="审核信息:">
                        <el-input style="width:360px" v-model="showForm.suggestion" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="是否公开:" >
                        <el-switch v-model="showForm.isPublic" disabled></el-switch>
                    </el-form-item>

                </el-form>
                <!--                底部区域-->
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeDialogVisible">确 定</el-button>
            </span>
            </el-dialog>

            <!--        修改活动对话框-->
            <el-dialog title="修改活动" :visible.sync="editDialogVisible"
                       width="630px" top="60px" center>
                <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="150px" style="height:470px">
                    <el-form-item label="活动名称:" prop="name">
                        <el-input style="width:360px" v-model="editForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动介绍:" prop="description">
                        <el-input style="width:360px" type="textarea"
                                  :autosize="{ minRows: 1, maxRows: 4}" v-model="editForm.description"></el-input>
                    </el-form-item>
                    <el-form-item label="活动经费:" prop="budget">
                        <el-input style="width:360px" v-model="editForm.budget"></el-input>
                    </el-form-item>
                    <el-form-item label="活动位置:" prop="place">
                        <el-select v-model="editForm.place" placeholder="请选择活动区域" style="width:360px">
                            <el-option label="本部南楼" value="本部南楼"></el-option>
                            <el-option label="本部北楼" value="本部北楼"></el-option>
                            <el-option label="本部西南七楼" value="本部西南七楼"></el-option>
                            <el-option label="嘉定图书馆" value="嘉定图书馆"></el-option>
                            <el-option label="嘉定友园19号楼" value="嘉定友园19号楼"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="活动时间:" prop="eventTime">
                        <el-date-picker style="width:360px" type="date" v-model="editForm.eventTime">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="是否公开:" prop="isPublic">
                        <el-switch v-model="editForm.isPublic"></el-switch>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button style="margin-right:20px" @click="cancelEdit">取 消</el-button>
                    <el-button style="margin-left:20px" type="primary" @click="editActivity">确 定</el-button>
            </span>
            </el-dialog>
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
    </div>
</template>

<script>
    export default {
        data()
        {
            let checkBudget = (rule, value, cb) =>
            {
                const regBudget = /^\d{1,8}\.?\d{0,2}$/;
                if (regBudget.test(value))
                {
                    //合法开销
                    return cb();
                }
                cb(new Error("活动经费必须是数字,且小于一千万!"));

            };
            return {
                //获取活动列表参数对象
                //查询到的当页活动
                activityList: [],

                query: '',
                //当前的页码
                pageNumber: 1,
                //每页显示的条数
                pageSize: 2,
                //总条数,用于分页的显示
                totalCount: 0,

                //添加,修改,展示活动对话框的显示与隐藏
                addDialogVisible: false,
                editDialogVisible: false,
                showDialogVisible: false,

                //添加活动表单数据
                addForm: {
                    name: "",
                    description: "",
                    budget: "",
                    place: "",
                    eventTime: "",
                    isPublic: true
                },
                showForm: {},
                editForm: {},
                //添加活动的校验规则
                addFormRules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 2, max: 10, message: '活动名称必须在2-10字符之间', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '请输入活动描述', trigger: 'blur'}
                    ],
                    budget: [
                        {required: true, message: '请输入活动开销', trigger: 'blur'},
                        {validator: checkBudget, trigger: "blur"}
                    ],
                    place: [
                        {required: true, message: '请输入活动地点', trigger: 'blur'},
                    ],
                    eventTime: [
                        {required: true, message: '请输入活动时间', trigger: 'blur'},
                    ]
                }
            };
        },
        //一开始就显示活动列表
        created()
        {
            this.getActivityList();
        },
        methods: {
            //获取活动列表
            async getActivityList()
            {
                let result = await this.$http.post(this.$api.PrincipalGetActivitiesUrl,
                    {
                        query: this.query,
                        pageNumber: this.pageNumber,
                        pageSize: this.pageSize,
                        status: true
                    });

                this.activityList = result.data.data;
                this.totalCount = parseInt(result.data.totalCount);
            },
            //监听pageSize改变的事件
            handleSizeChange(newSize)
            {
                this.pageSize = newSize;
                this.getActivityList();
            },
            //监听pageNum改变的事件
            handleCurrentChange(newPage)
            {
                this.pageNumber = newPage;
                this.getActivityList();
            },
            //添加活动
            showAddActivity()
            {
                this.addDialogVisible = true;
                //清空表单的校验项
                this.$nextTick(() =>
                {
                    this.$refs.addFormRef.resetFields();
                });

                this.addForm.name = "";
                this.addForm.description = "";
                this.addForm.budget = "";
                this.addForm.place = "";
                this.addForm.eventTime = '';
                this.addForm.isPublic = true;
            },
            //点击确定按钮后,添加活动
            addActivity()
            {
                this.$refs.addFormRef.validate(
                    async valid =>
                    {
                        if (!valid) return;
                        let result = await this.$http.post(this.$api.PrincipalAddOneActivityUrl,
                            {
                                activityId: 0,
                                name: this.addForm.name,
                                eventTime: this.addForm.eventTime,
                                budget: parseFloat(this.addForm.budget),
                                place: this.addForm.place,
                                description: this.addForm.description,
                                isPublic: this.addForm.isPublic
                            });

                        //隐藏添加活动对话框
                        this.addDialogVisible = false;
                        this.getActivityList();
                        this.$message.info("添加活动成功!");
                    }
                );
            },
            //添加活动框里面的取消添加活动按钮触发的事件
            cancelAdd()
            {
                //隐藏添加活动对话框
                this.addDialogVisible = false;
                this.$message.info("取消添加活动!");
            },

            //根据活动ID,展示活动具体信息
            async showDialog(activityId)
            {
                let result = await this.$http.post(this.$api.PrincipalGetOneActivityUrl + "/" + activityId);
                this.showForm = result.data;
                this.showDialogVisible = true;
            },
            //显示活动详情页面按确定后的触发事件
            closeDialogVisible()
            {
                this.showDialogVisible = false;
            },
            //取消修改活动
            cancelEdit()
            {
                this.editDialogVisible = false;
                this.$message.info("取消修改活动!");
            },
            //修改活动页面弹出后,会查询要修改的id所对应活动的内容
            async showEditDialog(activityId)
            {
                let result = await this.$http.post(this.$api.PrincipalGetOneActivityUrl + "/" + activityId);
                this.editForm = result.data;
                this.editDialogVisible = true;
            },
            //实现具体的修改活动操作
            async editActivity()
            {
                this.$refs.editFormRef.validate(
                    async valid =>
                    {
                        if (!valid) return;
                        console.log(this.editForm);
                        await this.$http.post(this.$api.PrincipalUpdateOneActivityUrl + "/" + this.editForm.activityId, this.editForm);
                        // this.clearAddForm();
                        // this.$refs.addFormRef.resetFields();
                        //关闭对话框
                        this.editDialogVisible = false;
                        //    刷新数据列表
                        this.getActivityList();
                        //    提示成功
                        this.$message.success("更新用户成功!");
                    }
                );
            },
            //根据ID删除对应信息
            async removeById(activityId)
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
                    await this.$http.post(this.$api.PrincipalDeleteOneActivityUrl + "/" + activityId);
                    this.$message.info("删除成功!");
                    this.getActivityList();
                }
            }
        }
    }
</script>

<style scoped>
</style>

