<template>
    <div>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/principleWelcome' }">负责人首页</el-breadcrumb-item>
            <el-breadcrumb-item>赞助申请</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <!--        卡片-->
        <el-card class="box-card">
            <!--            搜索与添加-->
            <el-row :gutter="20">
                <el-col :span="7">
                    <!--                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特点内容的公告-->
                    <el-input clearable @clear="getSponsorshipList" placeholder="请输入内容" v-model="query">
                        <el-button slot="append" icon="el-icon-search" @click="getSponsorshipList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="success" @click="showAddSponsorship">添加赞助申请</el-button>
                </el-col>
            </el-row>
            <!--            公告列表 只展示一些公告信息,详细文本可在详情查看-->
            <el-table :data="SponsorshipList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="编号" prop="sponsorshipId"></el-table-column>
                <el-table-column label="赞助方" prop="sponsor"></el-table-column>
                <el-table-column label="赞助金额/￥" prop="amount"></el-table-column>
                <el-table-column label="申请时间" prop="time"></el-table-column>
                <el-table-column label="状态" prop="status"></el-table-column>
                <el-table-column label="显示详情">
                    <template slot-scope="scope">
                        <el-button type="success" @click="showDialog(scope.row.sponsorshipId)">查看</el-button>
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

        <!--        展示赞助申请的对话框-->
        <el-dialog title="公告详情" ref="showFormRef" :visible.sync="showDialogVisible"
                   width="50%">
            <!--            展示内容主体区域 -->
            <el-form :model="addForm" label-width="150px">
                <el-form-item label="编号:">
                    <el-input v-model="addForm.sponsorshipId" disabled></el-input>
                </el-form-item>
                <el-form-item label="赞助方:">
                    <el-input v-model="addForm.sponsor" disabled></el-input>
                </el-form-item>
                <el-form-item label="赞助金额/￥:">
                    <el-input v-model="addForm.amount" disabled></el-input>
                </el-form-item>
                <el-form-item label="赞助需求:" prop="requirement">
                    <el-input
                        type="textarea"
                        :rows="7"
                        v-model="addForm.requirement" disabled>
                    </el-input>
                </el-form-item>
                <el-form-item label="状态:">
                    <el-input v-model="addForm.status" disabled></el-input>
                </el-form-item>
                <el-form-item label="申请赞助时间:" prop="time">
                    <el-date-picker type="date" v-model="addForm.time" style="width: 100%;" disabled></el-date-picker>
                </el-form-item>
            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeDialogVisible">确 定</el-button>
            </span>
        </el-dialog>

        <!--        添加赞助申请的对话框-->
        <el-dialog title="公告详情" ref="showFormRef" :visible.sync="addDialogVisible"
                   width="50%">
            <!--            展示内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
                <el-form-item label="赞助方:">
                    <el-input v-model="addForm.sponsor" placeholder="请输入赞助方..."></el-input>
                </el-form-item>
                <el-form-item label="赞助金额/￥:">
                    <el-input v-model="addForm.amount" placeholder="请输入赞助金额..."></el-input>
                </el-form-item>
                <el-form-item label="赞助需求:" prop="requirement">
                    <el-input
                        type="textarea"
                        :rows="7"
                        placeholder="请输入赞助需求..."
                        v-model="addForm.requirement">
                    </el-input>
                </el-form-item>
            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="addSponsorship">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    data()
    {
        let checkAmount = (rule, value, cb) =>
        {
            const regCost = /^\d{1,8}\.?\d{0,2}$/;
            if (regCost.test(value))
            {
                //合法密码
                return cb();
            }
            cb(new Error("赞助金额必须是数字,且小于一千万!"));

        };

        return {
            //获取公告列表参数对象
            query: '',
            //当前的页码
            pageNumber: 1,
            //每页显示的条数
            pageSize: 2,

            //查询到的当页公告
            SponsorshipList: [],
            //总条数,用于分页的显示
            totalCount: 0,
            //添加,修改,展示赞助对话框的显示与隐藏
            addDialogVisible: false,
            editDialogVisible: false,
            showDialogVisible: false,

            //添加赞助表单数据
            addForm: {
                sponsorshipId: "",
                sponsor:"",
                amount:"",
                requirement: "",
                time: "",
                status: false,
            },
            //添加赞助申请的校验规则
            addFormRules: {
                requirement: [
                    {required: true, message: '请输入赞助需求', trigger: 'blur'},
                    {min: 2, max: 2000, message: '赞助需求必须在2-2000字符之间', trigger: 'blur'}
                ],
                amount: [
                    {required: true, message: '请输入赞助金额', trigger: 'blur'},
                    {validator: checkAmount, trigger: "blur"}
                ],
            }
        }
    },
    //一开始就显示赞助列表
    created()
    {
        this.getSponsorshipList();
    },
    methods: {
        async getSponsorshipList()
        {
            let result = await this.$http.post(this.$api.PrincipalGetSponsorshipsUrl,
                {
                    query: this.query,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    status: true
                });
            this.SponsorshipList = result.data.data;
            for (let i = 0; i < this.SponsorshipList.length; i++)
            {
                this.SponsorshipList[i].time=this.SponsorshipList[i].time.substring(0,10)
            }
            this.totalCount = parseInt(result.data.totalCount);
        },
        //监听pageSize改变的事件
        handleSizeChange(newSize)
        {
            this.pageSize = newSize;
            this.getSponsorshipList();
        },
        //监听pageNum改变的事件
        handleCurrentChange(newPage)
        {
            this.pageNumber = newPage;
            this.getSponsorshipList();
        },

        //添加赞助申请
        showAddSponsorship()
        {

            this.addDialogVisible = true;
            //清空表单的校验项
            this.$nextTick(() =>
            {
                this.$refs.addFormRef.resetFields();
            });

            this.addForm.sponsorshipId = "";
            this.addForm.sponsor = "";
            this.addForm.amount = "";
            this.addForm.requirement = "";
            this.addForm.time = '';
        },

        //点击确定按钮后,添加申请赞助
        addSponsorship()
        {
            this.$refs.addFormRef.validate(
                async valid =>
                {
                    if (!valid) return;
                    this.addForm.sponsorshipId = 0;
                    let result = await this.$http.post(this.$api.PrincipalAddOneSponsorship,
                        {
                            sponsorshipId: 0,
                            sponsor: this.addForm.sponsor,
                            requirement: this.addForm.requirement,
                            amount:this.addForm.amount,
                            time: this.addForm.time,
                        });

                    //隐藏添加赞助申请对话框
                    this.addDialogVisible = false;
                    await this.getSponsorshipList();
                    this.$message.info("添加赞助申请成功!");
                }
            );
        },
        //添加赞助申请框里面的取消添加赞助申请按钮触发的事件
        cancelAdd()
        {
            //隐藏添加公告对话框
            this.addDialogVisible = false;
            this.$message.info("取消添加赞助申请!");
        },
        async showDialog(SponsorshipId)
        {
            let result = await this.$http.post(this.$api.PrincipalGetOneSponsorship + "/" + SponsorshipId);
            this.addForm = result.data;
            this.showDialogVisible = true;
        },
        //显示赞助详情页面按确定后的触发事件
        closeDialogVisible()
        {
            this.showDialogVisible = false;
        },
    }
}
</script>

<style scoped></style>

