// pages/sections/act-detail/participants/participants.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actId : -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      actId : options.actId
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
})