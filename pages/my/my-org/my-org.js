// pages/my/my-org/my-org.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      orgList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    },
    
  goOrg(e) {
    var appInstance = getApp()
    appInstance.globalData.currentOrg = e.currentTarget.dataset.orgname
    appInstance.globalData.currentOrgID = e.currentTarget.dataset.orgid
    util.debug("org " + appInstance.globalData.currentOrgID + " " + appInstance.globalData.currentOrg)

    wx.navigateTo({
      url: '../act-list/act-list',
    })
  }
})