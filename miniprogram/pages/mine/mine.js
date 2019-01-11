const app = getApp()

Page({
  data: {
    current: 'mine',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    timeList: {},
  },
  onLoad: function () {
    var that = this;
    // var sDate1 = '2019-02-05';
    setInterval(() => {
      var sDate = new Date();
      var timeSpan = {};
      timeSpan.days = sDate.getDate();
      timeSpan.hours = sDate.getHours() < 10 ? "0" + sDate.getHours() : sDate.getHours();
      timeSpan.minutes = sDate.getMinutes() < 10 ? "0" + sDate.getMinutes() : sDate.getMinutes();
      timeSpan.seconds = sDate.getSeconds() < 10 ? "0" + sDate.getSeconds() : sDate.getSeconds();
      var days = timeSpan.days+'';
      if (days.length==2){
        days.split("");
        timeSpan.days1 = days[0];
        timeSpan.days2 = days[1];
      }
      var hours = timeSpan.hours + '';
      if (hours.length == 2) {
        hours.split("");
        timeSpan.hours1 = hours[0];
        timeSpan.hours2 = hours[1];
      }
      var minutes = timeSpan.minutes + '';
      if (minutes.length == 2) {
        minutes.split("");
        timeSpan.minutes1 = minutes[0];
        timeSpan.minutes2 = minutes[1];
      }
      var seconds = timeSpan.seconds + '';
      if (seconds.length == 2) {
        seconds.split("");
        timeSpan.seconds1 = seconds[0];
        timeSpan.seconds2 = seconds[1];
      }
      that.setData({
        timeList: timeSpan
      })

      // var oDate1 , oDate2;
      // oDate1 = new Date(sDate1).getTime();//转换为MM-dd-yyyy格式 
      // oDate2 = new Date(sDate2).getTime();
      // var timeSpan = {};
      // var TotalMilliseconds = oDate1 - oDate2;//相差的毫秒数
      // if (isNaN(TotalMilliseconds) || TotalMilliseconds < 0) {
      //   return null;
      // }
      // timeSpan.Days = parseInt(TotalMilliseconds / 1000 / 60 / 60 / 24);
      // timeSpan.TotalHours = parseInt(TotalMilliseconds / 1000 / 60 / 60) + '';
      // timeSpan.Hours = timeSpan.TotalHours % 24;
      // timeSpan.TotalMinutes = parseInt(TotalMilliseconds / 1000 / 60);
      // timeSpan.Minutes = timeSpan.TotalMinutes % 60 + '';
      // timeSpan.TotalSeconds = parseInt(TotalMilliseconds / 1000);
      // timeSpan.Seconds = timeSpan.TotalSeconds % 60;
      // timeSpan.TotalMilliseconds = TotalMilliseconds;
      // timeSpan.Milliseconds = TotalMilliseconds % 1000;
      // return timeSpan;
    }, 500);

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  handleChange({ detail }) {
    wx.redirectTo({
      url: '../' + detail.key + '/' + detail.key,
    })
  }
})