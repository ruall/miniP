//index.js
const app = getApp()
const { $Message } = require('../../dist/base/index')

Page({
  data: {
    current: 'index',
    list:'',
    value:'',
    visible1: false,
    userInfo:'',
  },
  onLoad(){
    this.getAll();
  },
  onShow(){
    this.getAll();
  },
  handleChange({ detail }) {
    wx.redirectTo({
      url: '../' + detail.key +'/'+ detail.key,
    })
  },
  getAll(){
    let that =this;
    wx.cloud.callFunction({
      name: 'getAll',
    })
      .then(res => {
        var lists = res.result.data
        for (let [index, item] of lists.entries()){
          wx.cloud.getTempFileURL({
            fileList: [item.image]
          }).then(ress => {
            // get temp file URL
            lists[index].image = ress.fileList['0'].tempFileURL;
            that.setData({
              list: lists,
            })
          }).catch(error => {
            // handle error
          })
        }
      })
      .catch(console.error);
  },
  text(event) {
    this.setData({
      value: event.detail.value
    });
  },
  comment(e){
    let userInfo = app.globalData.userInfo;
    if(userInfo == undefined){
      $Message({
        content: '登录后才可以评论喔！',
        type: 'warning',
      });
    }else{
      this.setData({
        visible1: true,
      });
      let id = e.currentTarget.dataset.id;
      wx.setStorageSync('id', id);
    }
  },
  handleClose1() {
    let that = this;
    let id = wx.getStorageSync('id');
    let myDate = new Date();
    myDate = myDate.toLocaleString();
    that.data.userInfo = app.globalData.userInfo;
    let parame={
      name: that.data.userInfo.nickName,
      content:that.data.value,
      time: myDate
    };
    wx.cloud.callFunction({
      name: 'update',
      data: {
        id: id,
        comment: parame,
      }
    }).then(res => {
      that.getAll();
    }).catch(console.error);
    this.setData({
      visible1: false
    });
  },
  handleClose2() {
    this.setData({
      visible1: false
    });
  },
})
