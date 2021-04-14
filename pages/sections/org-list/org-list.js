// pages/sections/org-list/org-list.js
const interact = require("../../../utils/interact.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    forumName: null,
    forumInfo: {},
    hasForumInfo: false
},

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
    var appInstance = getApp()
    this.setData({forumName: appInstance.globalData.currentForum})

    interact.getBlockOrgList(appInstance.globalData.currentForumID).then(
      (res) => {
        console.log(res) //控制台打印
        this.setData({
          forumInfo: res.forumInfo,
          hasForumInfo: True,
        })
      }
    )

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  goFoundOrg: function() {
    wx.navigateTo({
      url: '/pages/my/new-org/new-org',
    })
  }
})