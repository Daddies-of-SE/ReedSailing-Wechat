// pages/my/my-act/my-act.js
const interact = require("../../../utils/interact.js")
const util = require("../../../utils/util")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 'tab1',
        ungoingActList : [],
        goingActList : [],
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
        interact.getMyActList().then(
            (res) => {
                //TODO: 区分已进行和未进行
                this.setData({
                    ungoingActList : res.data
                })
                util.debug(JSON.stringify(res.data))
            }
        )
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