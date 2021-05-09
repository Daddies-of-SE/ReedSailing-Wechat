// pages/my/my-act/my-act.js
const interact = require("../../../utils/interact.js")
const util = require("../../../utils/util")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 'unstart',
        unstartActList : [],
        curActList : [],
        endActList : []
    },

    handleChange ({ detail }) {
        this.setData({
            current: detail.key
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    onShow: function (options) {
        if (!getApp().haveRegistered()) {
            wx.navigateBack({
                delta: 0,
              })
            getApp().goCertificate()
            return
        }
        interact.getStatusManageActs('unstart').then(
            res1 => {
                this.setData({
                    unstartActList : res1.data
                })
        })
        interact.getStatusManageActs('cur').then(
            res2 => {
                this.setData({
                    curActList : res2.data
                })
        })
        interact.getStatusManageActs('end').then(
            res3 => {
                this.setData({
                    endActList : res3.data
                })
        })
    },

    goAct: function(e) {
        wx.navigateTo({
            url: `../../sections/act-detail/act-detail?actId=${e.currentTarget.dataset.actid}`,
        })
    },

})