<template>
    <div>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/StudentWelcome' }">学生首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人信息管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <!--            搜索与添加-->

        <el-table :data="informationList">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="学号" prop="number"></el-table-column>
            <el-table-column label="年级" prop="grade"></el-table-column>
            <el-table-column label="专业" prop="major"></el-table-column>
            <el-table-column label="手机号" prop="phone"></el-table-column>
            <el-table-column label="邮箱" prop="mail"></el-table-column>
            <el-table-column label="签名" prop="signature"></el-table-column>
            <el-table-column label="生日" prop="birthday"></el-table-column>

        </el-table>

        <el-divider></el-divider>
        <el-row :gutter="20" style="margin-left: 1200px" >
            <el-button type="primary" icon="el-icon-edit" @click="exitCorporation()"></el-button>
        </el-row>


    <!--        修改信息对话框-->
    <el-dialog title="修改信息" :visible.sync="addDialogVisible"
               width="50%">
        <!--            内容主体区域 放置一个表单-->
        <el-form :model="addForm"  ref="addFormRef" label-width="150px">
            <el-form-item label="手机号:" prop="studentID">
                <el-input v-model="addForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="签名:" prop="corporationId">
                <el-input v-model="addForm.signature"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="corporationName">
                <el-input v-model="addForm.mail"></el-input>
            </el-form-item>
            <el-form-item label="生日:" prop="reason">
                <el-input v-model="addForm.birthday"></el-input>
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
                informationList: [],
                //总页码数,用于分页的显示
                totalCount: 0,
                //添加,修改,展示活动对话框的显示与隐藏
                addDialogVisible: false,
                editDialogVisible: false,
                showDialogVisible: false,
                //添加活动表单数据
                addForm: {
                    phone:"",
                    signature:"",
                    mail:"",
                    birthday: "",
                },
                //添加活动的校验规则
                addFormRules: {
                    studentID: [
                        {required: true, message: '请输入修改后的手机号', trigger: 'blur'},
                    ],
                    corporationName: [
                        {required: true, message: '请输入社团名称', trigger: 'blur'}
                    ],
                    corporationId: [
                        {required: true, message: '请输入社团编号', trigger: 'blur'}
                    ],
                    reason: [
                        {required: true, message: '请输入退社理由', trigger: 'blur'},
                    ],
                }
            }
        },
        //一开始就显示活动列表
        created()
        {
            //this.getCorporationsList();
            this.getCorporationList();
        },
        //获取学生信息
        methods: {
            async getCorporationList()
            {
                let result = await this.$http.post(this.$api.StudentGetInformation,
                    {
                    });
                this.informationList = result.data;
                console.log(this.informationList);
                this.totalCount = parseInt(result.data.totalCount);
                console.log(this.totalCount);
            },

            //监听pageSize改变的事件
            handleSizeChange(newSize)
            {
                this.pageSize = newSize;
                this.getCorporationList();
            },
            //监听pageNum改变的事件
            handleCurrentChange(newPage)
            {
                this.pageNumber = newPage;
                this.getCorporationList();
            },



            //抽取出来,当弹出的页面结束后,会清空内容
            // 因为公有addForm所以必须有这个操作,且点击后都是重新axios请求新信息,所以没有问题
            clearAddForm()
            {
                //清空数据
                this.addForm.phone='';
                this.addForm.signature='';
                this.addForm.mail='';
                this.addForm.birthday='';
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
                this.$message.info("取消修改信息!");
            },

            async showDialog(id)
            {
                let result = await this.$http.post(this.$api.StudentCorporationInformationUrl+'/'+id);
                status = result.data.status;
                if (!status || status !== "200")
                {
                    this.$message.info(result.data.msg);
                } else
                {
                    this.addForm = result.data.data;
                    this.showDialogVisible = true;
                }
            },

            //修改活动页面弹出后,会查询要修改的id所对应活动的内容
            async showEditDialog(activityId)
            {
                let result = await this.$http.post(this.$api.PrincipalGetOneActivityUrl + "/" + activityId);
                this.addForm = result.data;
                this.editDialogVisible = true;
            },

            //提交申请
            exitCorporation()
            {

                this.addDialogVisible = true;
                //清空表单的校验项
                this.$nextTick(() =>
                {
                    this.$refs.addFormRef.resetFields();
                });
                this.addForm.phone=this.informationList[0].phone;
                this.addForm.signature=this.informationList[0].signature;
                this.addForm.mail=this.informationList[0].mail;
                // this.addForm.birthday=this.informationList[0].birthday;
                this.addForm.birthday="";
            },

            closeDialogVisible()
            {
                this.clearAddForm();
                this.showDialogVisible = false;
            },
            cancelEdit()
            {
                this.editDialogVisible = false;
                this.clearAddForm();
                this.$message.info("取消提交申请!");
            },

            //提交申请
            addApply()
            {
                this.$refs.addFormRef.validate(
                    async valid =>
                    {
                        if (!valid) return;

                        var phone=this.addForm.phone;
                        var signature=this.addForm.signature;
                        var mail=this.addForm.mail;
                        var birthday=this.addForm.birthday;
                        let result = await this.$http.post(this.$api.StudentChangeInformation,
                            {
                                phone,
                                signature,
                                mail,
                                birthday,
                            });

                        //隐藏添加活动对话框
                        this.addDialogVisible = false;
                        console.log(result);

                        this.$message.info("提交申请成功!");

                    }
                );
            },


            //详情页面弹出后,会查询该社团的简介内容并显示
            async showCorporationSummary(id)
            {
                let result = await this.$http.post(this.$api.StudentCorporationInformationUrl+'/'+id);
                status = result.data.status;
                console.log(status)
                if (!status || status !== "200")
                {
                    this.$message.info(result.data.msg);
                } else
                {
                    this.addForm = result.data.data;
                    this.editDialogVisible = true;
                }
            },
            async editActivity()
            {
                let result = await this.$http.post(this.$api.PrincipalUpdateOneActivityUrl, this.addForm);
                status = result.data.status;
                if (!status || status !== "200")
                {
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
        }
    }
</script>

<style scoped>
</style>

