// pages/my/my-notif/my-notif.js

const app = getApp()
const util = require("../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allNotifList : [],
    unreadNotifList : [],
    readNotifList: [],
    showIndex: [true, false],
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

  addRelativeTime(notifList) {
    for (var i = 0; i < notifList.length; i++) {
      notifList[i].relative_time = util.getRelativeTime(notifList[i].time)
    }
    return notifList
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    this.setData({
      unreadNotifList : this.addRelativeTime(app.unreadNotifList),
      readNotifList : this.addRelativeTime(app.readNotifList)
    })
  },

  panel: function (e) {
    var index = e.currentTarget.dataset.index
    if (!this.data.showIndex[index]) {
      //此前未show
      var newIndex = this.data.showIndex
      newIndex[index] = true
      this.setData({
        showIndex: newIndex
      })
    } else {
      var newIndex = this.data.showIndex
      newIndex[index] = false
      this.setData({
        showIndex: newIndex
      })
    }
  },

  goActOrOrg(e) {
    var dataset = e.currentTarget.dataset
    if (dataset.act) {
      wx.navigateTo({
        url: `../../sections/act-detail/act-detail?actId=${dataset.act}`,
      })
    }
    else if (dataset.org) {
      wx.navigateTo({
        url: `../../sections/act-list/act-list?orgId=${dataset.org}`,
      })
    }
  }
})