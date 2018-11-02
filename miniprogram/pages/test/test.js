let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  onLoad(){
    this.addSum();
  },
  addSql(){
    //云函数写法
    wx.cloud.callFunction({
      name:'addList',
      data:{
        description:'新添加的',
        due: '',
        tags:['1','2'],
        progress:80,
        done: false
      }
    }).then(res=>{
      console.log(res.result)
    }).catch(console.error)

    // const db = wx.cloud.database();
    // db.collection('mini').add({
    //   // data 字段表示需新增的 JSON 数据
    //   data: {
    //     description: "learn cloud database   222",
    //     due: new Date("2018-09-01"),
    //     tags: [
    //       "cloud",
    //       "database"
    //     ],
    //     done: false
    //   }
    // })
    //   .then(res => {
    //     console.log(res)
    //   })
  },
  getSql(){
    //云函数写法
    wx.cloud.callFunction({
        name: 'getAll',
      })
        .then(res => {
          console.log(res.result.data);
        })
        .catch(console.error);
    
    // db.collection('mini').get().then(res=>{
    //   console.log(res.data);
    // });
  },
  getSqlByd(){
    //云函数写法
    wx.cloud.callFunction({
      name:'getInfoByd',
      data:{
        done:false
      },
    }).then(res=>{
      console.log(res.result.data);
    }).catch(console.error);

    //小程序写法
    // const _ = db.command;
    // db.collection('mini').where({
    //   done:true,
    //   due: new Date("2018-09-01"),
    //   progress:_.gt(60)
    // }).get().then(res=>{
    //   console.log(res.data);
    // })
  },
  update(){
    //云函数写法
    wx.cloud.callFunction({
      name:'update',
      data:{
        id:'W9v9TrdokuiPwnye',
        done:true,
      }
    }).then(res=>{
      console.log(res.result);
    }).catch(console.error);


    // const db = wx.cloud.database();
    // db.collection('mini').doc('W9v_7nhEiJmgLZL5').update({
    //   data:{
    //     done:false
    //   }
    // }).then(res=>{
    //   console.log(res);
    // })
  },
  del(){
    //云函数写法
    wx.cloud.callFunction({
      name:'del',
      data:{
        id:'W9v_27dokuiPwpHd'
      }
    }).then(res=>{
      console.log(res.result)
    }).catch(console.error);


    // const db = wx.cloud.database();
    // db.collection('mini').doc('W9v_7nhEiJmgLZL5').remove().then(res=>{
    //   console.log(res);
    // });
  },
  addSum(){
    wx.cloud.callFunction({
      name:'add',
      data:{
        a:1,
        b:2,
      },
    })
    .then(res=>{
      console.log(res.result);
    })
    .catch(console.error);
  }
})