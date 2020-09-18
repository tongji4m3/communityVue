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


        <el-row :gutter="0" class="el-row">
            <el-col :span="4">
                <el-card class="card0" :body-style="{ padding: '20px'}">
                    <div class="image" >
                        <img width="140" height="140" :src="imgUrl" style="border-radius:50%; ">
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-remove="handleRemove"
                            multiple
                            :limit="3"
                            style="margin: 20px; float: left"
                            :file-list="images"
                            :http-request="uploadHttp"
                            :before-upload="beforeAvatarUpload"
                        >
                            <el-button type="text" class="text">点击修改 LOGO</el-button>
                        </el-upload>
<!--                        <el-button type="text" @click="showEditClubInfo" style="margin: 20px;">点击修改社团信息</el-button>-->
                    </div>
                </el-card>
            </el-col>
            <el-col :span="20">
                <el-card class="card1" :body-style="{ padding: '10px'}">
                    <el-col :span="12">
                        <div style="margin: 20px;">{{addForm.name}}</div>
                        <div style="margin: 20px;">类型：{{addForm.type}}</div>
                        <div style="margin: 20px;">编号：{{addForm.clubId}}</div>
                        <div style="margin: 20px;">创始时间：{{addForm.establishmentDate}}</div>
                        <div style="margin: 20px;">现任会长：{{addForm.presidentName}}</div>
                    </el-col>
                    <el-col :span="12">
                        <div style="margin: 20px;">{{addForm.presidentName}}</div>
                        <div style="margin: 20px;">学号：{{addForm.number}}</div>
                        <div style="margin: 20px;">年级：{{addForm.grade}}</div>
                        <div style="margin: 20px;">联系方式：{{addForm.phone}}</div>
                        <div style="margin: 20px;">Email：{{addForm.mail}}</div>
                    </el-col>

                </el-card>
            </el-col>
        </el-row>

        <el-row class="el-row2">
            <el-col :span="24">
                <el-card>
                    <div v-html="addForm.description" style="margin: 20px;">{{addForm.description}}</div>
                    <el-divider></el-divider>
                    <div style="text-align:right;">
                        <el-popconfirm title="确定解散社团吗？" @onConfirm="deleteClub" cancelButtonType="danger" icon="el-icon-magic-stick"
                                       style="margin: 15px;">
                            <el-button slot="reference" type="danger">解散社团</el-button>
                        </el-popconfirm>
                        <!--                <el-button type="danger" @click="deleteClub">解散社团</el-button>-->

                        <el-button type="primary" @click="showEditClubInfo">修 改</el-button>
                    </div>
                </el-card>

            </el-col>
        </el-row>



        <!--        &lt;!&ndash;        卡片&ndash;&gt;-->
        <!--        <el-card class="box-card" :body-style="{ padding: '10px'}">-->
        <!--&lt;!&ndash;             <span> {{addForm.name}}的社团负责人您好！</span>&ndash;&gt;-->
        <!--            &lt;!&ndash; <br>-->
        <!--            <br> &ndash;&gt;-->
        <!--            <div v-html="addForm.logo">{{addForm.logo}}</div>-->
        <!--            <div v-html="addForm.description" style="margin: 20px;">{{addForm.description}}</div>-->
        <!--            &lt;!&ndash;            <span> {{addForm.description}}</span>&ndash;&gt;-->

        <!--        修改社团信息对话框-->
        <el-dialog title="修改社团信息" :visible.sync="editDialogVisible"
                   width="50%" center>
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
                <el-form-item label="社团名称:">
                    <el-input v-model="addForm.name" placeholder="请输入社团名称..." ></el-input>
                </el-form-item>

                <quill-editor v-model="addForm.description" ref="myQuillEditor" style="height: 500px;"
                              :options="editorOption">
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
                <quill-editor v-model="addForm.logo" ref="myQuillEditor" style="height: 500px;width: 82%;"
                              :options="editorOption">
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
    import ossClient from "../../assets/config/aliyun.oss.client";

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
                    // name: "",
                    // description: "",
                    // logo: "",
                    // status: false,
                    // establishmentDate:"",
                    // presidentName:"",
                    // type:"",

                },
                //添加赞助申请的校验规则
                addFormRules: {},
                content: null,
                editorOption: {},
                //上传图片相关
                images: [],
                uploadConf: {
                    region: null,
                    accessKeyId: null,
                    accessKeySecret: null,
                    bucket: null,
                },
                imgUrl: window.sessionStorage.getItem("imgUrl"),
            }
        },
        //一开始就显示赞助列表
        created()
        {
            this.getClubInfo();
        },
        methods: {
            /**
             * 初始化
             */
            init()
            {
                //获取阿里云token  这里是后台返回来的数据
                this.uploadConf.region = "oss-cn-shanghai";
                this.uploadConf.accessKeyId = "LTAI4G6fA6yN4LfpNVr8UsD2";
                this.uploadConf.accessKeySecret = "fiq7xeXtzdnt2jL0Zr58OpWd6mCcXd";
                this.uploadConf.bucket = "database-community";
            },
            /**
             * 阿里云OSS上传
             */
            async uploadHttp({file})
            {
                this.init();
                const {imgName} = "ALIOSS_IMG_";
                const fileName = `${imgName}/${Date.parse(new Date())}`; //定义唯一的文件名
                await ossClient(this.uploadConf)
                    .put(fileName, file, {
                        ContentType: "image/jpeg",
                    })
                    .then(({res, url, name}) =>
                    {
                        if (res && res.status === 200)
                        {
                            console.log(`阿里云OSS上传图片成功回调`, res, url, name);
                            this.imgUrl = url;
                            // {
                            //     // imgUrl: this.imgUrl,
                            //     imgUrl:"http://database-community.oss-cn-shanghai.aliyuncs.com/undefined/1600416216000"
                            // });
                        }
                    })
                    .catch((err) =>
                    {
                        console.log(`阿里云OSS上传图片失败回调`, err);
                    });
                console.log("这里", this.imgUrl);
                let result = await this.$http.post(this.$api.UpdateAvatar + "?imgUrl=" + this.imgUrl);
                window.sessionStorage.setItem("imgUrl", this.imgUrl);
                location.reload();
            },
        /**
         * 图片限制
         */
        beforeAvatarUpload(file)
        {
            const isJPEG = file.name.split(".")[1] === "jpeg";
            const isJPG = file.name.split(".")[1] === "jpg";
            const isPNG = file.name.split(".")[1] === "png";
            const isLt500K = file.size / 1024 / 1024 / 5 < 2;
            if (!isJPG && !isJPEG && !isPNG)
            {
                this.$message.error("上传图片只能是 JPEG/JPG/PNG 格式!");
            }
            if (!isLt500K)
            {
                this.$message.error("单张图片大小不能超过 5MB!");
            }
            return (isJPEG || isJPG || isPNG) && isLt500K;
        },
        /**
         * 移除图片
         */
        handleRemove(file, fileList)
        {
            console.log(`移除图片回调`, fileList);
        },
        async getClubInfo()
        {
            let result = await this.$http.post(this.$api.PrincipalGetClubInfo);
            this.addForm = result.data;
            this.addForm.establishmentDate=this.addForm.establishmentDate.substring(0,10);
            if(this.addForm.type===0){
                this.addForm.type="学术科技类";
            }
            else if(this.addForm.type===1){
                this.addForm.type="传统文化与文学类";
            }
            else if(this.addForm.type===2){
                this.addForm.type="公益实践类";
            }
            else if(this.addForm.type===3){
                this.addForm.type="文化艺术类";
            }
            else if(this.addForm.type===4){
                this.addForm.type="体育竞技类";
            }
            else{
                this.addForm.type="创新创业类";
            }
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
            await this.$router.push({path: "/welcome"});
        },
    }
    }

</script>
<style scoped>
    .box-card {
        height: 400px;
    }
    .card0 {
        /*min-width: 100%;*/
        height: 100%;
        margin-right: 20px;

        /*transition: all .5s;*/
    }

    .card1 {
        /*min-width: 100%;*/
        height: 100%;
        margin-right: 20px;
        width: 100%;
        /*transition: all .5s;*/
    }
    .el-row3 {
        /*margin-bottom: 20px;*/
        /*height: 100px;*/
        /*display: flex;*/
        flex-wrap: wrap
    }
    .el-row2 {
        /*margin-bottom: 20px;*/
        /*height: 100px;*/
        /*display: flex;*/
        flex-wrap: wrap
    }

    .el-row {
        margin-bottom: 20px;
        height: 240px;
        display: flex;
        flex-wrap: wrap;
    }
    .el-row {
        margin-bottom: 20px;
        /*height: 240px;*/
        display: flex;
        flex-wrap: wrap;
    }
    .image{
        width: 100%;
        /*height:100%;*/
        display: block;
        text-align:center;
    }
    .text{
        text-align:center;
    }
</style>
