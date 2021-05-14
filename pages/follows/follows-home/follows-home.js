const app = getApp()
const util = require("../../../utils/util.js")
const interact = require("../../../utils/interact.js")

// pages/follows/follows-home/follows-home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        org_list : null,
        act_list : null,
        havelogin : false
    },

    onLoad: function (options) {
        /*应该从后端获取数据，这里手动设置数据，便于查看效果*/

        //TODO
        this.setData({
        //     org_list : [
        //         {
        //             org:{name: "高工足球队",
        //             avator: "/icon/gaogong_football.png",}
        //         },
        //         {
        //             org:{name: "高工学生会",
        //             avator: "/icon/gaogong_student_union.png",}
        //         },
        //         {
        //             org:{name: "高工足球队",
        //             avator: "/icon/gaogong_football.png",}
        //         },
        //         {
        //             org:{name: "高工学生会",
        //             avator: "/icon/gaogong_student_union.png",}
        //         },
        //         {
        //             org:{name: "高工足球队",
        //             avator: "/icon/gaogong_football.png",}
        //         },
        //         {
        //             org:{name: "高工学生会",
        //             avator: "/icon/gaogong_student_union.png",}
        //         },
        //     ], 

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

    toOrg(e) {
        wx.navigateTo({
            url: `../../sections/act-list/act-list?orgId=${e.currentTarget.dataset.orgid}`,
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
        if (app.haveRegistered()) {
            this.setData({
                havelogin : true
            })
        } 
        else {
            app.goCertificate()
            return
        }

        interact.getAllFollowOrgs().then(
            (res) => {
                this.setData({
                    org_list : res.data
                })
            }
        )
        interact.getFollowOrgActs().then(
            (res) => {
                var lst = []
                for (var i = 0; i < res.data.length; i++) {
                    var v = res.data[i]
                    v.pub_time = res.data[i].pub_time.split(".")[0].replace("T", " ")
                    v.begin_time = res.data[i].begin_time.replace("T", " ")
                    v.end_time = res.data[i].end_time.replace("T", " ")
                    v.relative_pub_time = util.getRelativeTime(v.pub_time)
                    lst.push(v)
                }
                
                this.setData({
                    act_list : lst
                })
            }
        )
    },


    callLogin: function (e) {
      if (!app.haveRegistered()) {
        const login = require("../../../utils/login.js")
        login.registerInfo().then(
            this.setData({
                havelogin: true,
            })
        )
      }
    },

    toActivity(e) {
        wx.navigateTo({
            url: `../../sections/act-detail/act-detail?actId=${e.currentTarget.dataset.actid}`,
        })
    },

    onShareAppMessage: function (res) {
        return {
          title: app.shareData.title,
          path: 'pages/index/recommend/recommend',
          imageUrl: app.shareData.imageUrl,
          success: function (res) {
            wx.showToast({
              title: '分享成功',
            })
          }
        }
    },
})