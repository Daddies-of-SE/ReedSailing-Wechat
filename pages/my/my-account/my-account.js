// pages/my/my-account/my-account.js

const util = require('../../../utils/util.js')
const interact = require('../../../utils/interact.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    verifiedEmail : false,
    inputEmailAddress : "",
    inputVerifyCode : "",
    second: 60,
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
        if (res.data.success) {
          util.debug("find success", res.data.success)
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
      util.debug("submit verify code: " + this.data.inputVerifyCode)
      //TODO
    }
  },

  inputEmailHandler(e) {
    this.data.inputEmailAddress = e.detail.value
  },

  inputVerifyCodeHandler(e) {
    this.data.inputVerifyCode = e.detail.value
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