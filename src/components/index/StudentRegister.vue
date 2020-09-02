<!--有前端验证注册信息是否合理-->
<template>
    <body id="poster">
    <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules"
             class="login-container" label-position="left"
             label-width="0px">
        <h3 class="login_title">注册</h3>
        <el-form-item prop="number">
            <el-input v-model="registerForm.number" placeholder="学号"></el-input>
        </el-form-item>
        <el-form-item prop="username">
            <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="registerForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
            <el-input type="password" v-model="registerForm.confirmPassword" placeholder="确认密码"></el-input>
        </el-form-item>

        <el-upload
                class="upload"
                action=""
                :drag="true"
                :multiple="true"
                :file-list="images"
                :http-request="uploadHttp"
                :before-upload="beforeAvatarUpload"
                :on-remove="handleRemove"
        >
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <p id="img-context">上传个人头像</p>
            <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png文件，且不超过5MB</div>
        </el-upload>
        <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="register">注册
            </el-button>
        </el-form-item>
    </el-form>
    </body>
</template>

<script>
    import ossClient from '../../assets/config/aliyun.oss.client';

    export default {
        name: 'Upload',
        data()
        {
            let checkPassword = (rule, value, cb) =>
            {
                const regPassword = /^\w{6,50}$/;
                if (regPassword.test(value))
                {
                    //合法密码
                    return cb();
                }
                cb(new Error("密码必须在6-15个字符之间,只能由大小写字母数字下划线组成"));

            };
            let checkConfirmPassword = (rule, value, cb) =>
            {
                const regPassword = this.registerForm.password;
                if (regPassword === value)
                {
                    //合法密码
                    return cb();
                }
                cb(new Error("前后两次输入的密码必须一致!"));

            };
            let checkNumber = (rule, value, cb) =>
            {
                const regNumber = /^\d{7}$/;
                if (regNumber.test(value))
                {
                    //合法密码
                    return cb();
                }
                cb(new Error("学号必须是7位数字!"));

            };

            return {
                //上传图片相关
                images: [],
                uploadConf: {
                    region: null,
                    accessKeyId: null,
                    accessKeySecret: null,
                    bucket: null,
                },
                //登录表单数据绑定
                registerForm: {
                    number: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    imgUrl: 'https://tongji4m3.oss-cn-beijing.aliyuncs.com/OIP.jpg'
                },
                //表单的验证规则
                registerFormRules: {
                    //    验证用户名是否合法
                    number: [
                        {required: true, message: "请输入学号", trigger: "blur"},
                        {validator: checkNumber, trigger: "blur"}
                    ],
                    //    验证用户名是否合法
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"},
                        {min: 3, max: 10, message: "用户名必须在3-10个字符之间", trigger: "blur"}
                    ],
                    //    验证密码是否合法
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {validator: checkPassword, trigger: "blur"}
                    ],
                    confirmPassword: [
                        {required: true, message: "请再次确认密码", trigger: "blur"},
                        {validator: checkConfirmPassword, trigger: "blur"}
                    ],

                }
            }
        },
        //回车注册操作
        created()
        {
            //创建后挂载
            let _this = this;

            document.onkeydown = function (e)
            {

                let key = window.event.keyCode;

                if (key === 13)
                {
                    _this.register();//注册
                }
            }

        },
        methods: {
            /**
             * 初始化
             */
            async init()
            {
                //获取阿里云token  这里是后台返回来的数据
                this.uploadConf.region = 'oss-cn-shanghai';
                this.uploadConf.accessKeyId = 'LTAI4G6fA6yN4LfpNVr8UsD2';
                this.uploadConf.accessKeySecret = 'fiq7xeXtzdnt2jL0Zr58OpWd6mCcXd';
                this.uploadConf.bucket = 'database-community';
            },

            /**
             * 阿里云OSS上传
             */
            uploadHttp({file})
            {
                this.init();
                const {imgName} = 'ALIOSS_IMG_';
                const fileName = `${imgName}/${Date.parse(new Date())}`;  //定义唯一的文件名
                ossClient(this.uploadConf).put(fileName, file, {
                    'ContentType': 'image/jpeg'
                }).then(({res, url, name}) =>
                {
                    if (res && res.status === 200)
                    {
                        console.log(`阿里云OSS上传图片成功回调`, res, url, name);
                        console.log(url);
                        this.registerForm.imgUrl = url;
                    }
                }).catch((err) =>
                {
                    console.log(`阿里云OSS上传图片失败回调`, err);
                });
            },

            /**
             * 图片限制
             */
            beforeAvatarUpload(file)
            {
                const isJPEG = file.name.split('.')[1] === 'jpeg';
                const isJPG = file.name.split('.')[1] === 'jpg';
                const isPNG = file.name.split('.')[1] === 'png';
                const isLt500K = file.size / 1024 / 1024 / 5 < 2;
                if (!isJPG && !isJPEG && !isPNG)
                {
                    this.$message.error('上传图片只能是 JPEG/JPG/PNG 格式!');
                }
                if (!isLt500K)
                {
                    this.$message.error('单张图片大小不能超过 5MB!');
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


            //异步操作
            //根据status判断是否注册成功,成功跳转页面,失败显示msg在合适的地方
            register()
            {
                this.$refs.registerFormRef.validate(async valid =>
                {
                    if (!valid) return;

                    let msg = "";
                    let status = 200;

                    let result = await this.$http.post(this.$api.RegisterUrl,
                        {
                            number: this.registerForm.number,
                            username: this.registerForm.username,
                            password: this.$md5(this.registerForm.password),
                            imgUrl: this.registerForm.imgUrl

                        }).catch(function (error)
                    {
                        if (error.response)
                        {
                            status = error.response.status;
                            msg = error.response.data.msg;
                        }
                    });

                    if (status === 400)
                    {
                        this.$message.info(msg);
                    } else
                    {
                        this.$router.push({path: '/studentLogin'}, onComplete =>
                        {
                        }, onAbort =>
                        {
                        })
                    }
                })
            }
        }
    }
</script>
<style scoped>
    #poster {
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }

    body {
        margin: 0px;
        padding: 0;
    }

    .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 20px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .login_title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .upload {

    }

    #img-context {
        text-align: center;
        font-size: 17px;
        color: #B0B0B0;
        margin-top: 50px;
    }

    .el-upload__tip {
        text-align: center;
        font-family: 楷体;
        font-size: 15px;
    }
</style>
