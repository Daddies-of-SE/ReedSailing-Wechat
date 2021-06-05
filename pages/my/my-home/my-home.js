const app = getApp()
const interact = require('../../../utils/interact.js')
const login = require('../../../utils/login.js')

Page({
  data: {
    havelogin : false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    show : false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
    nickName : '',
    motto : '',
    jumpItem: [
      {
        name:'个人信息',
        url:'../my-account/my-account',
        notice : true
      },
      {
        name:'通知列表',
        url:'../my-notif/my-notif'
      },
      {
        name:'提交反馈',
        url:'../feedback/feedback'
      }
    ]


  },
  // 事件处理函数
  bindViewTap() {
    
  },

  onShow: function (e) {
    // // For test
    // wx.sendSocketMessage({
    //   data: 'This is a test from the client',
    // })
    console.log(app, app.loginData, app.loginData.userId)
    interact.getUserInfo(app.loginData.userId).then( (res) => {
      login.saveLoginData({
        token : app.loginData.token,
        email : res.data.email,
        userExist : app.loginData.userExist,
        id : app.loginData.userId,
        name : res.data.name,
        sign : res.data.sign,
        avatar : res.data.avatar,
        contact: res.data.contact,
        follow_boya : res.data.follow_boya
      })
      this.setData({
        havelogin : app.haveRegistered(),
        nickName : app.loginData.nickName,
        motto : app.loginData.motto
      })
    }
  )

    if (!app.haveRegistered()) {
      app.goCertificate()
    }

    else if (!app.show) {
      this.setData({
        jumpItem: [
          {
            name:'个人信息',
            url:'../my-account/my-account',
          },
          {
            name:'提交反馈',
            url:'../feedback/feedback'
          }
        ]
      })
    }

    else {
      if (app.unreadNotifList.length != 0) {
        app.showRedDot()
      }
      else {
        wx.hideTabBarRedDot({
          index: 4,
        })
      }
      this.setData({
        jumpItem : [
          {
            name:'个人信息',
            url:'../my-account/my-account'
          },
          {
            name:'通知列表',
            url:'../my-notif/my-notif',
            notice : app.unreadNotifList.length != 0
          },
          {
            name:'我的组织',
            url:'../my-org/my-org'
          },
          {
            name:'我的活动',
            url:'../my-act/my-act'
          },
          {
            name:'新建活动',
            url:'../new-act/new-act'
          },
          {
            name:'提交反馈',
            url:'../feedback/feedback'
          }
        ]
      })
    }
    
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
    
    // util.debug("onshow called" + app.loginData.nickName)
    if (app.haveRegistered()) {
        this.setData({
            havelogin : true,
            nickName : app.loginData.nickName,
            motto : app.loginData.motto
        })
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


  onShareAppMessage: function (res) {
    return {
      title: app.shareData.title,
      path: 'pages/index/index',
      imageUrl: app.shareData.imageUrl,
      success: function (res) {
        wx.showToast({
          title: '分享成功',
        })
      }
    }
  },
})
