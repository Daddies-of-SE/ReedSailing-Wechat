const util = require('utils/util.js')
const interact = require('utils/interact.js')
const login = require('utils/login.js')

// app.js
App({
  loginData: {
    token: '',
    email : '',
    userExist : -1,
    userId : -1,
    nickName : '',
    motto : '',
    avatar : ''
  },
  globalData: {
    currentForum: null,
    currentForumID: null,
    currentOrg: null,
    currentOrgID: null // -1: 博雅 -2：个人
  },
  userData: {
    followOrgs: [],
    followOrgInfo: [],
    controlOrgs: [],
    controlActs: []
  },
  server : 'http://rs.test/',
  // server : 'http://127.0.0.1:8000/',

  onLaunch() {
    util.debug("launching app... server is " + this.server)
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())


    wx.setStorageSync('logs', logs)

  },

  haveRegistered() {
    // util.debug("have register " + this.loginData.userExist)
    return this.loginData.userExist == 1
  }
})
