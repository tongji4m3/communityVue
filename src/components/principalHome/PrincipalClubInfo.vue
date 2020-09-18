<template>
    <div>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/principleWelcome' }">负责人首页</el-breadcrumb-item>
            <el-breadcrumb-item>社团信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <!-- <span> {{addForm.name}}的社团负责人您好！</span> -->
        <!-- <br> --><!-- <br> -->
        <!--        卡片-->
        <el-card  :body-style="{ padding: '10px'}">
            <div v-html="addForm.logo">{{addForm.logo}}</div>
            <div v-html="addForm.description" style="margin: 20px;">{{addForm.description}}</div>
        </el-card>





<!--        &lt;!&ndash;        卡片&ndash;&gt;-->
<!--        <el-card class="box-card" :body-style="{ padding: '10px'}">-->
<!--&lt;!&ndash;             <span> {{addForm.name}}的社团负责人您好！</span>&ndash;&gt;-->
<!--            &lt;!&ndash; <br>-->
<!--            <br> &ndash;&gt;-->
<!--            <div v-html="addForm.logo">{{addForm.logo}}</div>-->
<!--            <div v-html="addForm.description" style="margin: 20px;">{{addForm.description}}</div>-->
<!--            &lt;!&ndash;            <span> {{addForm.description}}</span>&ndash;&gt;-->


<!--        </el-card>-->
        <div align="center">
            <el-popconfirm title="确定解散社团吗？" @onConfirm="deleteClub" cancelButtonType="danger" icon="el-icon-magic-stick" style="margin: 15px;">
                <el-button slot="reference" type="danger">解散社团</el-button>
            </el-popconfirm>
            <!--                <el-button type="danger" @click="deleteClub">解散社团</el-button>-->
            <el-button type="primary" @click="showEditClubInfo" style="margin: 20px;">修 改</el-button>
            <el-button type="primary" @click="showEditClubLogo">修改Logo</el-button>
        </div>
        <!--        修改社团信息对话框-->
        <el-dialog title="修改社团信息" :visible.sync="editDialogVisible"
                   width="50%" center>
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
                <el-form-item label="社团名称:">
                    <el-input v-model="addForm.name" placeholder="请输入社团名称..." style="width:82%;"></el-input>
                </el-form-item>

                <quill-editor v-model="addForm.description" ref="myQuillEditor" style="height: 500px;width: 82%;" :options="editorOption">
                </quill-editor>

                <!--                <el-form-item label="社团介绍:" prop="discription">-->
                <!--                    <el-input-->
                <!--                        type="textarea"-->
                <!--                        :rows="14"-->
                <!--                        placeholder="请输入社团介绍..."-->
                <!--                        v-model="addForm.description">-->
                <!--                    </el-input>-->
                <!--                </el-form-item>-->
            </el-form>

            <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelEdit" style="margin-right: 20px;">取 消</el-button>
                    <el-button type="primary" @click="editClubInfo">确 定</el-button>
            </span>
        </el-dialog>
        <!--        修改社团信息对话框-->
        <el-dialog title="修改社团信息" :visible.sync="editDialogVisible2"
                   width="50%" center>
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
                <el-form-item label="社团名称:">
                    <el-input v-model="addForm.name" placeholder="请输入社团名称..." style="width:82%;"></el-input>
                </el-form-item>
                <quill-editor v-model="addForm.logo" ref="myQuillEditor" style="height: 500px;width: 82%;" :options="editorOption">
                </quill-editor>
                <!--                <el-form-item label="社团介绍:" prop="discription">-->
                <!--                    <el-input-->
                <!--                        type="textarea"-->
                <!--                        :rows="14"-->
                <!--                        placeholder="请输入社团介绍..."-->
                <!--                        v-model="addForm.description">-->
                <!--                    </el-input>-->
                <!--                </el-form-item>-->
            </el-form>

            <span slot="footer" class="dialog-footer">
                          <el-button @click="cancelEdit" style="margin-right: 20px;">取 消</el-button>
                          <el-button type="primary" @click="editClubLogo">确 定</el-button>
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
            editDialogVisible: false,
            editDialogVisible2: false,
            //添加赞助表单数据
            addForm: {
                name: "",
                description:"",
                logo:"",
                status: false,
            },
            //添加赞助申请的校验规则
            addFormRules: {},

            content: null,
            editorOption: {}
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
                    logo:this.logo,
                });
            this.addForm = result.data;
            // console.log(this.addForm.description);
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
        async showEditClubLogo()
        {
            let result = await this.$http.post(this.$api.PrincipalGetClubInfo);
            this.addForm = result.data;
            this.editDialogVisible2 = true;
        },
        //点击确定按钮后,修改社团信息
        async editClubInfo()
        {
            this.$refs.addFormRef.validate(
                async valid =>
                {
                    if (!valid) return;
                    // console.log(this.addForm);
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
        async editClubLogo()
        {
            this.$refs.addFormRef.validate(
                async valid =>
                {
                    if (!valid) return;
                    // console.log(this.addForm);
                    await this.$http.post(this.$api.PrincipalEditClubInfo, this.addForm);
                    // this.clearAddForm();
                    // this.$refs.addFormRef.resetFields();
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
            window.sessionStorage.clear();
            await this.$router.push({ path: "/welcome" });
        },
    }
}

</script>
<style scoped>
	.box-card{
		height: 400px;
	}
</style>