<template>
    <div>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/principleWelcome' }">负责人首页</el-breadcrumb-item>
            <el-breadcrumb-item>社团信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <!--        卡片-->
        <el-card class="box-card" v-model="addForm.description">
        </el-card>

        <!--            底部区域-->
        <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showEditClubInfo">修 改</el-button>
        </span>

        <!--        修改社团信息对话框-->
        <el-dialog title="修改社团信息" :visible.sync="editDialogVisible"
                   width="80%">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
                <el-form-item label="社团名称:">
                    <el-input v-model="addForm.name" placeholder="请输入社团名称..."></el-input>
                </el-form-item>
                <el-form-item label="社团介绍:" prop="discription">
                    <el-input
                        type="textarea"
                        :rows="14"
                        placeholder="请输入社团介绍..."
                        v-model="addForm.description">
                    </el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelEdit">取 消</el-button>
                    <el-button type="primary" @click="editClubInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data()
    {

        return {
            editDialogVisible: false,
            //添加赞助表单数据
            addForm: {
                name: "",
                description:"",
                status: false,
            },
            //添加赞助申请的校验规则
            addFormRules: {}
        }
    },
    //一开始就显示赞助列表
    created()
    {
        this.getClubInfo();
    },
    methods: {
        async getClubInfo()
        {
            let result = await this.$http.post(this.$api.PrincipalGetClubInfo,
                {
                    description: this.description,
                });
            this.addForm = result.data;
        },
        cancelEdit()
        {
            this.editDialogVisible = false;
            this.$message.info("取消修改社团信息!");
        },
        async showEditClubInfo()
        {
            let result = await this.$http.post(this.$api.PrincipalGetClubInfo);
            this.addForm = result.data;
            this.editDialogVisible = true;
        },
        //点击确定按钮后,修改社团信息
        async editClubInfo()
        {
            this.$refs.addFormRef.validate(
                async valid =>
                {
                    if (!valid) return;
                    console.log(this.addForm);
                    await this.$http.post(this.$api.PrincipalEditClubInfo, this.addForm);
                    // this.clearAddForm();
                    // this.$refs.addFormRef.resetFields();
                    //关闭对话框
                    this.editDialogVisible = false;
                    //    刷新数据列表
                    await this.getClubInfo();
                    //    提示成功
                    this.$message.success("修改社团信息成功!");
                }
            );
        },
    }
}

</script>
<style scoped></style>