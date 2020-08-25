// 根路径 请求网址

/*
负责人界面
 */
const APIRootUrl = 'http://139.9.134.43:5000/communitySystem/';
/*
学生界面
 */
const APIRootUrl_stu = 'https://139.9.134.43:44383/communitySystem/';

// =======
// // const APIRootUrl = 'http://139.9.134.43:5000/communitySystem/';
// const APIRootUrl = 'http://139.9.134.43:5000';
// >>>>>>> aa166d9a31de315e6a1b1c8ec87272df57e5dbd1

// const APIRootUrl = 'http://47.103.203.188:8888/communitySystem/';
//const APIRootUrl = 'http://localhost:8888/communitySystem/';

module.exports = {
    /*
    Index视图
     */
    //请求参数:number,username,password
    // 响应参数:status(200成功,400参数错误),msg(注册不成功原因,成功则可以无msg)
    RegisterUrl: APIRootUrl + 'user/register',//注册数据接口

    //请求参数:username,password
    // 响应参数:status,msg(错误时),token(认证相关),username,userType
    LoginUrl: APIRootUrl + 'user/login',//登录数据接口

    //请求参数:无
    //响应参数:name
    getStudentNameUrl: APIRootUrl + 'student/getStudentName',//获取用户名

    //请求参数:无
    //响应参数:name
    getClubNameUrl: APIRootUrl + 'principal/getClubName',//获取社团名称

    //请求参数:prePassword
    //响应参数:newPassword
    ChangePasswordUrl: APIRootUrl + 'user/changePassword',//修改用户密码


    GetAnnouncementsUrl: APIRootUrl + 'user/getAnnouncements',//获得系统公告

    GetOneAnnouncementUrl: APIRootUrl + 'user/getOneAnnouncement',//获得系统公告


    GetMessagesUrl: APIRootUrl + 'user/getMessages',//获得系统消息

    GetOneMessagesUrl: APIRootUrl + 'user/getOneMessage',//获得系统消息

    SetMessageReadUrl: APIRootUrl + 'user/setMessageRead',//系统消息已读

    /*
    PrincipalHome视图
    PrincipalActivity组件
    负责人活动管理数据接口
     */
    //请求参数:query(查询参数 做条件查询时才有,例如"上海",则是要查找活动名称中包含上海的),
    // pageNumber(当前的页码),pageSize(每页显示条数)
    //响应参数:activities
    // (活动列表,每个活动内部:{activityId,name,description,cost,fund,place,time,applyDate,status,suggestion,isPublic}
    // （活动编号，活动名称，活动介绍,开销,经费,位置,活动时间，活动申请时间,审核状态,审核相关信息,是否公开)
    // ,totalCount(总条数),status,msg(错误时)
    PrincipalGetActivitiesUrl: APIRootUrl + 'principal/getActivities',

    // 请求参数:activity+is_public
    // 响应参数:status,msg(错误时)
    PrincipalAddOneActivityUrl: APIRootUrl + 'principal/addOneActivity',

    //查询特定id的活动
    // 请求参数:id(活动编号)
    // 响应参数:activities(活动),status,msg(错误时)
    PrincipalGetOneActivityUrl: APIRootUrl + 'principal/getOneActivity',

    //修改特定id活动
    // 请求参数:activity(没有修改的属性还在里面)
    // 响应参数:status,msg(错误时)
    PrincipalUpdateOneActivityUrl: APIRootUrl + 'principal/updateOneActivity',

    //删除特定id活动
    // 请求参数:id(活动编号)
    // 响应参数:status,msg(错误时)
    PrincipalDeleteOneActivityUrl: APIRootUrl + 'principal/deleteOneActivity',


    /*
    PrincipalNotice组件
    负责人公告管理数据接口
     */
    //请求参数:query(查询参数 做条件查询时才有),
    // pageNumber(当前的页码),pageSize(每页显示条数)
    //响应参数:announcements
    PrincipalGetAnnouncementsUrl: APIRootUrl + 'principal/getAnnouncements',

    PrincipalGetOneAnnouncement: APIRootUrl + 'principal/getOneAnnouncement',

    PrincipalAddOneAnnouncement: APIRootUrl + 'principal/addOneAnnouncement',

    PrincipalUpdateOneAnnouncement: APIRootUrl + 'principal/updateOneAnnouncement',

    PrincipalDeleteOneAnnouncement: APIRootUrl + 'principal/deleteOneAnnouncement',


    /*
    PrincipalMember组件
    负责人成员管理数据接口
     */
    //请求参数:query(查询参数 做条件查询时才有),
    // pageNumber(当前的页码),pageSize(每页显示条数)
    //响应参数:members
    //studentId,number,name,grade,major,phone
    PrincipalGetClubMembers: APIRootUrl + 'principal/getClubMembers',

    PrincipalDeleteClubMember: APIRootUrl + 'principal/deleteClubMember',


    /*
    PrincipalChange组件
    负责人换届数据接口
     */
    PrincipalGetNextMembers: APIRootUrl + 'principal/getCandidates',

    PrincipalChangeManager: APIRootUrl + 'principal/changeManager',

    PrincipalGetManagersUrl: APIRootUrl + 'principal/getManagers',//历史负责人

    /*
    PrincipalSponsorship组件
    负责人赞助申请数据接口
     */
    //请求参数:query(查询参数 做条件查询时才有),
    // pageNumber(当前的页码),pageSize(每页显示条数)
    //响应参数:sponsorships

    PrincipalGetSponsorshipsUrl:APIRootUrl+'principal/getClubHadSponsorship',

    PrincipalAddOneSponsorship:APIRootUrl+'principal/addOneSponsorship',

    PrincipalGetOneSponsorship:APIRootUrl+'principal/getOneHadSponsorship',

    /*
    PrincipalCheckJoin组件
    负责人入社人员审核数据接口
     */
    //请求参数:query(查询参数 做条件查询时才有),
    // pageNumber(当前的页码),pageSize(每页显示条数)
    //响应参数:joinClub
    PrincipalGetJoinUrl:APIRootUrl+'principal/getJoin',

    PrincipalGetOneJoinUrl:APIRootUrl+'principal/getOneJoin',

    PrincipalJoinResultUrl:APIRootUrl+'principal/joinResult',
    //
    // PrincipalRejectJoinUrl:APIRootUrl+'principal/rejectJoin',

    /*
    PrincipalClubInfo组件
    负责人社团信息修改数据接口
     */
    PrincipalGetClubInfo:APIRootUrl+'principal/getClubInfo',

    PrincipalEditClubInfo:APIRootUrl+'principal/editClubInfo',





    /*
    studentHome视图
    StudentCorporations组件
    学生界面社团信息数据接口
    */

    //已加入社团信息获取
    //请求参数:query(查询参数 做条件查询时才有,例如"上海",则是要查找活动名称中包含上海的),
    // pageNumber(当前的页码),pageSize(每页显示条数)
    //响应参数:Corporations
    // (社团列表,每个社团内部:{}
    // （社团名称，成立时间，社团性质,社团人数,社团简介,操作)
    // ,totalCount(总条数),status,msg(错误时)
    StudentGetJoinedCorporationsUrl: APIRootUrl + 'Student/inClub',
    //社团简介
    //请求参数:社团id,
    // pageNumber(当前的页码),pageSize(每页显示条数)
    //响应参数:社团简介
    StudentCorporationInformationUrl: APIRootUrl + 'Student/getClubDescription',

    //获取所有社团信息
    //请求参数:query(查询参数 做条件查询时才有,例如"上海",则是要查找活动名称中包含上海的),
    // pageNumber(当前的页码),pageSize(每页显示条数)
    // (社团列表,每个社团内部:{}
    // （社团名称，成立时间，社团性质,社团人数,社团简介,操作)
    // ,totalCount(总条数),status,msg(错误时)
    StudentCorporationsUrl: APIRootUrl + 'Student/getClubInfo',


    //获取学生信息
    //
    StudentGetNameUrl: APIRootUrl + 'Student/getStudentName',

};
