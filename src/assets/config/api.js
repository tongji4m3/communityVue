// 根路径 请求网址
const APIRootUrl = 'http://47.103.203.188:8888/communitySystem/';

module.exports={
    /*
    Index视图
     */
    //提交id,username,password  返回状态码status(200成功,400参数错误),msg为注册不成功原因,成功则可以无msg
    RegisterUrl:APIRootUrl+'user/register',//注册数据接口

    //请求用户名,密码
    // 返回status,msg(错误时),token,username,userType
    LoginUrl:APIRootUrl+'user/login',//登录数据接口


    /*
    Principal组件
     */
    //请求参数:username当前负责人名字,query 查询参数,pageNum 当前的页码,pageSize 每页显示条数
    //返回参数:activities活动,total总页码,status
    PrincipalGetActivityUrl:APIRootUrl+'principal/getActivities',//负责人活动管理数据接口

    // 请求参数:id,name,description,cost,money
    // 响应参数:status,msg(错误的话)
    PrincipalAddActivityUrl:APIRootUrl+'principal/addActivity',//负责人活动管理数据接口

    //查询特定活动.请求参数:活动编号,返回参数:activities活动,status,msg(错误的话)
    PrincipalGetOneActivityUrl:APIRootUrl+'principal/getOneActivity',//负责人活动管理数据接口

    //修改特定活动.请求参数:活动ID,description,cost,money,返回参数:status,msg(错误的话)
    PrincipalUpdateOneActivityUrl:APIRootUrl+'principal/updateOneActivity',//负责人活动管理数据接口

    //删除特定活动.请求参数:活动ID,返回参数:status,msg(错误的话)
    PrincipalDeleteActivityUrl:APIRootUrl+'principal/deleteActivity',//负责人活动管理数据接口
};
