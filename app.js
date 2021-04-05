const util = require('utils/util.js')

// app.js
App({
  onLaunch() {
    util.debug("launching app...")
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },
  onError() {
    util.debug("Error encountered")
  }
})
