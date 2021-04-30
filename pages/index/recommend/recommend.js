const app = getApp()
const interact = require("../../../utils/interact.js")
const util = require("../../../utils/util.js")

// pages/index/recommend.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        havelogin : false,
        info : "",
        most_visited : null,
        org_list : null,
        msg_list : null,
    },

    onLoad: function (options) {
      const login = require("../../../utils/login.js")
      login.newLogin().then(
        (res) => {
          this.setData({
              havelogin : app.haveRegistered(),
              info : JSON.stringify(app.loginData.nickName)
          })
        }
      )
    //   util.debug(util.formatTime(new Date()))

      /*应该从后端获取数据，这里手动设置数据，便于查看效果*/
      this.setData({
            most_visited : [
                {
                    org:{name: "高工足球队",
                    avator: "/icon/gaogong_football.png",}
                },
                {
                    org:{name: "高工学生会",
                    avator: "/icon/gaogong_student_union.png",}
                },
                {
                    org:{name: "点赞互助",
                    avator: "/icon/like.png",}
                },
                {
                    org:{name: "环境协会",
                    avator: "/icon/planet.png",}
                },
                {
                    org:{name: "软工2021",
                    avator: "/icon/sample.png",}
                },
               
            ], 

            msg_list : [
                {
                    type : "activity",
                    org_name : "高工足球队",
                    avatorUrl: "/icon/gaogong_football.png",
                    act_title : "常规训练",
                    publish_time : "3小时前",
                    start_time : "2021-04-18 15:00",
                    end_time : "2021-04-18 17:30",
                    act_place : "小足球场",
                    body : "进行常规的足球训练，包括传球盘带练习，以及五人制对抗赛。",

                },
                {
                    type : "activity",
                    org_name : "高工学生会",
                    avatorUrl: "/icon/gaogong_student_union.png",
                    act_title : "大班会",
                    publish_time : "10小时前",
                    start_time : "2021-04-14 14:30",
                    end_time : "2021-04-14 16:30",
                    act_place : "教（一） 307",
                    body : "阿巴阿巴",
                },
            ]

        })
    },

    onShow: function (e) {
      if (app.haveRegistered()) {
          this.setData({
              havelogin : true,
              info : JSON.stringify(app.loginData.nickName)
          })
      }
    },

    callLogin: function (e) {
      if (!app.haveRegistered()) {
        const login = require("../../../utils/login.js")
        login.registerInfo().then(
            this.setData({
                havelogin: true,
                info : JSON.stringify(app.loginData.nickName)
            })
        )
      }
    },

    debugFunc: function(e) {
      //For debugging
      // interact.getUserControlOrgs(1)
      // wx.navigateTo({
      //   url: '../../sections/act-detail/act-detail',
      // })
    }

})