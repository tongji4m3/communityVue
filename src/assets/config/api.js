// 根路径 请求网址

/*
负责人界面
 */
const APIRootUrl = 'http://47.117.4.125:5000/communitySystem/';


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

    PrincipalGetCommunityGraph: APIRootUrl + 'principal/getCommunityGraph',//修改图表

    UpdateAvatar:APIRootUrl+"user/updateAvatar",//修改用户logo


    //请求参数:无
    //响应参数:name
    getStudentNameUrl: APIRootUrl + 'student/getStudentName',//获取用户名

    //请求参数:无
    //响应参数:name
    getClubNameUrl: APIRootUrl + 'principal/getClubName',//获取社团名称

    //请求参数:prePassword
    //响应参数:newPassword
    ChangePasswordUrl: APIRootUrl + 'user/changePassword',//修改用户密码


    GetAnnouncementsUrl: APIRootUrl + 'user/getSysAnnouncements',//获得系统公告

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

    PrincipalJoinResult:APIRootUrl+'principal/joinResult',

    PrincipalRejectSendMessage:APIRootUrl+'principal/sendMessage',
    //
    // PrincipalRejectJoinUrl:APIRootUrl+'principal/rejectJoin',

    /*
    PrincipalClubInfo组件
    负责人社团信息修改数据接口
     */
    PrincipalGetClubInfo:APIRootUrl+'principal/getClubInfo',

    PrincipalGetClubName:APIRootUrl+'principal/getClubName',

    PrincipalEditClubInfo:APIRootUrl+'principal/editClubInfo',

    PrincipalDissolveClub:APIRootUrl+'principal/dissolveClub',


    /*
        PrincipalCheckActivity组件
        负责人参加活动人员审核数据接口
    */
    //请求参数:query(查询参数 做条件查询时才有),
    // pageNumber(当前的页码),pageSize(每页显示条数)
    //响应参数:participateActivity
    PrincipalGetActivityMembersUrl:APIRootUrl+'principal/getAllActivityMembers',

    PrincipalGetOneActivityMemberUrl:APIRootUrl+'principal/getOneActivityMember',

    PrincipalParticipateResultUrl:APIRootUrl+'principal/participateResult',



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

    //获取学生姓名
    //
    StudentGetNameUrl: APIRootUrl + 'Student/getStudentName',

    //获取社团内部参加活动信息
    StudentInActivitesInformationUrl:APIRootUrl+'Student/getInActivityInfo',

    //获取社团外部参加获得信息
    StudentOutActivitesInformationUrl:APIRootUrl+'Student/getOutActivityInfo',

    //获取学生信息
    StudentGetInformation:APIRootUrl+'Student/getStudentInfo',

    //修改学生信息
    StudentChangeInformation:APIRootUrl+'Student/changeStudentInfo',

    //加入社团
    StudentJoinClub:APIRootUrl+'Student/joinClub',

    //退出社团
    StudentExitClub:APIRootUrl+'Student/quitOneClub',

    //退出社团接收的信息
    StudentSendMessage:APIRootUrl+'Student/sendMessage',

    //加入活动
    StudentJoinActivity:APIRootUrl+'Student/joinActivity',

    //显示已加入活动
    StudentInActivity:APIRootUrl+'Student/InActivity',

    //学生端的社团公告
    StudentInClubAnnouncements:APIRootUrl+'Student/inClubAnnouncements',

    //学生端的系统消息

    //学生端加入社团判断
    StudentJudgeJoinClubUrl:APIRootUrl+'Student/judgeClubJoin',

    //学生端加入社团判断
    StudentJudgeJoinActivityUrl:APIRootUrl+'Student/judgeActivityJoin',

    /*
    AdminNotice组件
    负责人公告管理数据接口
     */
    //请求参数:query(查询参数 做条件查询时才有),
    // pageNumber(当前的页码),pageSize(每页显示条数)
    //响应参数:announcements
    AdminGetAnnouncementsUrl: APIRootUrl + 'admin/getAnnouncements',

    AdminGetOneAnnouncement: APIRootUrl + 'admin/getOneAnnouncement',

    AdminAddOneAnnouncement: APIRootUrl + 'admin/addOneAnnouncement',

    AdminUpdateOneAnnouncement: APIRootUrl + 'admin/updateOneAnnouncement',

    AdminDeleteOneAnnouncement: APIRootUrl + 'admin/deleteOneAnnouncement',

    /*
    adminHome视图
    AdminCheckSponsor组件
    管理员审核赞助接口
    */

    //赞助列表的获取
    //请求参数：Status(查询参数:unaudited, failed, pass, all),
    //  PageQO:Query(模糊查询字符串)，PageNumber(页号), PageSize(页大小)
    //响应参数：pageIndex(页码), totalPages(总页数), totolCount(总条数)
    //  data:sponorshipId(赞助id), clubName(社团名称), applyDate(提交时间)
    //      sponsor(赞助商), amount(金额), adminName(审核者名字), status(审核状态)
    AdminGetSponsorListUrl:APIRootUrl+'admin/getsponsorships',

    //赞助详情信息获取
    //请求参数：sponsorshipId(赞助ID)
    //响应参数：sponorshipId(赞助id), clubName(社团名称), applyDate(提交时间),
    //      sponsor(赞助商), amount(金额), adminName(审核者名字), status(审核状态)，
    //      suggestion(建议)， requirement(需求)
    AdminGetSponsorshipDetailsUrl:APIRootUrl+'admin/getsponsorshipdetails',

    //赞助建议信息更新
    //请求参数：sponsorshipId(赞助ID), suggestion(建议)
    //响应参数：
    AdminUpdateSponSuggestionUrl:APIRootUrl+'admin/updatesponsuggestion',

    //赞助审核状态更新
    //请求参数：sponsorshipId(赞助ID), status(审核状态)
    //响应参数：
    AdminUpdateSponStatusUrl:APIRootUrl+'admin/updatesponstatus',

    /*
    AdminCheckActivity组件
    管理员审核活动接口
    */

    //活动列表的获取
    //请求参数：Status(查询参数:unaudited, failed, pass, all),
    //  PageQO:Query(模糊查询字符串)，PageNumber(页号), PageSize(页大小)
    //响应参数：pageIndex(页码), totalPages(总页数), totolCount(总条数)
    //  data:activityId(活动id), clubName(社团名称), name(活动名称),
    //      budget(经费), place(活动地点), eventTime(活动时间), status(审核状态)
    AdminGetActivityListUrl:APIRootUrl+'admin/getactivities',

    //活动详情信息获取
    //请求参数：activityId(活动ID)
    //响应参数：activityId(活动id), clubName(社团名称), name(活动名称),
    //      budget(经费)，place(活动地点), eventTime(活动时间),
    //      status(审核状态)，applyDate(申请时间)，description(活动描述)，
    //      isPublic(是否公开)，adminName(管理员姓名)，suggestion(建议)，
    AdminGetActivityDetailsUrl:APIRootUrl+'admin/getactivitydetails',

    //活动建议信息更新
    //请求参数：activityId(活动ID), suggestion(建议)
    //响应参数：
    AdminUpdateActSuggestionUrl:APIRootUrl+'admin/updateactsuggestion',

    //活动审核状态更新
    //请求参数：activitytId(活动ID), status(审核状态)
    //响应参数：
    AdminUpdateActStatusUrl:APIRootUrl+'admin/updateactstatus',


    /*
    AdminInformation组件
    管理员审核社团接口
    */
    //获取社团列表
    //请求参数：Status(查询参数:unaudited, dissolved, pass, all),
    //  PageQO:Query(模糊查询字符串)，PageNumber(页号), PageSize(页大小)
    //响应参数：pageIndex(页码), totalPages(总页数), totolCount(总条数)
    //  data:clubId(社团ID), name(社团名称), presidentName(负责人姓名),
    //      type(社团类型)，establishmentDate(成立时间), managerId(负责人账号ID),
    //      status(社团状态)
    AdminGetClubListUrl:APIRootUrl+'admin/getclubs',

    //社团详情信息获取
    //请求参数：clubId(社团ID), managerId(负责人账号ID)
    //响应参数：clubId(社团id), Name(社团名称), status(社团状态)
    //      type(社团类型), description(社团描述), establishmentDate(成立时间),
    //      presidentName(负责人姓名), managerId(负责人ID), phone(手机号),
    //      mail(邮箱), number(学号), grade(年级)，major(专业）
    AdminGetClubDetailsUrl:APIRootUrl+'admin/getclubdetails',

    //消息发送
    //请求参数：userId(用户ID), content(消息内容), title(标题)
    //响应参数：
    AdminSendMessageUrl:APIRootUrl+'admin/sendmessage',

    //社团审核状态更新
    //请求参数：clubId(社团ID), status(社团状态)
    //响应参数：
    AdminUpdateClubStatusUrl:APIRootUrl+'admin/updateclubstatus',


    /*
    AdminStudent组件
    管理员学生管理接口
    */

    //获取学生列表
    //请求参数：Status(查询参数:graduated, atSchool, all),
    //  PageQO:Query(模糊查询字符串)，PageNumber(页号), PageSize(页大小)
    //响应参数：pageIndex(页码), totalPages(总页数), totolCount(总条数)
    //  data:number(学号), name(姓名), major(专业),
    //      grade(年级), status(状态)
    AdminGetStudentMetaListUrl:APIRootUrl+'admin/getstudentmetas',

    //更新学生信息
    //请求参数：number(学号), name(姓名), major(专业),
    //      grade(年级), status(状态)
    //响应参数：isSuccess(是否成功)
    AdminUpdateStudentMetaUrl:APIRootUrl+'admin/updatestudentmeta',

    //更新学生毕业状态
    //请求参数：number(学号)
    //响应参数：isSuccess(是否成功)
    AdminUpdateGraduateUrl:APIRootUrl+'admin/updategraduate',

    //删除学生信息
    //请求参数：number(学号)
    //响应参数：isSuccess(是否成功)
    AdminDeleteStudentMetaUrl:APIRootUrl+'admin/deletestudentmeta',

    //新增学生信息
    //请求参数：number(学号), name(姓名), major(专业),
    //      grade(年级), status(状态)
    //响应参数：isSuccess(是否成功)
    AdminInsertStudentMetaUrl:APIRootUrl+'admin/insertstudentmeta',

    //获取待办事项
    //请求参数：
    //响应参数：club(社团), sponsorship(赞助), activity(活动)
    AdminGetTodoUrl:APIRootUrl+'admin/gettodo',
};
