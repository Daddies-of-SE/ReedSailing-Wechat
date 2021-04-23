const util = require("../../../utils/util")
const app = getApp();
const interact = require("../../../utils/interact.js")

Page({
 
    /**
     * 页面的初始数据
     */
    data: {
        winWidth:0,
        winHeight:0,
        currentTab:0,
        havelogin: false,

        forum_list: [
            // TODO： 暂时先随便放个图标，之后需更换为符合主题的图标
            {
                id : 0,
                title : "社团",
                hasOrgLevel: true,
                picUrl : "/icon/club.png",
            
            },
            {
                id : 1,
                title : "博雅",
                hasOrgLevel: false,
                picUrl : "/icon/boya.png",
            },
            {
                id : 2,
                title : "学生会",
                hasOrgLevel: true,
                picUrl : "/icon/student_union.png",
            },
            {
                id : 3,
                title : "志愿",
                hasOrgLevel: true,
                picUrl : "/icon/volunteer.png",
            },
            {
                id : 4,
                title : "个人",
                hasOrgLevel: false,
                picUrl : "/icon/person_forum.png",
            },

        ],
        
    },
 
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            havelogin : app.haveRegistered()
        })
        // interact.createBlock("社团")
        // interact.createBlock("博雅")
        // interact.createBlock("学生会")
        // interact.createBlock("志愿")
        // interact.createBlock("个人")
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

    },

    handleClick: function(e) {

        if (e.currentTarget.dataset.hasOrg) {
            wx.navigateTo({
                url: `../org-list/org-list?forumId=${e.currentTarget.dataset.forumid+1}&forumName=${e.currentTarget.dataset.name}`,
              })
        } else {
            if (e.currentTarget.dataset.name == "博雅") {
                wx.navigateTo({
                  url: `../act-list/act-list?orgId=-1`,
                })
            }
            else {
                wx.navigateTo({
                    url: `../act-list/act-list?orgId=-2`,
                })
            }
        }
        
    },

    onShow: function (e) {
        if (app.haveRegistered()) {
            this.setData({
                havelogin : true
            })
        }
      },

    callLogin: function (e) {
        if (!app.haveRegistered()) {
            const login = require("../../../utils/login.js")
            login.registerInfo().then(
                this.setData({
                    havelogin: true
                })
            )
        }
    },
})
