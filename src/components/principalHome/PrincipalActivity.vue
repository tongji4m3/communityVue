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
                    <!--                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特点内容的活动-->
                    <el-input clearable @clear="getActivityList" placeholder="请输入内容" v-model="query">
                        <el-button slot="append" icon="el-icon-search" @click="getActivityList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="success" @click="showAddActivity">添加活动</el-button>
                </el-col>
            </el-row>
            <!--            活动列表 只展示一些活动信息,详细信息可在详情查看-->
            <el-table :data="activityList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="活动名称" prop="name"></el-table-column>
                <el-table-column label="活动位置" prop="place"></el-table-column>
                <el-table-column label="显示详情">
                    <template slot-scope="scope">
                        <el-button type="success" @click="showDialog(scope.row.activityId)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--                        修改按钮-->
                        <el-button type="success" @click="showEditDialog(scope.row.activityId)"
                                   icon="el-icon-edit"></el-button>
                        <!--                        删除按钮-->
                        <el-button type="success" @click="removeById(scope.row.activityId)"
                                   icon="el-icon-delete"></el-button>

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
                    :total="totalCount">
            </el-pagination>
        </el-card>

        <!--        展示活动对话框-->
        <el-dialog title="活动详情" ref="showFormRef" :visible.sync="showDialogVisible"
                   width="50%">
            <!--            展示内容主体区域 -->
            <el-form :model="addForm" label-width="150px">
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
                <el-form-item label="活动时间:" prop="time">
                    <el-date-picker type="date" v-model="addForm.time" style="width: 100%;" disabled></el-date-picker>
                </el-form-item>
                <el-form-item label="活动申请时间:" prop="applyDate">
                    <el-date-picker type="date" v-model="addForm.applyDate" style="width: 100%;"
                                    disabled></el-date-picker>
                </el-form-item>
                <el-form-item label="活动审核状态:" prop="status">
                    <el-switch v-model="addForm.status" disabled></el-switch>
                </el-form-item>
                <el-form-item label="活动审核信息:">
                    <el-input v-model="addForm.suggestion" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动是否公开:" prop="isPublic">
                    <el-switch v-model="addForm.isPublic" disabled></el-switch>
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
                <el-form-item label="活动名称:" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="活动介绍:" prop="description">
                    <el-input type="textarea" v-model="addForm.description"></el-input>
                </el-form-item>
                <el-form-item label="活动开销:" prop="cost">
                    <el-input v-model="addForm.cost"></el-input>
                </el-form-item>
                <el-form-item label="活动经费:" prop="fund">
                    <el-input v-model="addForm.fund"></el-input>
                </el-form-item>
                <el-form-item label="活动位置:" prop="place">
                    <el-select v-model="addForm.place" placeholder="请选择活动区域">
                        <el-option label="本部南楼" value="本部南楼"></el-option>
                        <el-option label="本部北楼" value="本部北楼"></el-option>
                        <el-option label="本部西南七楼" value="本部西南七楼"></el-option>
                        <el-option label="嘉定图书馆" value="嘉定图书馆"></el-option>
                        <el-option label="嘉定友园19号楼" value="嘉定友园19号楼"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间:" prop="time">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.time"
                                    style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="活动是否公开:" prop="isPublic">
                    <el-switch v-model="addForm.isPublic"></el-switch>
                </el-form-item>
            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
    <el-button @click="cancelAdd">取 消</el-button>
    <el-button type="primary" @click="addActivity">确 定</el-button>
  </span>
        </el-dialog>

        <!--        修改活动对话框-->
        <el-dialog title="修改活动"   :visible.sync="editDialogVisible"
                   width="50%">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="150px">
                <el-form-item label="活动名称:" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="活动介绍:" prop="description">
                    <el-input type="textarea" v-model="addForm.description"></el-input>
                </el-form-item>
                <el-form-item label="活动开销:" prop="cost">
                    <el-input v-model="addForm.cost"></el-input>
                </el-form-item>
                <el-form-item label="活动经费:" prop="fund">
                    <el-input v-model="addForm.fund"></el-input>
                </el-form-item>
                <el-form-item label="活动位置:" prop="place">
                    <el-select v-model="addForm.place" placeholder="请选择活动区域">
                        <el-option label="本部南楼" value="本部南楼"></el-option>
                        <el-option label="本部北楼" value="本部北楼"></el-option>
                        <el-option label="本部西南七楼" value="本部西南七楼"></el-option>
                        <el-option label="嘉定图书馆" value="嘉定图书馆"></el-option>
                        <el-option label="嘉定友园19号楼" value="嘉定友园19号楼"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="活动时间:" prop="time">
                    <el-date-picker type="date" v-model="addForm.time" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="活动是否公开:" prop="isPublic">
                    <el-switch v-model="addForm.isPublic"></el-switch>
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
            let checkCost = (rule, value, cb) =>
            {
                const regCost = /^\d{1,8}\.?\d{0,2}$/;
                if (regCost.test(value))
                {
                    //合法密码
                    return cb();
                }
                cb(new Error("活动开销必须是数字,且小于一千万!"));

            };
            let checkFund = (rule, value, cb) =>
            {
                const regFund = /^\d{1,8}\.?\d{0,2}$/;
                if (regFund.test(value))
                {
                    //合法密码
                    return cb();
                }
                cb(new Error("活动经费必须是数字,且小于一千万!"));

            };

            return {
                //    获取活动列表参数对象
                query: '',
                //当前的页码
                pageNumber: 1,
                //每页显示的条数
                pageSize: 2,

                //查询到的当页活动
                activityList: [],
                //总条数,用于分页的显示
                totalCount: 0,
                //添加,修改,展示活动对话框的显示与隐藏
                addDialogVisible: false,
                editDialogVisible: false,
                showDialogVisible: false,

                //添加活动表单数据
                addForm: {
                    activityId: "",
                    name: "",
                    description: "",
                    cost: "",
                    fund: "",
                    place: "",
                    time: "",
                    applyDate: "",
                    isPublic: true,
                    status: false,
                    suggestion: "",
                },
                //添加活动的校验规则
                addFormRules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 2, max: 10, message: '活动名称必须在2-10字符之间', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '请输入活动描述', trigger: 'blur'}
                    ],
                    cost: [
                        {required: true, message: '请输入活动开销', trigger: 'blur'},
                        {validator: checkCost, trigger: "blur"}
                    ],
                    fund: [
                        {required: true, message: '请输入活动经费', trigger: 'blur'},
                        {validator: checkFund, trigger: "blur"}
                    ],
                    place: [
                        {required: true, message: '请输入活动地点', trigger: 'blur'},
                    ],
                    time: [
                        {required: true, message: '请输入活动时间', trigger: 'blur'},
                    ]
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

                this.addForm.activityId = "";
                this.addForm.name = "";
                this.addForm.description = "";
                this.addForm.cost = "";
                this.addForm.fund = "";
                this.addForm.place = "";
                this.addForm.time = '';
                this.addForm.applyDate = "";
                this.addForm.status = false;
                this.addForm.suggestion = "";
                this.addForm.isPublic = true;
            },

            //点击确定按钮后,添加活动
            addActivity()
            {
                this.$refs.addFormRef.validate(
                    async valid =>
                    {
                        if (!valid) return;
                        this.addForm.activityId = 0;
                        console.log(this.addForm);
                        let result = await this.$http.post(this.$api.PrincipalAddOneActivityUrl,
                            {
                                activityId: 0,
                                name: this.addForm.name,
                                fund: parseFloat(this.addForm.fund),
                                cost: parseFloat(this.addForm.cost),
                                place: this.addForm.place,
                                time: this.addForm.time,
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

            async showDialog(activityId)
            {
                let result = await this.$http.post(this.$api.PrincipalGetOneActivityUrl + "/" + activityId);
                this.addForm = result.data;
                console.log(this.addForm);
                this.showDialogVisible = true;
            },
            //显示活动详情页面按确定后的触发事件
            closeDialogVisible()
            {
                this.showDialogVisible = false;
            },
            cancelEdit()
            {
                this.editDialogVisible = false;
                this.$message.info("取消修改活动!");
            },
            //修改活动页面弹出后,会查询要修改的id所对应活动的内容
            async showEditDialog(activityId)
            {
                let result = await this.$http.post(this.$api.PrincipalGetOneActivityUrl + "/" + activityId);
                this.addForm = result.data;
                this.editDialogVisible = true;
            },
            async editActivity()
            {
                this.$refs.addFormRef.validate(
                    async valid =>
                    {
                        if (!valid) return;
                        console.log(this.addForm);
                        await this.$http.post(this.$api.PrincipalUpdateOneActivityUrl + "/" + this.addForm.activityId, this.addForm);
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

<style scoped></style>

