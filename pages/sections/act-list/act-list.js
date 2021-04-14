// pages/sections/org-detail/org-detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orgName: null,
        orgPicUrl: "/icon/sample.png",
        orgInfo: {"orgInfo": "orgInfo"},
        hasOrgInfo: false,
        showIndex: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.request({
          url: 'url',
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            console.log(res) //控制台打印
            this.setData({
              orgInfo: res.orgInfo,
              hasOrgInfo: True
            })
          }
        })
      },

    panel: function (e) {
      if (e.currentTarget.dataset.index != this.data.showIndex) {
        this.setData({
          showIndex: e.currentTarget.dataset.index
        })
      } else {
        this.setData({
          showIndex: 0
        })
      }
    },

    //关注页面
    followOrg: function() {
      
    },
  
    editOrgInfo: function() {
      wx.navigateTo({
        url: '../org-detail/org-detail',
      })
    },
  
    editMemList: function() {
      wx.navigateTo({
        url: '../act-list/mem-list/mem-list',
      })
    },
  
    editActInfo: function() {
      wx.navigateTo({
        url: '../act-detail/act-detail',
      })
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