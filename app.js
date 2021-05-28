const util = require('utils/util.js')
const interact = require('utils/interact.js')
const login = require('utils/login.js')

// app.js
App({
  version: "1.6.3",
  show : false,
  debug : false,
  loginData: {
    token: '',
    email : '',
    userExist : -1,
    userId : -1,
    nickName : '',
    motto : '',
    avatar : '',
    contact : '',
    follow_boya : false

  },
  // allNotifList : [],
  unreadNotifList : [],
  // readNotifList: [],
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
  socketOpen : false,
  firstShow : true,
  server : 'https://www.reedsailing.xyz/api/',
  ws_werver: 'wss://www.reedsailing.xyz/ws/',
  // server : 'http://127.0.0.1:8000/api/',
  // ws_werver: 'ws://127.0.0.1:8000/ws/',
  // ws_werver: 'wss://rs.test/ws/',
  // server : 'http://rs.test/',
  

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

    interact.show().then(
      (res) => {
        this.show = res.data.show
        console.log("show: ", this.show)
      }
    )

    wx.setStorageSync('logs', logs)






    //接收数据
    var that = this;
    wx.onSocketMessage(function(data) {
      var r = JSON.parse(data.data)
      console.log('服务器返回的数据: ', r);
      that.unreadNotifList = r

      if (that.unreadNotifList.length > 0) {
        that.showRedDot()
      }
  })
  },

  onShow() {
    // when the app is hiden, the websocket link will disconnect. So we need connect again in Onshow
    var that = this;
    if (this.firstShow) {
      this.firstShow = false
    } else if(this.loginData.userId != -1 && !this.socketOpen) {
      wx.connectSocket({
        url: that.ws_werver + `link/${that.loginData.userId}/`,
        timeout: 1000,
      })
    }
  },

  showRedDot() {
    wx.showTabBarRedDot({
      index: 4,
    }).catch(
     (res) => {
       console.log("showRedDot called but not a TabBar page; ignore")
     }
    )
  },

  globalLogin() {
    var that = this;
    return new Promise( (resolve, reject) => {
      if (that.loginData.userId == -1) {
        login.newLogin().then(
          (resgit) => {
            wx.connectSocket({
              url: that.ws_werver + `link/${that.loginData.userId}/`,
              timeout: 1000,
            })
            
            //连接成功
            wx.onSocketOpen(function() {
              console.log("websocket连接服务器成功")
              that.socketOpen = true
              wx.sendSocketMessage({
                data: 'This is a test from the client',
              })
            })

            //监听链接断开事件
            wx.onSocketClose(function(res) {
              console.log("websocket连接断开:" + res.reason)
              that.socketOpen = false
            })

            resolve()
          }
        )
      } else {
        resolve()
      }
    })
    
  },

  haveRegistered() {
    return this.loginData.email && this.loginData.email != ""
  },

  goCertificate() {
    wx.showModal({
      title : '提示',
      content : '您还没有认证，点击跳转到认证页面',
      success: function (res) {
        if (!res.cancel) {
            wx.navigateTo({
                url: '/pages/my/my-account/my-account',
            })
        }
        else {
        }
      }
    })
  }
})
