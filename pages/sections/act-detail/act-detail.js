// pages/sections/act-detail/act-detail.js
const interact = require("../../../utils/interact.js")
const util = require("../../../utils/util.js")
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
      // isRealAct : true,
      // actName: "actName",
      // actInfo: {
      //   organizer : "高工足球队",
      //   start_time : "2021-04-21 08:00",
      //   end_time : "2021-04-21 10:00",
      //   location : "学院路足球场",
      //   description : "高工男足将被六系女足暴打，欢迎大家前来捧场",
      //   joinedNum : 99,
      //   capacity : 100,
      // },
      actId : -1,
      avg_score : 0,
      actInfo : {
        id : -1,
        owner: {
            id: 5,
            name: "dd",
            avatar: "/icon/person.png",
            email: "1111@qq.com",
            sign: ""
        },
        name: "加载中",
        begin_time: "2021-04-16T14:19:18",
        end_time: "2021-04-16T14:19:18",
        pub_time: "2021-04-19T14:31:05.291480",
        currentNumPeople : -1,
        contain: 100,
        description: "加载中",
        review: false,
        type: {
            id: 1,
            name: "讲座"
        },
        org: null,
        location: {
            id: 1,
            name: "加载中",
            longitude: "123.123000",
            latitude: "123.123000"
        },
        block: {
            id: 1,
            name: "加载中"
        }
      },
      hasBegun : false,
      hasEnded : false,
      showIndex: 0,
      userId: -1,
      hasJoined: false,
      isManager: false,
      isOwner: false,
      comment_list: [],
      longitude: 116,
      latitude : 40,
      markers : [],
      qrcode : "",
      showQRCode : false,
      showMap : false,
    //   comment_list : [
    //     {
    //       user : {
    //         avatar : '/icon/sample.png',
    //         name : 'yy',
    //       },
    //       publish_time : '10分钟前',
    //       content : 'yy yydfive',
    //       score : 5,

    //     },
    //     {
    //       user : {
    //         avatar : '/icon/sample.png',
    //         name : 'yy',
    //       },
    //       publish_time : '30分钟前',
    //       content : 'yy tcl',
    //       score : 3.5,

    //     }
    //   ],

      // likeUrl : "/icon/like.png"
    },

    goCreateComment: function() {
      if (!getApp().haveRegistered()) {
        getApp().goCertificate()
        return
      }
      // if (!this.data.hasBegun) {
      //   wx.showToast({
      //     title: '活动尚未开始，不能评论',
      //     icon: 'none'
      //   })
      //   return
      // }
      // util.debug('tap a tap!')
      wx.navigateTo({
        url: `./new-comment/new-comment?actId=${this.data.actId}&begin=${this.data.hasBegun}`,
      })
    },

    goEditComment: function(e) {
      var commentId = e.currentTarget.dataset.commentId
      // util.debug('edited comment id is '+commentId)
      wx.navigateTo({
        url: `./new-comment/new-comment?actId=${this.data.actId}&commentId=${commentId}&begin=${this.data.hasBegun}`,
      })
    },

    delComment: function(e) {
      var that = this
      var commentId = e.currentTarget.dataset.commentId
      wx.showModal({
        title: '确定删除评论?',
        success: function(res) {
          if (res.confirm) {
            interact.deleteComment(commentId).then(
              (res) => {
                wx.showToast({
                  title: '删除成功',
                })
                that.onShow()
              }
            )
          } 
        }
      })
    },

    // like: function (options) {
    //   wx.request({
    //     url: 'url',
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     success: res => {
    //       console.log(res) //控制台打印
    //       this.setData({
    //         likeUrl: "newUrl"
    //       })
    //     }
    //   })
    // },
    
    // reply: function (options) {
    //   wx.request({
    //     url: 'url',
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     success: res => {
    //       console.log(res) //控制台打印
    //       this.setData({
            
    //       })
    //     }
    //   })
    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        actId: options.actId,
        userId: app.loginData.userId,
        longitude: app.buaaLocation.longitude,
        latitude: app.buaaLocation.latitude
      })
    },

    onShow: function() {
      getApp().globalLogin().then(
        (res0) =>{
          interact.getActInfo(this.data.actId).then(
            (res) => {
              var r = res.data
              r.pub_time = util.getTimeMinute(r.pub_time)
              r.begin_time = util.getTimeMinute(r.begin_time)
              r.end_time = util.getTimeMinute(r.end_time)
              var begin_time = new Date(Date.parse(r.begin_time))
              var end_time = new Date(Date.parse(r.end_time))
              if (begin_time < new Date()) {
                this.setData({
                  hasBegun : true
                })
              }
              if (end_time < new Date()) { 
                this.setData({
                  hasEnded : true
                })
              }
              this.setData({
                actInfo: r,
                pub_time : util.getRelativeTime(r.pub_time),
                latitude: r.location.latitude,
                longitude: r.location.longitude,
                markers : [{
                  id: 1,
                  latitude: r.location.latitude,
                  longitude: r.location.longitude,
                  width: "30",  
                  height: "45",
                  name: r.name
                }]
              })
            }
          )

          interact.getActNumPeople(this.data.actId).then(
            (res) => {
              this.setData({
                currentNumPeople : res.data.number
              })
            }
          )

          interact.getActComments(this.data.actId).then(
            (res) => {
              var score_sum = 0
              var total_rates = 0
              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].score == 0) {
                  continue
                }
                score_sum += parseFloat(res.data[i].score)
                total_rates += 1
              }
              this.setData({
                comment_list : res.data,
                avg_score : score_sum / total_rates
              })
            }
          )

          interact.getUserActRelation(this.data.actId).then(
            (res) => {
              this.setData({
                hasJoined : res.data.hasJoined,
                isOwner: res.data.isOwner,
                isManager : res.data.isManager
              })
            }
          )
            
          
        })
    },

    //加入活动
    joinAct: function() {
      if (!getApp().haveRegistered()) {
        getApp().goCertificate()
        return
      }
      if (this.data.hasEnded) {
        wx.showToast({
          title: '活动已结束，不能报名',
          icon: 'none'
        })
        return
      }
      interact.joinAct(this.data.actId).then(
        (res) => {
          wx.showToast({
            title: '报名成功',
          })
          this.setData({
            hasJoined : true
          })
          interact.getActNumPeople(this.data.actId).then(
            (res) => {
              this.setData({
                currentNumPeople : res.data.number
              })
            }
          )
        }
      )
    },

    exitAct: function() {
      if (this.data.hasEnded) {
        wx.showToast({
          title: '活动已结束，不能退出报名',
          icon: 'none'
        })
        return
      }
      interact.exitAct(this.data.actId).then(
        (res) => {
          wx.showToast({
            title: '已取消报名',
          })
          this.setData({
            hasJoined : false
          })
          interact.getActNumPeople(this.data.actId).then(
            (res) => {
              this.setData({
                currentNumPeople : res.data.number
              })
            }
          )
        }
      )
    },

    editAct() {
      wx.navigateTo({
        url: `../../my/new-act/new-act?actId=${this.data.actId}`
      })
    },

    goParticipants() {
      wx.navigateTo({
        url: `./participants/participants?actId=${this.data.actId}`,
      })
    },

    deleteAct() {
      var that = this
      wx.showModal({
        title : '确认删除活动？',
        content : that.data.actInfo.name,
        success: function(res) {
          if (res.cancel) {
  
          } else {
            interact.deleteAct(that.data.actId).then(
              res2 => {
                wx.navigateBack({
                  delta: 0,
                })
                wx.showToast({
                  title: '删除成功',
                })
              }
            )
          }
        }
      })
    },

    onShareAppMessage: function (res) {
      return {
        title: this.data.actInfo.name + " — 一苇以航",
        path: `pages/sections/act-detail/act-detail?actId=${this.data.actId}`,
        imageUrl: this.data.actInfo.avatar ? this.data.actInfo.avatar : app.shareData.imageUrl,
        success: function (res) {
          wx.showToast({
            title: '分享成功',
          })
        }
      }
    },

    goOrg: function () {
      wx.navigateTo({
        url: `../act-list/act-list?orgId=${this.data.actInfo.org.id}`,
      })
    },

    goBlock: function () {
      var forumId = this.data.actInfo.block.id
      if (forumId == 2) {
        wx.navigateTo({
          url: `../act-list/act-list?orgId=-1`,
        })
      }
      else if (forumId == 5) {
        wx.navigateTo({
          url: `../act-list/act-list?orgId=-2`,
        })
      }
      else {
        wx.navigateTo({
          url: `../org-list/org-list?forumId=${forumId}&forumName=${forumId == 1 ? "社团" : forumId == 3 ? "学生会" : "志愿"}`,
        })
      }
    },

    goOwner: function () {
      if (this.data.actInfo.org) {
        wx.navigateTo({
          url: `../act-list/act-list?orgId=${this.data.actInfo.org.id}`,
        })
      } 
      else {
        wx.navigateTo({
          url: `../user-info/user-info?userId=${this.data.actInfo.owner.id}`,
        })
      }
    },

    empty() {
      //用来捕获tap事件，不能删
    },

    bindQRCodeButton() {
      this.setData({
        showQRCode : !this.data.showQRCode
      })
      if (this.data.showQRCode && this.data.qrcode == "") {
        wx.showToast({
          title: '正在生成二维码',
          icon: 'loading'
        })
        interact.getPageQRCode(`pages/sections/act-detail/act-detail?actId=${this.data.actId}`).then(
          res => {
            wx.hideToast()
            this.setData({
              qrcode : res.data.img
            })
          }
        )
      }
    },

    bindMapButton() {
      this.setData({
        showMap : !this.data.showMap
      })
    },
})