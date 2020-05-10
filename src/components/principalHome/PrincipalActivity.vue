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
                    <el-input clearable @clear="getActivityList" placeholder="请输入内容" v-model="queryInfo.query">
                        <el-button slot="append" icon="el-icon-search" @click="getActivityList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible=true">添加活动</el-button>
                </el-col>
            </el-row>
            <!--            活动列表-->
            <el-table :data="activityList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="活动编号" prop="id"></el-table-column>
                <el-table-column label="活动名称" prop="name"></el-table-column>
                <el-table-column label="活动介绍" prop="description"></el-table-column>
                <el-table-column label="活动开销" prop="cost"></el-table-column>
                <el-table-column label="活动经费" prop="money"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--                        修改按钮-->
                        <el-button type="primary" @click="showEditDialog(scope.row.id)" icon="el-icon-edit"></el-button>
                        <!--                        删除按钮-->
                        <el-button type="primary" @click="removeById(scope.row.id)" icon="el-icon-delete"></el-button>

                    </template>
                </el-table-column>

            </el-table>
        </el-card>

        <!--        添加活动对话框-->
        <el-dialog title="添加活动" :visible.sync="addDialogVisible"
                   width="50%">
            <!--            内容主体区域 放置一个表单-->
            <el-form :model="addForm" label-width="80px">
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
                    <el-input v-model="addForm.money"></el-input>
                </el-form-item>
            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
    <el-button @click="cancelAdd">取 消</el-button>
    <el-button type="primary" @click="addActivity">确 定</el-button>
  </span>
        </el-dialog>

        <!--        修改活动对话框-->
        <el-dialog title="修改活动" :visible.sync="editDialogVisible"
                   width="50%">

            <el-form :model="editForm" label-width="100px">
                <el-form-item label="活动编号:">
                    <el-input v-model="editForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动名称:">
                    <el-input v-model="editForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="活动介绍:">
                    <el-input v-model="editForm.description"></el-input>
                </el-form-item>
                <el-form-item label="活动开销:">
                    <el-input v-model="editForm.cost"></el-input>
                </el-form-item>
                <el-form-item label="活动经费:">
                    <el-input v-model="editForm.money"></el-input>
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
                    username:window.sessionStorage.getItem('username'),
                    query: '',
                    pageNum: 1,
                    pageSize: 2
                },
                activityList: [],
                total: 0,
                //添加,修改活动对话框的显示与隐藏
                addDialogVisible: false,
                editDialogVisible: false,

                //添加活动表单数据
                addForm: {
                    id: "",
                    name: "",
                    description: "",
                    cost: "",
                    money: ""
                },
                //查询到的对象
                editForm: {}
            }
        },
        created()
        {
            this.getActivityList();
        },
        methods: {
            async getActivityList()
            {
                let result = await this.$http.post(this.$api.PrincipalGetActivityUrl, this.queryInfo);
                console.log(result.data);
                if (result.data.status !== "200")
                {
                    console.log("失败了");
                } else
                {
                    this.activityList = result.data.activities;
                    this.total = result.data.total;
                }
            },
            //点击确定按钮后,添加活动
            async addActivity()
            {
                let result = await this.$http.post(this.$api.PrincipalAddActivityUrl, this.addForm);
                console.log(result.data);
                let status = result.data.status;
                if (!status || status !== "200")
                {
                    this.$message.info(result.data.msg);
                } else
                {
                    //清空数据
                    this.addForm.id = "";
                    this.addForm.name = "";
                    this.addForm.description = "";
                    this.addForm.cost = "";
                    this.addForm.money = "";
                    //隐藏添加活动对话框
                    this.addDialogVisible = false;
                    this.$message.info("添加活动成功!");
                }
            },
            cancelAdd()
            {
                //清空数据
                this.addForm.id = "";
                this.addForm.name = "";
                this.addForm.description = "";
                this.addForm.cost = "";
                this.addForm.money = "";
                //隐藏添加活动对话框
                this.addDialogVisible = false;
                this.$message.info("取消添加活动!");
            },
            async showEditDialog(id)
            {
                let result = await this.$http.post(this.$api.PrincipalGetOneActivityUrl, id);
                status = result.data.status;
                if (!status || status !== "200")
                {
                    this.$message.info(msg);
                } else
                {
                    this.editForm = result.data.activities[0];
                    this.editDialogVisible = true;
                }
            },
            cancelEdit(){
                this.editDialogVisible = false;
            },
            async editActivity()
            {
                let result = await this.$http.post(this.$api.PrincipalUpdateOneActivityUrl, {
                    id:this.editForm.id,
                    description:this.editForm.description,
                    cost:this.editForm.cost,
                    money:this.editForm.money
                });
                status = result.data.status;
                if (!status || status !== "200")
                {
                    console.log("修改失败");
                }
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
                }).catch(err=>err);
            //    如果选择不删除
                if(confirmResult!=="confirm")
                {
                    return this.$message.info("已经取消删除");
                }
                else
                {
                    let result = await this.$http.post(this.$api.PrincipalDeleteActivityUrl, id);
                    status = result.data.status;
                    if (!status || status !== "200")
                    {
                        this.$message.info("删除失败!");
                    }
                    this.$message.info("删除成功!");
                    this.getActivityList();
                }

            }
        }
    }

</script>
<style scoped></style>

