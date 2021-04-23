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
  userData: {
    followOrgs: [],
    followOrgInfo: [],
    controlOrgs: [],
    controlActs: []
  },
  forumList : [
    {
        id : 1,
        title : "社团",
        hasOrgLevel: true,
        picUrl : "/icon/club.png",
    
    },
    {
        id : 2,
        title : "博雅",
        hasOrgLevel: false,
        picUrl : "/icon/boya.png",
    },
    {
        id : 3,
        title : "学生会",
        hasOrgLevel: true,
        picUrl : "/icon/student_union.png",
    },
    {
        id : 4,
        title : "志愿",
        hasOrgLevel: true,
        picUrl : "/icon/volunteer.png",
    },
    {
        id : 5,
        title : "个人",
        hasOrgLevel: false,
        picUrl : "/icon/person_forum.png",
    },

  ],
  server : 'http://www.reedsailing.xyz/',
  // server : 'http://rs.test/',
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
