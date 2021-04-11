const util = require('utils/util.js')

// app.js
App({
  loginData: {
    token: '',
    userInfo: {}
  },
  onLaunch() {
    util.debug("launching app...")
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          util.debug('登录成功')
          wx.request({
            url: 'http://127.0.0.1:8000/login/',
            data: {
              code: res.code
            },
            method: "POST", 
          })
        } else {
          util.debug('登录失败！' + res.errMsg)
        }
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
