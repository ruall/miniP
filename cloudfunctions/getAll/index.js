// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
// 云函数入口函数
//查询数据库所有信息
exports.main = async (event, context) => {
  return db.collection('article_list').get()
}