// pages/follows/follows-home/follows-home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        most_visited : null,
        org_list : null,
        msg_list : null,


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        /*应该从后端获取数据，这里手动设置数据，便于查看效果*/
        this.setData({
            most_visited : [
                {
                    name: "高工足球队",
                    avatorUrl: "/icon/sample.png",
                },
                {
                    name: "高工学生会",
                    avatorUrl: "/icon/sample.png",
                },
            ],

            msg_list : [
                {
                    type : "activity",
                    org_name : "高工足球队",
                    avatorUrl: "/icon/sample.png",
                    act_title : "常规训练",
                    publish_time : "3小时前",
                    act_time : "2021-04-18 15:00 星期天",
                    act_place : "小足球场",
                    body : "进行常规的足球训练，包括传球盘带练习，以及五人制对抗赛。",

                },
                {
                    type : "activity",
                    org_name : "高工学生会",
                    avatorUrl: "/icon/sample.png",
                    act_title : "大班会",
                    publish_time : "10小时前",
                    act_time : "2021-04-14 14:30 星期天",
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

    }
})