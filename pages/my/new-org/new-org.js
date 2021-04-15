const interact = require("../../../utils/interact.js")
const app = getApp()

// pages/my/new-org/new-org.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputName : "",
        inputDescription : ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    inputNameHandler: function (e) {
        this.data.inputName = e.detail.value
    },

    inputDescriptionHandler: function (e) {
        this.data.inputDescription = e.detail.value
    },

    submitOrg: function (e) {
        interact.createOrg(this.data.inputName, this.data.inputDescription, app.globalData.currentForumID).then(
            (res) => {
            wx.showToast({
              title: '组织创建成功',
              icon : 'success'
            })
        })
    }
})