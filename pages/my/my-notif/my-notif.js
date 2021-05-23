// pages/my/my-notif/my-notif.js

const app = getApp()
const util = require("../../../utils/util.js")
const interact = require("../../../utils/interact.js")

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
    // var allNotifList = wx.getStorageSync('notifs')
    // var unread = []
    // var read = []
    // for (var i = 0; i < allNotifList.length; i++) {
    //   if (!allNotifList[i].read) {
    //     unread.push(allNotifList[i])
    //   }
    //   else {
    //     read.push(allNotifList[i])
    //   }
    // }

    this.setData({
      unreadNotifList : this.addRelativeTime(app.unreadNotifList),
      readNotifList : this.addRelativeTime(wx.getStorageSync('notifs')),
    })
    var unreadIds = []
    for (var i = 0; i < this.data.unreadNotifList.length; i++) {
      unreadIds.push(this.data.unreadNotifList[i].id)
    }

    interact.setNotifsRead(unreadIds).then(
      (res) => {
        console.log("已将", unreadIds, "设为已读")
        var oldNotifs = wx.getStorageSync('notifs')
        console.log('notifs from storage', oldNotifs)
        var newNotifs = oldNotifs.concat(app.unreadNotifList)
        console.log('new notifs', newNotifs)
        wx.setStorageSync('notifs', newNotifs)
        app.unreadNotifList = []
      }
    )
    

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