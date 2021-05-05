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
        org_list : null,
        act_list : null,
    },

    onLoad: function (options) {
      const login = require("../../../utils/login.js")
      // login.registerInfo().then(
      //   util.debug("asdasdas")
      // )

      login.newLogin().then(
        (res) => {
          this.setData({
              havelogin : app.haveRegistered(),
              info : JSON.stringify(app.loginData.nickName)
          })
          interact.getRecommendOrgs().then(
            (res) => {
                this.setData({
                  org_list : res.data.slice(0,10)
                })
            }
        )
  
        interact.getRecommendActs().then(
          (res) => {
              var lst = []
              for (var i = 0; i < 10; i++) {
                  var v = res.data[i]
                  v.pub_time = res.data[i].pub_time.split(".")[0].replace("T", " ")
                  v.begin_time = res.data[i].begin_time.replace("T", " ")
                  v.end_time = res.data[i].end_time.replace("T", " ")
                  lst.push(v)
              }
              
              this.setData({
                act_list : lst
              })
          })
        }
      )

      /*应该从后端获取数据，这里手动设置数据，便于查看效果*/
      this.setData({
            org_list : [
                // {
                //     org:{name: "高工足球队",
                //     avator: "/icon/gaogong_football.png",}
                // },
                // {
                //     org:{name: "高工学生会",
                //     avator: "/icon/gaogong_student_union.png",}
                // },
                // {
                //     org:{name: "点赞互助",
                //     avator: "/icon/like.png",}
                // },
                // {
                //     org:{name: "环境协会",
                //     avator: "/icon/planet.png",}
                // },
                // {
                //     org:{name: "软工2021",
                //     avator: "/icon/sample.png",}
                // },
               
            ], 

            act_list : [
                // {
                //     type : "activity",
                //     org_name : "高工足球队",
                //     avatorUrl: "/icon/gaogong_football.png",
                //     act_title : "常规训练",
                //     publish_time : "3小时前",
                //     start_time : "2021-04-18 15:00",
                //     end_time : "2021-04-18 17:30",
                //     act_place : "小足球场",
                //     body : "进行常规的足球训练，包括传球盘带练习，以及五人制对抗赛。",

                // },
                // {
                //     type : "activity",
                //     org_name : "高工学生会",
                //     avatorUrl: "/icon/gaogong_student_union.png",
                //     act_title : "大班会",
                //     publish_time : "10小时前",
                //     start_time : "2021-04-14 14:30",
                //     end_time : "2021-04-14 16:30",
                //     act_place : "教（一） 307",
                //     body : "阿巴阿巴",
                // },
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

    
    toOrg(e) {
        wx.navigateTo({
          url: `../../sections/act-list/act-list?orgId=${e.currentTarget.dataset.orgid}`,
        })
    },

    toActivity(e) {
      wx.navigateTo({
        url: `../../sections/act-detail/act-detail?actId=${e.currentTarget.dataset.actid}`,
      })
    }
})