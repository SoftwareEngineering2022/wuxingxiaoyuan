// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database();
const _ =db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  var id=event.id;
  console.log(id)
  return await db.collection("demolmj").doc(id).update({
    data:{
      hits:_.inc(12)
    }
  })
   
}