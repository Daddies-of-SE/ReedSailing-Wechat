// pages/sections/act-detail/act-detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      isRealAct : true,
      actName: "actName",
      actInfo: {
        organizer : "高工足球队",
        start_time : "2021-04-21 08:00",
        end_time : "2021-04-21 10:00",
        location : "学院路足球场",
        description : "高工男足将被六系女足暴打，欢迎大家前来捧场",
        joinedNum : 99,
        capacity : 100,
      },
      hasActInfo: false,
      showIndex: 0,
      hasJoined: false,
      comment_list : [],
      likeUrl : "/icon/like.png"
    },

    like: function (options) {
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
    
    reply: function (options) {
      wx.request({
        url: 'url',
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          console.log(res) //控制台打印
          this.setData({
            
          })
        }
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.request({
          url: 'url',
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            console.log(res) //控制台打印
            this.setData({
              actName: res.actName,
              actInfo: res.actInfo,
              hasActInfo: True
            })
          }
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

    }
})