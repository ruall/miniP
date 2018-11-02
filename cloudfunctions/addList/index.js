// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('mini').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      description: event.description,
      due: event.due,
      tags: event.tags,
      progress: event.progress,
      done: event.done
    }
  })
}