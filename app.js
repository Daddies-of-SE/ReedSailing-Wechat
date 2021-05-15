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
    avatar : '',
    contact : ''
  },
  // allNotifList : [],
  unreadNotifList : [],
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
  ws_werver: 'wss://www.reedsailing.xyz/ws/',
  // server : 'http://rs.test/',
  // server : 'http://127.0.0.1:8000/api/',
  // ws_werver: 'ws://127.0.0.1:8000/ws/',

  shareData : {
    title : "一苇以航活动发布社交平台",
    imageUrl: 'https://www.hualigs.cn/image/609625f87beca.jpg',
  },

  buaaLocation : {
    latitude: 39.981891,
    longitude: 116.347256
  },

  onLaunch() {
    util.debug("launching app... server is " + this.server)
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())


    wx.setStorageSync('logs', logs)

    // 考虑通过二维码直接进入某一界面的情况，不能只允许recommend页面进行newLogin
    this.globalLogin().then(
      res => {
        // wx.hideToast({
        //   success: (res) => {},
        // })
        // login.consistentAskingGetUserProfile()
        wx.connectSocket({
          url: this.ws_werver + `link/${this.loginData.userId}/`,
          timeout: 1000,
          success: res=>{
            console.log("创建socket连接成功")
            console.log(res)
          },
          fail: res=>{
            console.log('创建socket连接失败')
            console.log(res)
          }
        })
      }
    )

    // console.log(util.getRelativeTime("2020-12-01 01:18"))

    // set up socket link


     //连接成功
     wx.onSocketOpen(function() {
      console.log("websocket连接服务器成功")
      wx.sendSocketMessage({
        data: 'This is a test from the client',
      })
    })

    //接收数据
    wx.onSocketMessage(function(data) {
        console.log('服务器返回的数据: ' + data.data);
        // this.notificationList = 
    })

  },

  globalLogin() {
    return new Promise( (resolve, reject) => {
      if (this.loginData.userId == -1) {
        login.newLogin().then(
          (res) => {
            resolve()
          }
        )
      } else {
        resolve()
      }
    })
    
  },

  haveRegistered() {
    // util.debug("have register " + this.loginData.userExist)
    // return this.loginData.userExist == 1
    return this.loginData.email && this.loginData.email != ""
  },

  goCertificate() {
    wx.showModal({
      title : '提示',
      content : '您还没有认证，点击跳转到认证页面',
      success: function (res) {
        if (!res.cancel) {
            wx.navigateTo({
                url: '../../my/my-account/my-account',
            })
        }
        else {
        }
      }
    })
  }
})
