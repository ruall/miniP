// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('article_list').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      image: event.image,
      name: event.name,
      time: event.time,
      title: event.title,
      comment:[]
    }
  })
}