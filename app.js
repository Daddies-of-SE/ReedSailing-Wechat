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

  // server : 'https://www.reedsailing.xyz/api/',
  // ws_werver: 'wss://www.reedsailing.xyz/ws/',
  // ws_werver: 'wss://rs.test/ws/',
  // server : 'http://rs.test/',
  server : 'http://127.0.0.1:8000/api/',
  ws_werver: 'ws://127.0.0.1:8000/ws/',
  socketOpen : false,

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
    // this.globalLogin().then(
    //   res => {
    //     // wx.hideToast({
    //     //   success: (res) => {},
    //     // })
    //     // login.consistentAskingGetUserProfile()
        
    //   }
    // )

    // console.log(util.getRelativeTime("2020-12-01 01:18"))

    // set up socket link



    //接收数据
    var that = this;
    wx.onSocketMessage(function(data) {
      // console.log(typeof(data.data))
      // console.log(data.data)
      // console.log(util.replaceAll(data.data, "'", "\""))
      // var r = JSON.parse(util.replaceAll(data.data, "'", "\""))
      var r = JSON.parse(data.data)
      console.log('服务器返回的数据: ', r);
      that.unreadNotifList = r
      // that.unreadNotifList = [
      //   {
      //     id : 31,
      //     type : 1,
      //     time : '2021-05-21T11:04:50.445933',
      //     content: '活动\'PS不教学不讲座\'内容发生了改变，请及时查看',
      //     act : 1,
      //     org : null
      //   },
        // {
        //   id : 32,
        //   type : 1,
        //   time : '2021-01-21T11:04:50.445933',
        //   content: '爪巴',
        //   act : null,
        //   org : null
        // },
      // ]
      if (that.unreadNotifList.length > 0) {
        
        wx.showTabBarRedDot({
          index: 4,
        }).catch(
          
        )
      }
  })
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
              // success: res=>{
              //   console.log("创建socket连接成功")
              //   console.log(res)
              // },
              // fail: res=>{
              //   console.log('创建socket连接失败')
              //   console.log(res)
              // }
            })
            
            //连接成功
            wx.onSocketOpen(function() {
              console.log("websocket连接服务器成功")
              that.socketOpen = true
              wx.sendSocketMessage({
                data: 'This is a test from the client',
              })
            })
  
            // //接收数据
            // wx.onSocketMessage(function(data) {
            //     //TODO
            //     console.log('服务器返回的数据: ' + data.data);
            //     that.unreadNotifList = data.data
            //     // that.unreadNotifList = [
            //     //   {
            //     //     id : 31,
            //     //     type : 1,
            //     //     time : '2021-05-21T11:04:50.445933',
            //     //     content: '活动\'PS不教学不讲座\'内容发生了改变，请及时查看',
            //     //     act : 1,
            //     //     org : null
            //     //   },
            //       // {
            //       //   id : 32,
            //       //   type : 1,
            //       //   time : '2021-01-21T11:04:50.445933',
            //       //   content: '爪巴',
            //       //   act : null,
            //       //   org : null
            //       // },
            //     // ]
            //     if (that.unreadNotifList.length > 0) {
            //       wx.showTabBarRedDot({
            //         index: 4,
            //       })
            //     }
            //     // this.notificationList = 
            // })
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
