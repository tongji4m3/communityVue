# Community
<a href="#"><img src="https://img.shields.io/badge/qq号-1254931237-red.svg" alt="qq号"></a>   <a href="http://139.9.134.43:5000/" alt="项目地址"><img src="https://img.shields.io/badge/项目部署地址-济社-blue.svg"></a>  

# 项目简介

## 项目概述

**社团管理系统**是用Vue框架开发的单页面应用项目。


## 项目选型

+ Vue.js
+ Vue-CLI
+ Vue Router 
+ Vuex
+ Element-UI
+ Axios


# 文件结构

```
├── document 相关文档文件
    ├── 0.项目要求
    ├── 1.需求分析
    ├── 2.项目设计
    ├── 3.前端文档
    ├── 4.最终文档
├── public 存储静态资源
    ├── favicon.ico
    └── index.html
├── src 项目实际代码
    ├── App.vue 单页面入口
    ├── assets
    │   ├── config 主要放置api.js,即与后端交互的API接口
    │   ├── css 全局样式表
    │   └── img 存储了项目用到的所有图片
    ├── components
    │   ├── adminHome 管理员页面相关组件
    │   ├── index 首页相关组件
    │   ├── principalHome 负责人页面相关组件
    │   └── studentHome 学生页面相关组件
    ├── main.js 导入全局的一些配置信息
    ├── router
    │   └── index.js 配置项目的路由
    ├── store
    │   └── index.js 本项目中没有使用
    └── views
        ├── AdminHome.vue 管理员页面
        ├── Index.vue 首页
        ├── PrincipalHome.vue 负责人页面
        └── StudentHome.vue 学生页面
├── .gitignore git提交忽略的文件
├── README.md 项目说明文档
├── babel.config.js 项目自定义配置文件
├── dockerfile 将项目自动化部署于云服务器上
├── package-lock.json 锁定安装时的包的版本号
├── package.json 本模块的描述文件
├── vue-cli-service 模块Vue CLI提供的快速开发命令 
└── vue.config.js 可选的配置文件

```



# 运行流程

## 本地运行流程

1. 在项目路径下,运行**npm run build**、**npm run serve**
2. 点击:[本地社团管理系统](http://localhost:8080/)
3. 注意:此次连接的是远程服务器。如果想连本地的后端，则修改**src\assets\config\api.js**文件夹下的**APIRootUrl**指向自己的服务器地址

## 云服务器运行流程

由于云服务器到期,只能手动在本地测试。

**后端接口地址也已经不可访问！！！**

