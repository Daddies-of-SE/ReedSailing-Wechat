// pages/sections/user-info/user-info.js

const interact = require('../../../utils/interact.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId : -1,
    userInfo : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: options.userId
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    interact.getUserInfo(this.data.userId).then(
      (res) => {
        this.setData({
          userInfo : res.data
        })
      }
    )
  },
})