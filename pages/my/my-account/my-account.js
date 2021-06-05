// pages/my/my-account/my-account.js

const util = require('../../../utils/util.js')
const interact = require('../../../utils/interact.js')
const login = require('../../../utils/login.js')
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
    inputContact : "",
    second : 60,
    userId : -1,
    nickName : '',
    motto : '',
    contact : '',
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
    // interact.getUserInfo(app.loginData.userId).then(
    //   (res) => {
    //     login.saveLoginData({
    //       token : app.loginData.token,
    //       email : res.data.email,
    //       userExist : app.loginData.userExist,
    //       userId : app.loginData.userId,
    //       nickName : res.data.name,
    //       motto : res.data.sign,
    //       avatar : res.data.avatar,
    //       contact: res.data.contact,
    //       follow_boya : res.data.follow_boya
    //     })
        this.setData({
          verifiedEmail : app.loginData.email,
          userId : app.loginData.userId,
          nickName : app.loginData.nickName,
          motto : app.loginData.motto,
          contact : app.loginData.contact,
          inputNickName : app.loginData.nickName,
          inputMotto : app.loginData.motto,
          inputContact : app.loginData.contact,
          second: app.second
        })
    //   }
    // )
    if (app.timerRunning) {
      this.timer()
    }
    util.debug("user's email: " + this.data.verifiedEmail)
  },

  submitVerifyEmail(e) {
    if (this.data.inputEmailAddress.trim() == "") {
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
          app.timerRunning = true
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

  submitVerifyCode() {
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
              title: '验证失败，请重新输入验证码',
              icon : 'none'
            })
          }
        }
      )
  },

  submitCertificate(e) {
    if (this.data.inputVerifyCode.trim() == "") {
      wx.showToast({
        title: "请输入验证码",
        icon: 'none'
      })
      return
    }
    else {
      if (!wx.getUserProfile) {
        wx.showModal({
          content : '请使用手机端小程序进行认证'
        })
        return
      }
      wx.getUserProfile({
        desc : '用于完善资料',
        success : (res1) => {
          login.register_(res1.userInfo).then(
            res => {
              if (res.data.status == 0) {
                login.saveLoginData({
                  token: app.loginData.token,
                  email : app.loginData.email,
                  userExist : 1,
                  id : app.loginData.userId,
                  name : res1.userInfo.nickName.slice(0,10),
                  sign : app.loginData.motto,
                  avatar : res1.userInfo.avatarUrl
                })

                this.submitVerifyCode()
    
              }
            }
          )
        },
        fail : (res2) => {
          wx.showToast({
            title: '请允许授权',
            icon: 'none'
          })
        }
      })

    }
  },

  submitUserInfo(e) {
    if (this.data.inputNickName.trim() == "") {
      wx.showToast({
        title: '昵称不能为空',
        icon: 'none'
      })
      return
    }
    if (!wx.getUserProfile) {
      wx.showModal({
        content : '请使用手机端小程序进行认证'
      })
      return
    }
    wx.getUserProfile({
      desc : '用于完善资料',
      success : (res1) => {

        interact.updateUserInfo(this.data.inputNickName, this.data.inputMotto, this.data.inputContact, res1.userInfo.avatarUrl).then(
          (res) => {
            if (res.statusCode == 200) {
              wx.showToast({
                title: '修改成功',
                icon : 'success'
              })
              app.loginData.nickName = this.data.inputNickName
              app.loginData.motto = this.data.inputMotto
              app.loginData.contact = this.data.inputContact
              app.loginData.avatar = res1.userInfo.avatarUrl
            } else {
              wx.showToast({
                title: '修改失败',
                icon: 'none'
              })
            }
          }
        )
      },
      fail : (res2) => {
        wx.showToast({
          title: '请允许授权',
          icon: 'none'
        })
      }
    })

    
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

  inputContactHandler(e) {
    this.data.inputContact = e.detail
  },

  timer() {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          app.second -= 1
          if (this.data.second <= 0) {
            this.setData({
              second: 60
            })
            app.second = 60
            app.timerRunning = false
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