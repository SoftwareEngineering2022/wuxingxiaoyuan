// 云函数入口文件
const cloud = require('../addDnahit/node_modules/wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  var page=event.page;
  var num=event.num;
  return await db.collection("demolmj").skip(page).limit(num).get()
  
}