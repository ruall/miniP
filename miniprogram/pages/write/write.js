const app = getApp()
const { $Message } = require('../../dist/base/index')

Page({
  data: {
    current: 'write',
    value:'',
    image:'',
    show:false,
    showT:false,
    userInfo:'',
  },
  handleChange({ detail }) {
    wx.redirectTo({
      url: '../' + detail.key + '/' + detail.key,
    })
  },
  addPic(){
    let userInfo = app.globalData.userInfo;
    if (userInfo == undefined){
      $Message({
        content: '登录后才可以评论喔！',
        type: 'warning',
      });
    }else{
      let that = this;
      let num = "";
      for (var i = 0; i < 10; i++) {
        num += Math.floor(Math.random() * 10);
      }
      wx.chooseImage({
        success: chooseResult => {
          that.setData({
            show: true,
          })
          // 将图片上传至云存储空间
          wx.cloud.uploadFile({
            // 指定上传到的云路径
            cloudPath: num + '.png',
            // 指定要上传的文件的小程序临时文件路径
            filePath: chooseResult.tempFilePaths[0],
            // 成功回调
            success: res => {
              that.setData({
                image: res.fileID,
                show: false,
                showT: true
              })
              $Message({
                content: '上传成功！',
                type: 'success',
              });
            },
            fail: res => {
              that.setData({
                show: false,
              })
              $Message({
                content: '未知错误，请联系管理员',
                type: 'error',
              });
            }
          })
        },
      })
    }
    
  },
  text(event){
    this.setData({
      value:event.detail.value
    });
  },
  save(){
    let that = this;
    if(that.data.value == ""){
      $Message({
        content: '请输入内容！',
        type: 'error',
      });
    }else{
      let myDate = new Date();
      myDate = myDate.toLocaleString();
      that.data.userInfo = app.globalData.userInfo;
      that.setData({
        show: true,
      })
      wx.cloud.callFunction({
        name: 'addList',
        data: {
          image: this.data.image,
          name: that.data.userInfo.nickName,
          time: myDate,
          title: that.data.value,
        }
      }).then(res => {
        that.setData({
          show: false,
        })
        $Message({
          content: '提交成功！',
          type: 'success',
        });
        wx.redirectTo({
          url: '../index/index',
        })
      }).catch(res=>{
        that.setData({
          show: false,
        })
      })
    }
  }
  
})