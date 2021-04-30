const app = getApp()
const util = require('../../../utils/util.js')

Page({
  data: {
    havelogin : false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
    nickName : '',
    motto : ''
  },
  // 事件处理函数
  bindViewTap() {
    
  },
  
  onLoad() {
    
  },

  onShow: function (e) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
    this.setData({
      havelogin : app.haveRegistered(),
      nickName : app.loginData.nickName,
      motto : app.loginData.motto
    })
    if (app.haveRegistered()) {
        this.setData({
            havelogin : true,
            nickName : app.loginData.nickName,
            motto : app.loginData.motto
        })
    }
  },

  callLogin: function (e) {
    if (!app.haveRegistered()) {
      const login = require("../../../utils/login.js")
      login.registerInfo().then(
          this.setData({
              havelogin: true,
              nickName : app.loginData.nickName,
              motto : app.loginData.motto
          })
      )
    }
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  toMyAccount() {
    wx.navigateTo({
      url: '../my-account/my-account',
    })
  },

  toMyOrg() {
    wx.navigateTo({
      url: '../my-org/my-org',
    })
  },

  toMyAct() {
    wx.navigateTo({
      url: '../my-act/my-act',
    })
  },

  toNewAct() {
    wx.navigateTo({
      url: '../new-act/new-act',
    })
  },

  toFeedback() {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
})
