// pages/sections/org-list/org-list.js
const interact = require("../../../utils/interact.js")
const appInstance = getApp()
const util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    forumName: null,
    forumId: null,
    forumInfo: [],
    hasForumInfo: false,
    searchContent : "",
    show : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      forumName: options.forumName,
      forumId: options.forumId,
      show : appInstance.show
    })
    wx.setNavigationBarTitle({
      title: this.data.forumName + "版块",
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getApp().globalLogin().then(
      (res) => {
        interact.getBlockOrgList(this.data.forumId).then(
          (res) => {
            this.setData({
              forumInfo: res.data,
              hasForumInfo: true,
            })
          }
        )
      })
  },
  
  goFoundOrg: function() {
    if (!getApp().haveRegistered()) {
      getApp().goCertificate()
      return
  }
    wx.navigateTo({
      url: `/pages/my/new-org/new-org?forumId=${this.data.forumId}`,
    })
  },

  goOrg(e) {
    wx.navigateTo({
      url: `../act-list/act-list?orgId=${e.currentTarget.dataset.orgid}`,
    })
  },

  onShareAppMessage: function (res) {
    return {
      title: this.data.forumName + " — 一苇以航",
      path: `pages/sections/org-list/org-list?forumId=${this.data.forumId}`,
      imageUrl: appInstance.forumList[this.data.forumId-1].picUrl,
      success: function (res) {
        wx.showToast({
          title: '分享成功',
        })
      }
    }
  },

  onSearch: function (e) {
    if (this.data.searchContent == "") {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: `/pages/sections/search/search?searchContent=${this.data.searchContent}&searchType=2&forumId=${this.data.forumId}&forumName=${this.data.forumName}`,
    })
  },

  onChange: function (e) {
    this.setData({
      searchContent : e.detail
    })
  },

  onClear: function (e) {
    this.setData({
      searchContent : ""
    })
  },
})