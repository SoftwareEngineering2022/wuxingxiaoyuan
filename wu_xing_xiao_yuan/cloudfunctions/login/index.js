// 云函数入口文件
const cloud = require('wx-server-sdk')

//指定云函数环境
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})


// //获取openId云函数入口函数
// exports.main = async (event, context) => {
//   console.log(event)
//   console.log(context)
//   // 获取基础信息
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//     env: wxContext.ENV,
//   }
// }




   //event 前端传给后端的字段
exports.main = async (event) => {
    const { nickName, avatarUrl } = event
    const { OPENID } = cloud.getWXContext()
    //如果数据库中存在当前用户信息则直接返回当前用户信息（登陆），否则注册
    // 1、初始化集合
    const db = cloud.database()
    //2、指定集合
    const userInfo = db.collection("userInfo")
    //3、通过唯一值查询当前用户是否注册过
    //data定义为一个空数组，返回结果为数组
    //where查询条件
    const {data} = await userInfo.where({
      _openid:OPENID
    }).get()
    if(data.length === 0){
      //4、数据库中没有当前用户信息（注册），数据库新增数据
    const {_id } = await userInfo.add({
      data:{
        nickName,
        avatarUrl,
        credibility: 500,
        schoolId: "未填写",
        call: "未填写",
        role: "买家",
        _openid:OPENID
      }
         })
 //通过id快速查询数据，doc:接受_id快速返回该id的数据 
    const user = await userInfo.doc(_id).get()
   return {
     //return注册的数据
      data:user.data
      //保证后端返回的数据和前端格式一致
  }
}else{
  //如果注册过
  return{
    data:data[0]
    //返回登陆信息
   }  
}
}