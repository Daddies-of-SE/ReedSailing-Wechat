// pages/my/my-account/my-account.js

const util = require('../../../utils/util.js')
const interact = require('../../../utils/interact.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    verifiedEmail : "",
    inputEmailAddress : "",
    inputVerifyCode : "",
    second : 60,
    userId : -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      verifiedEmail : app.loginData.email,
      // verifiedEmail : "yuey23@buaa.edu.cn",
      userId : app.loginData.userId
    })
    util.debug("email" + this.data.verifiedEmail)
    // util.debug("logindata email" + app.loginData.email)
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
    if (this.data.inputEmailAddress == "") {
      wx.showToast({
        title: "请输入邮箱",
        icon: 'none'
      })
      return
    }
    var addr = this.data.inputEmailAddress + "@buaa.edu.cn"
    util.debug("submit email address: " + addr)
    interact.submitEmailAddress(addr).then(
      (res) => {
        if (res.data.status == 0) {
          wx.showToast({
            title: '提交成功',
            icon: 'success' 
          })
          this.timer()
        }
      }
    )
    //TODO
    //TODO: 60秒间隔
  },

  warnWait(e) {
    wx.showToast({
      title: "请等待时间冷却",
      icon: 'none'
    })
  },

  submitVerifyCode(e) {
    if (this.data.inputVerifyCode == "") {
      wx.showToast({
        title: "请输入验证码",
        icon: 'none'
      })
    }
    else {
      var addr = this.data.inputEmailAddress + "@buaa.edu.cn"
      util.debug("submit verify code: " + this.data.inputVerifyCode)
      interact.submitVerifyCode(addr, this.data.inputVerifyCode).then(
        (res) => {
          if (res.data.status == 0) {
            wx.showToast({
              title: '验证成功',
              icon: 'success' 
            })
            app.loginData.email = addr
            this.setData({
              verifiedEmail : addr
            })
          }
          else if (res.data.status == 1) {
            wx.showToast({
              title: '验证失败'
            })
          }
        }
      )
    }
  },

  inputEmailHandler(e) {
    // util.debug("e" + JSON.stringify(e.curren))
    this.data.inputEmailAddress = e.detail
  },

  inputVerifyCodeHandler(e) {
    this.data.inputVerifyCode = e.detail
  },

  timer() {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  }

})