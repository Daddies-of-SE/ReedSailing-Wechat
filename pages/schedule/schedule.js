const app = getApp()

// pages/schedule/schedule.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    havelogin : false
  },

   /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;

      /** 
       * 获取系统信息 
       */
      wx.getSystemInfo({
          success: function (res) {
              that.setData({
                  winWidth: res.windowWidth,
                  winHeight: res.windowHeight
              });
          }
        });
        this.setData({
            havelogin : app.haveRegistered()
        })
    },

  bindChange: function (e) {

      var that = this;
      that.setData({ currentTab: e.detail.current });

  },
  swichNav: function (e) {

      var that = this;

      if (this.data.currentTab === e.target.dataset.current) {
          return false;
      } else {
          that.setData({
              currentTab: e.target.dataset.current
          })
      }
  } ,  
  
  onShow: function (e) {
    if (app.haveRegistered()) {
        this.setData({
            havelogin : true
        })
    }
  },

  callLogin: function (e) {
    if (!app.haveRegistered()) {
      const login = require("../../utils/login.js")
      login.registerInfo().then(
          this.setData({
              havelogin: true
          })
      )
    }
  },
})