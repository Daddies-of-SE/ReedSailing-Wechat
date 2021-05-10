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
    // followOrgs: [],
    // followOrgInfo: [],
    // controlOrgs: [],
    // controlActs: []
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
  server : 'https://www.reedsailing.xyz/api/',
  // server : 'http://rs.test/',
  // server : 'http://127.0.0.1:8000/',

  shareData : {
    title : "一苇以航活动发布社交平台",
    imageUrl: 'https://www.hualigs.cn/image/609625f87beca.jpg',
  },

  onLaunch() {
    util.debug("launching app... server is " + this.server)
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())


    wx.setStorageSync('logs', logs)

    login.newLogin().then(
      res => {
        // wx.hideToast({
        //   success: (res) => {},
        // })
        // login.consistentAskingGetUserProfile()
      }
    )

    
  },

  haveRegistered() {
    // util.debug("have register " + this.loginData.userExist)
    // return this.loginData.userExist == 1
    return this.loginData.email && this.loginData.email != ""
  },

  goCertificate() {
    return new Promise((resolve, reject)  =>{
      wx.showModal({
        title : '提示',
        content : '您还没有认证，点击跳转到认证页面',
        success: function (res) {
          if (!res.cancel) {
              wx.navigateTo({
                  url: '../../my/my-account/my-account',
              })
              console.log("asd")
              resolve()
          }
          else {
            console.log("fds")
            reject()
          }
        }
      })
    })
  }
})
