// pages/register/register.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectname:"" ,
    projectID:""  ,
    SupplierName:"",
    CreditNo:""

  },
    bindKeyInput: function (e) {
    console.log(e)
      this.data.CreditNo = e.detail.value
  },
  iptphone:function(e){
    console.log(e)
    this.data.SupplierName = e.detail.value
  },

  jump:function(){
    var _this=this
    console.log(this.data.CreditNo)
    wx.request({

      url: app.globalData.appurl + '/supply/bind',
      data: {
        CreditNo: this.data.CreditNo,
        ProjectID: this.data.projectID,
        SupplyName: this.data.SupplierName,
        ProjectName: this.data.projectname,
        OpenID:app.globalData.openid,

      },
      method: "POST",
      success: function (res) {
        if (res.data.code=1){
          wx.navigateTo({
            url: '../order/order?ass=' + _this.data.projectID
          })
        }
        console.log(res)
     
      }
    })
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var _this=this
    this.setData({
      projectID: options.ass
    })
    wx.request({
      url: app.globalData.arrurl + '/project/' + options.ass,
      method: "GET",
      success: function (res) {
        console.log(res)
        _this.setData({
          projectname: res.data.ProjectShortName,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})