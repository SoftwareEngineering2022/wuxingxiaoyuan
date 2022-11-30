const cloud = require('wx-server-sdk')

cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})


const db = cloud.database()
// const _ = db.command

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  console.log(context)
  // 获取基础信息
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    env: wxContext.ENV,
  }
}