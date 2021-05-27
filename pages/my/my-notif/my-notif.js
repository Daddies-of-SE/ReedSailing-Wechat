// pages/my/my-notif/my-notif.js

const util = require("../../../utils/util.js")
const interact = require("../../../utils/interact.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allNotifList : [],
    unreadNotifList : [],
    readNotifList: [],
    showIndex: [true, false],
    actions : [
      {
        name : '查看',
        color : '#80848f',
        fontsize : '20',
        width : 100,
        // icon : 'delete',
      },
      {
        name : '移除',
        color : '#fff',
        fontsize : '20',
        width : 100,
        icon : 'delete',
        background : '#ed3f14'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  addRelaTimeAndSort(notifList) {
    if (typeof(notifList) == 'string') {
      return []
    }
    for (var i = 0; i < notifList.length; i++) {
      notifList[i].relative_time = util.getRelativeTime(notifList[i].time)
    }
    var newList = notifList.sort(util.compare('id')).reverse()
    var ret = []
    for (var i = 0; i < newList.length - 1; i++) {
      if (newList[i].id != newList[i+1].id) {
        ret.push(newList[i])
      }
    }
    if (newList.length > 0) {
      ret.push(newList[newList.length - 1])
    }
    return ret
  },

  updateNotifList() {
    this.setData({
      unreadNotifList : this.addRelaTimeAndSort(app.unreadNotifList),
      readNotifList : this.addRelaTimeAndSort(wx.getStorageSync('notifs')),
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('onshow old notifs', wx.getStorageSync('notifs'))
    this.updateNotifList()
    console.log('read notifs', this.data.readNotifList)
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

  readAll(e) {
    console.log("readAll called")
    var unreadIds = []
    for (var i = 0; i < this.data.unreadNotifList.length; i++) {
      unreadIds.push(this.data.unreadNotifList[i].id)
    }

    interact.setNotifsRead(unreadIds).then(
      (res) => {
        console.log("将", unreadIds, "设为已读")
        var oldNotifs = wx.getStorageSync('notifs')
        console.log('notifs from storage', typeof(oldNotifs), oldNotifs)
        var newNotifs = oldNotifs ? app.unreadNotifList.concat(oldNotifs) : app.unreadNotifList
        console.log('new notifs', typeof(newNotifs), newNotifs)
        wx.setStorageSync('notifs', newNotifs)
        app.unreadNotifList = []
        this.updateNotifList()
        wx.showToast({
          title: '操作成功',
        })
      }
    )
  },

  goActOrOrg(e) {
    var dataset = e.currentTarget.dataset
    interact.setNotifsRead([dataset.idd], dataset.read).then(
      (res) => {
        console.log('item', dataset.item)
        console.log("将", dataset.idd, "设为已读")
        var oldNotifs = wx.getStorageSync('notifs')
        console.log('notifs from storage', oldNotifs)
        var newNotifs = oldNotifs ? [dataset.item].concat(oldNotifs) : [dataset.item]
        console.log('new notifs', newNotifs)
        wx.setStorageSync('notifs', newNotifs)
        
        var newUnread = []
        for (var i = 0; i < app.unreadNotifList.length; i++) {
          if (app.unreadNotifList[i].id != dataset.idd) {
            newUnread.push(app.unreadNotifList[i])
          }
        }
        app.unreadNotifList = newUnread
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
        else {
          this.updateNotifList()
        }
      }
    )
    
  }
})