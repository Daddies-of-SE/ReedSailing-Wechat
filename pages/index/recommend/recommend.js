const app = getApp()
const interact = require("../../../utils/interact.js")
const util = require("../../../utils/util.js")

// pages/index/recommend.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        havelogin : false,
        info : ""
    },

    onLoad: function (options) {
      const login = require("../../../utils/login.js")
      login.newLogin().then(
        (res) => {
          this.setData({
              havelogin : app.haveRegistered(),
              info : JSON.stringify(app.loginData.nickName)
          })
        }
      )
    },

    onShow: function (e) {
      if (app.haveRegistered()) {
          this.setData({
              havelogin : true,
              info : JSON.stringify(app.loginData.nickName)
          })
      }
    },

    callLogin: function (e) {
      if (!app.haveRegistered()) {
        const login = require("../../../utils/login.js")
        login.registerInfo().then(
            this.setData({
                havelogin: true,
                info : JSON.stringify(app.loginData.nickName)
            })
        )
      }
    },

    debugFunc: function(e) {
      //For debugging
      // interact.getUserControlOrgs(1)
      // wx.navigateTo({
      //   url: '../../sections/act-detail/act-detail',
      // })
    }

})