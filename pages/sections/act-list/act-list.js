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
        orgId : -1,
        hasOrgInfo: false,
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
      var orgId =options.orgId
      this.setData({
        orgId : orgId
      })
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
              create_time : res.data.create_time.split("T")[0],
              belong_forum : res.data.block
            }
          })
          if (res.data.avatar != null) {
            this.setData({
              orgPicUrl : res.data.avatar,
            })
          }
        }
      )

      interact.getUserOrgRelation(orgId).then(
        (res) => {
          this.setData({
            hasFollowed : res.data.isFollower,
            isManager : res.data.isManager,
            isOwner : res.data.isOwner
          })
        }
      )
      
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
                  unstartActList : res3.data
              })
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
        url: `../org-detail/org-detail?orgId=${this.data.orgId}`,
      })
    },
  
    editMemList: function() {
      wx.navigateTo({
        url: '../act-list/mem-list/mem-list',
      })
    },

    goNewAct: function() {
      if (this.data.orgId == -1) {
        
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
})