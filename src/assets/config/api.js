// 根路径 请求网址
const APIRootUrl = 'http://47.103.203.188:8888/communitySystem/';

module.exports = {
    /*
    Index视图
     */
    //请求参数:id,username,password
    // 响应参数:status(200成功,400参数错误),msg(注册不成功原因,成功则可以无msg)
    RegisterUrl: APIRootUrl + 'user/register',//注册数据接口

    //请求参数:username,password
    // 响应参数:status,msg(错误时),token(认证相关),username,userType
    LoginUrl: APIRootUrl + 'user/login',//登录数据接口


    /*
    PrincipalHome视图
    PrincipalActivity组件
    负责人活动管理数据接口
     */
    //请求参数:username(当前负责人名字),query(查询参数 做条件查询时才有,例如"上海",则是要查找活动名称中包含上海的),
    // pageNum(当前的页码),pageSize(每页显示条数)
    //响应参数:activities(活动列表,每个活动内部:{id,name,description,cost,money,time,number,status}
    // （活动编号，活动名称，活动描述,开销,经费,活动申请时间，活动人数，活动状态)
    // ,total(总页码),status,msg(错误时)
    PrincipalGetActivityUrl: APIRootUrl + 'principal/getActivities',

    // 请求参数:id,name,description,cost,money
    // 响应参数:status,msg(错误时)
    PrincipalAddActivityUrl: APIRootUrl + 'principal/addActivity',

    //查询特定id的活动
    // 请求参数:id(活动编号)
    // 响应参数:activities(活动),status,msg(错误时)
    PrincipalGetOneActivityUrl: APIRootUrl + 'principal/getOneActivity',

    //修改特定id活动
    // 请求参数:id(活动编号),description,cost,money(代表只能修改这三个属性)
    // 响应参数:status,msg(错误时)
    PrincipalUpdateOneActivityUrl: APIRootUrl + 'principal/updateOneActivity',

    //删除特定id活动
    // 请求参数:id(活动编号)
    // 响应参数:status,msg(错误时)
    PrincipalDeleteActivityUrl: APIRootUrl + 'principal/deleteActivity',
};
