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
    inputNickName : "",
    inputMotto : "",
    second : 60,
    userId : -1,
    nickName : '',
    motto : '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      verifiedEmail : app.loginData.email,
      userId : app.loginData.userId,
      nickName : app.loginData.nickName,
      motto : app.loginData.motto,
      inputNickName : app.loginData.nickName,
      inputMotto : app.loginData.motto,
    })
    util.debug("user's email: " + this.data.verifiedEmail)
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
              title: '验证失败，请重新输入验证码'
            })
          }
        }
      )
    }
  },

  submitUserInfo(e) {
    if (this.data.inputNickName == "") {
      wx.showToast({
        title: '昵称不能为空',
        icon: 'none'
      })
      return
    }
    interact.updateUserInfo(this.data.inputNickName, this.data.inputMotto).then(
      (res) => {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '修改成功',
            icon : 'success'
          })
          app.loginData.nickName = this.data.inputNickName
          app.loginData.motto = this.data.inputMotto
        } else {
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          })
        }
      }
    )
  },

  inputEmailHandler(e) {
    // util.debug("e" + JSON.stringify(e.curren))
    this.data.inputEmailAddress = e.detail
  },

  inputVerifyCodeHandler(e) {
    this.data.inputVerifyCode = e.detail
  },

  inputNickNameHandler(e) {
    this.data.inputNickName = e.detail
  },

  inputMottoHandler(e) {
    this.data.inputMotto = e.detail
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