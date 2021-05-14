// pages/my/my-org/my-org.js
const interact = require("../../../utils/interact.js")
const util = require("../../../utils/util.js")

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
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      // if (!getApp().haveRegistered()) {
      //   wx.navigateBack({
      //     delta: 0,
      //   }).then(
      //     setTimeout(function () {
      //       getApp().goCertificate()
      //     }, 500)
      //   )
        
      //   return
      // }
      interact.getAllManageOrgs().then(
        (res) => {
          this.setData({
            orgList : res.data
          })
        }
      )
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
  
    goFoundOrg: function() {
      wx.navigateTo({
        url: '/pages/my/new-org/new-org',
      })
    },
    
    goOrg(e) {
      wx.navigateTo({
        url: `../../sections/act-list/act-list?orgId=${e.currentTarget.dataset.orgid}`,
      })
    }
})