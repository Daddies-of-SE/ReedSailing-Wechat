// pages/my/my-act/my-act.js
const interact = require("../../../utils/interact.js")
const util = require("../../../utils/util")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 'tab1',
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
        interact.getUnstartManageActs().then(
            (res1) => {
                interact.getCurManageActs().then(
                    (res2) => {
                        interact.getEndManageActs().then(
                            (res3) => {
                                this.setData({
                                    unstartActList : res1.data,
                                    curActList : res2.data,
                                    endActList : res3.data
                                })
                            }
                        )
                    }
                )
            }
        )
    },

    goAct: function(e) {
        wx.navigateTo({
        url: `../../sections/act-detail/act-detail?actId=${e.currentTarget.dataset.actid}`,
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