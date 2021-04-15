const app = getApp()

// pages/follows/follows-home/follows-home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        most_visited : null,
        org_list : null,
        msg_list : null,


        havelogin : false
    },

    onLoad: function (options) {
        /*应该从后端获取数据，这里手动设置数据，便于查看效果*/
        this.setData({
            most_visited : [
                {
                    name: "高工足球队",
                    avatorUrl: "/icon/gaogong_football.png",
                },
                {
                    name: "高工学生会",
                    avatorUrl: "/icon/gaogong_student_union.png",
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

      this.setData({
          havelogin : app.haveLogin()
      })
    },

    onShow: function (e) {
      if (app.haveLogin()) {
          this.setData({
              havelogin : true
          })
      }
    },

    callLogin: function (e) {
      if (!app.haveLogin()) {
        const login = require("../../../utils/login.js")
        login.getCodeLogin().then(
          (res) => {
              if (app.haveLogin()) {
                  this.setData({
                      havelogin : true
                  })
              }
          }
        )
      }
    }

})