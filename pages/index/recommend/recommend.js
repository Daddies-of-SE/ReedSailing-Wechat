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
      this.setData({
          havelogin : app.haveLogin(),
          info : JSON.stringify(app.loginData.userInfo)
      })
    },

    onShow: function (e) {
      if (app.haveLogin()) {
          this.setData({
              havelogin : true,
              info : JSON.stringify(app.loginData.userInfo)
          })
      }
    },

    callLogin: function (e) {

      if (!app.haveLogin()) {
        const login = require("../../../utils/login.js")
        login.getCodeLogin().then(
          (res) => {
              if (app.haveLogin()) {
                  this.setData({
                      havelogin : true,
                      info : JSON.stringify(app.loginData.userInfo)
                  })
              }
          }
        )
      }
    },

    debugFunc: function(e) {
      //For debugging
      interact.getUserControlOrgs(1)
    }

})