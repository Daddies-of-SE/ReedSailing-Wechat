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
            avatar: "/icon/sample.png",
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
      hasActInfo: false,
      showIndex: 0,
      userId: -1,
      hasJoined: false,
      isManager: false,
      isOwner: false,
      comment_list: [],
    //   comment_list : [
    //     {
    //       user : {
    //         avator : '/icon/sample.png',
    //         name : 'yy',
    //       },
    //       publish_time : '10分钟前',
    //       content : 'yy yydfive',
    //       score : 5,

    //     },
    //     {
    //       user : {
    //         avator : '/icon/sample.png',
    //         name : 'yy',
    //       },
    //       publish_time : '30分钟前',
    //       content : 'yy tcl',
    //       score : 3.5,

    //     }
    //   ],

      likeUrl : "/icon/like.png"
    },

    goCreateComment: function() {
      // util.debug('tap a tap!')
      wx.navigateTo({
        url: `./new-comment/new-comment?actId=${this.data.actId}`,
      })
    },

    goEditComment: function(e) {
      var commentId = e.currentTarget.dataset.commentId
      // util.debug('edited comment id is '+commentId)
      wx.navigateTo({
        url: `./new-comment/new-comment?actId=${this.data.actId}&commentId=${commentId}`,
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

    like: function (options) {
      //TODO
      wx.request({
        url: 'url',
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          console.log(res) //控制台打印
          this.setData({
            //TODO: newurl for like
            likeUrl: "newUrl"
          })
        }
      })
    },
    
    // reply: function (options) {
    //   //TODO
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
      })

     
    },

    onShow: function() {
      interact.getActInfo(this.data.actId).then(
        (res) => {
          var r = res.data
          r.pub_time = util.getTimeMinute(r.pub_time)
          r.begin_time = util.getTimeMinute(r.begin_time)
          r.end_time = util.getTimeMinute(r.end_time)
          this.setData({
            actInfo: r
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
          for (var i = 0; i < res.data.length; i++) {
            score_sum += parseFloat(res.data[i].score)
          }
          this.setData({
            comment_list : res.data,
            avg_score : score_sum / res.data.length
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
    },

    //加入活动
    joinAct: function() {
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
    }
})