const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    return await db.collection('article_list').doc(event.id).update({
      data: {
        comment: _.push(event.comment)
      }
    })
  } catch (e) {
    console.error(e)
  }
}