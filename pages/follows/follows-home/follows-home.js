const app = getApp()

// pages/follows/follows-home/follows-home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        havelogin : false
    },

    onLoad: function (options) {
      this.setData({
          havelogin : app.haveLogin()
      })
    },

    onShow: function (e) {
      if (app.haveLogin()) {
          this.setData({
              havelogin : true
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
                      havelogin : true
                  })
              }
          }
        )
      }
    }

})