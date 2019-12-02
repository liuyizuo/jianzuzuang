
var app = getApp();
Page({
  data: {
    arr:[]
  },
  a1:function(){
    wx.navigateTo({
      url: '../register/register'
    })
  },
  onLoad: function (e) {
   console.log(e)
   var _this=this
    wx.request({

      url: app.globalData.appurl + '/supplies?creditNo=' + e.code,

      method: "GET",
      success: function (res) {
        console.log(res)
        _this.setData({
          arr: res.data.content
        })
      }
    })
  }
})
