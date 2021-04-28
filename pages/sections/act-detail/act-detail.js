// pages/sections/act-detail/act-detail.js
const interact = require("../../../utils/interact.js")
const util = require("../../../utils/util.js")

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
      actInfo : {
        id : -1,
        owner: {
            id: 5,
            name: "dd",
            avatar: "111",
            email: "1111@qq.com",
            sign: ""
        },
        name: "活动1",
        begin_time: "2021-04-16T14:19:18",
        end_time: "2021-04-16T14:19:18",
        pub_time: "2021-04-19T14:31:05.291480",
        currentNumPeople : -1,
        contain: 100,
        description: "这个是活动描述",
        review: false,
        type: {
            id: 1,
            name: "讲座"
        },
        org: null,
        location: {
            id: 1,
            name: "篮球场",
            longitude: "123.123000",
            latitude: "123.123000"
        },
        block: {
            id: 1,
            name: "博雅"
        }
      },
      hasActInfo: false,
      showIndex: 0,
      hasJoined: false,
      isManager: false,
      isOwner: false,
      comment_list : [
        {
          user : {
            avator : '/icon/sample.png',
            name : 'yy',
          },
          publish_time : '10分钟前',
          content : 'yy yydfive',
          rate : 5,

        },
        {
          user : {
            avator : '/icon/sample.png',
            name : 'yy',
          },
          publish_time : '30分钟前',
          content : 'yy tcl',
          rate : 3.5,

        }
      ],
      likeUrl : "/icon/like.png"
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
        actId: options.actId
      })

      interact.getActInfo(options.actId).then(
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

      interact.getActNumPeople(options.actId).then(
        (res) => {
          this.setData({
            currentNumPeople : res.data.number
          })
        }
      )

      // interact.getActComments(options.actId).then(
      //   (res) => {
      //     this.setData({
      //       comment_list : res.data
      //     })
      //   }
      // )

      interact.getUserActRelation(options.actId).then(
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
        url: `../../my/new-act/new-act?actId=${this.data.actInfo.id}`
      })
    },

    createComment() {
      //TODO
    }
})