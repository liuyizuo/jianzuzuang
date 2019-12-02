//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
   arr:[]  
   },
  //事件处理函数
  click_car:function(e){
    console.log(e)
    var index = parseInt(e.currentTarget.dataset.index);
    var code = this.data.arr[index].CreditNo
    var _this=this
    wx.navigateTo({
      url: '../logs/logs?code='+code
    })
  },
  Jump: function () {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
       console.log(res)
      
         wx.navigateTo({
           url: '../order/order?ass=' + res.result.split("=")[1]
        })
      }
    })
  },
  onLoad: function () {
    var _this=this;
       wx.login({
      success: function (res) {
        console.log(res.code)
        wx.request({
          //获取openid接口  
          url: 'https://smc.imrforest.com/wx/wxinfo?code=' + res.code,
          method: 'GET',
          success: function (res) {
            console.log(res)
            // console.log(JSON.parse(res.data).openid)
            app.globalData.openid = JSON.parse(res.data).openid
            console.log(app.globalData.openid)
            wx.request({
              //获取openid接口  
              url: app.globalData.appurl + '/supply/bind?openId=' + app.globalData.openid,
              method: 'GET',
              success: function (res) {
                console.log(res)
                wx.request({
                  url: app.globalData.appurl + '/supply/analysis?creditNo=' + res.data.content[0].Supply.CreditNo + "&supplyId=" + res.data.content[0].Supply.ID,

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
       
          }
        })
      }
    })
 
  },
  getUserInfo: function(e) {

  }
})
