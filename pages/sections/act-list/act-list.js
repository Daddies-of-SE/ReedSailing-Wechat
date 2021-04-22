// pages/sections/org-detail/org-detail.js

const interact = require("../../../utils/interact.js")
const app = getApp()
const util = require("../../../utils/util.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isRealOrg : true,
        orgName: "",
        orgPicUrl: "/icon/sample.png",
        orgInfo: {
          create_time : "",
          description : ""
        },
        hasOrgInfo: false,
        showIndex: 0,
        hasFollowed: false,
        memList: [],
        actList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var orgId = app.globalData.currentOrgID
      if (orgId == -1) {
        this.setData({
          orgName: "博雅活动列表",
          orgPicUrl : "/icon/boya.png",
          isRealOrg : false
        })
        return
      }
      else if (orgId == -2) {
        this.setData({
          orgName: "个人活动列表",
          orgPicUrl : "/icon/person.png",
          isRealOrg : false
        })
        return
      }
      interact.getOrgInfo(orgId).then(
        (res) => {
          this.setData({
            orgName : res.data.name,
            orgInfo : {
              description : res.data.description,
              create_time : res.data.create_time.split("T")[0]
            }
          })
          if (res.data.avatar != null) {
            this.setData({
              orgPicUrl : res.data.avatar,
            })
          }
          if (app.userData.followOrgs.indexOf(orgId) != -1) {
            this.setData({
              hasFollowed : true
            })
            util.debug(this.data.hasFollowed + "   " + this.data.isRealOrg)
          }
        }
      )
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
      interact.followOrg(app.globalData.currentOrgID).then(
        (res) => {
          wx.showToast({
            title: '关注成功',
          })
          app.userData.followOrgs.push(app.globalData.currentOrgID)
          util.debug("当前关注组织：" + app.userData.followOrgs)
          this.setData({
            hasFollowed : true
          })
        }
      )
    },

    unFollowOrg: function() {
      interact.unFollowOrg(app.globalData.currentOrgID).then(
        (res) => {
          wx.showToast({
            title: '已取消关注',
          })
          app.userData.followOrgs.splice(app.userData.followOrgs.indexOf(app.globalData.currentOrgID))
          util.debug("当前关注组织：" + app.userData.followOrgs)
          this.setData({
            hasFollowed : false
          })
        }
      )
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