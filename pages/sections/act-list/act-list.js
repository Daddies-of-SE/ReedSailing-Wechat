// pages/sections/org-edit/org-edit.js

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
        orgPicUrl: "/icon/person.png",
        orgInfo: {},
        orgId : -1,
        showIndex: [true, true, true, true, false],
        hasFollowed: false,
        isManager : false,
        isOwner : false,
        belongForumId: -1,
        memList: [],
        unstartActList : [],
        curActList : [],
        endActList : []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        orgId : options.orgId,
      })
    },

    onShow: function () {
      interact.getStatusOrgActs('unstart', this.data.orgId).then(
        res1 => {
            this.setData({
                unstartActList : res1.data
            })
      })
      interact.getStatusOrgActs('cur', this.data.orgId).then(
          res2 => {
              this.setData({
                  curActList : res2.data
              })
      })
      interact.getStatusOrgActs('end', this.data.orgId).then(
          res3 => {
              this.setData({
                  endActList : res3.data
              })
      })

      if (this.data.orgId == -1) {
        this.setData({
          orgName: "博雅活动列表",
          orgPicUrl : "/icon/boya.png",
          isRealOrg : false
        })
        return
      }
      else if (this.data.orgId == -2) {
        this.setData({
          orgName: "个人活动列表",
          orgPicUrl : "/icon/person.png",
          isRealOrg : false
        })
        return
      }
      // 非个人活动列表和博雅活动列表
      interact.getOrgInfo(this.data.orgId).then(
        (res) => {
          this.setData({
            orgName : res.data.name,
            orgInfo : {
              description : res.data.description,
              create_time : res.data.create_time.split("T")[0],
              belong_forum : res.data.block,
              avatar : res.data.avatar,
              owner: res.data.owner
            }
          })
          if (res.data.avatar != null) {
            this.setData({
              orgPicUrl : res.data.avatar,
            })
          }
        }
      )

      interact.getUserOrgRelation(this.data.orgId).then(
        (res) => {
          this.setData({
            hasFollowed : res.data.isFollower,
            isManager : res.data.isManager,
            isOwner : res.data.isOwner
          })
        }
      )

      interact.getOrgAdmins(this.data.orgId).then(
        (res) => {
          this.setData({
            memList: res.data
          })
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

    //关注页面
    followOrg: function() {
      interact.followOrg(this.data.orgId).then(
        (res) => {
          wx.showToast({
            title: '关注成功',
          })
          this.setData({
            hasFollowed : true
          })
        }
      )
    },

    unFollowOrg: function() {
      interact.unFollowOrg(this.data.orgId).then(
        (res) => {
          wx.showToast({
            title: '已取消关注',
          })
          this.setData({
            hasFollowed : false
          })
        }
      )
    },
  
    editOrgInfo: function() {
      wx.navigateTo({
        url: `../org-edit/org-edit?orgId=${this.data.orgId}`,
      })
    },
  
    editMemList: function() {
      wx.navigateTo({
        url: `../act-list/mem-list/mem-list?orgId=${this.data.orgId}`,
      })
    },

    goNewAct: function() {
      if (this.data.orgId == -1) {
        console.log("无事发生")
      }
      else if (this.data.orgId == -2) {
        //发布个人活动
        wx.navigateTo({
          url: `../../my/new-act/new-act`,
        })
      }
      else  {
        wx.navigateTo({
          url: `../../my/new-act/new-act?orgId=${this.data.orgId}&orgName=${this.data.orgName}&forumId=${this.data.orgInfo.belong_forum.id}`,
        })
      }
    },

    goAct: function(e) {
      wx.navigateTo({
          url: `../../sections/act-detail/act-detail?actId=${e.currentTarget.dataset.actid}`,
      })
    },

    onShareAppMessage: function (res) {
      return {
        title: this.data.orgName + " — 一苇以航",
        path: `pages/sections/act-list/act-list?orgId=${this.data.orgId}`,
        imageUrl: this.data.orgId == -1 ? app.forumList[1].picUrl : 
                  this.data.orgId == -2 ? app.forumList[4].picUrl : 
                  this.data.orgInfo.avatar ? this.data.orgInfo.avatar : 
                  app.shareData.imageUrl,
        success: function (res) {
          wx.showToast({
            title: '分享成功',
          })
        }
      }
    },
})