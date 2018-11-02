let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  addSql(){
    const db = wx.cloud.database();
    db.collection('mini').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        description: "learn cloud database   222",
        due: new Date("2018-09-01"),
        tags: [
          "cloud",
          "database"
        ],
        done: false
      }
    })
      .then(res => {
        console.log(res)
      })
  },
  getSql(){
    const db = wx.cloud.database();
    db.collection('mini').get().then(res=>{
      console.log(res.data);
    });
  },
  getSqlByd(){
    const db = wx.cloud.database();
    db.collection('mini').where({
      done:true,
      due: new Date("2018-09-01"),
    }).get().then(res=>{
      console.log(res.data);
    })
  }
})