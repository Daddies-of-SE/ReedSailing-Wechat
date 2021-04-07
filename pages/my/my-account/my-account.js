// pages/my/my-account/my-account.js

const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    verifiedEmail : false,
    inputEmailAddress : "",
    inputVerifyCode : "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //TODO: 更新verifiedEmail
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

  },

  submitVerifyEmail(e) {
    var addr = this.data.inputEmailAddress + "@buaa.edu.cn"
    util.debug("submit email address: " + addr)
    //TODO
    //TODO: 60秒间隔
  },

  submitVerifyCode(e) {
    if (this.data.inputVerifyCode == "") {
      wx.showToast({
        title: "请输入验证码",
        icon: 'none'
      })
    }
    else {
      util.debug("submit verify code: " + this.data.inputVerifyCode)
      //TODO
    }
  },

  inputEmailHandler(e) {
    this.data.inputEmailAddress = e.detail.value
  },

  inputVerifyCodeHandler(e) {
    this.data.inputVerifyCode = e.detail.value
  }
})