const interact = require("../../../utils/interact.js")
const app = getApp()

// pages/my/new-org/new-org.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        forum_array: [],
        index1 : 0,
        inputName : "",
        inputDescription : ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.forumId) {
            var id = options.forumId
            this.setData({
                index1 : id == 1 ? 0 : id == 3? 1 : id == 4 ? 2 : -1
            })
        }
    },

    onShow: function () {
        this.setData({
            forum_array : [app.forumList[0],app.forumList[2],app.forumList[3]]
        })
    },

    inputNameHandler: function (e) {
        this.data.inputName = e.detail.detail.value
    },

    inputDescriptionHandler: function (e) {
        this.data.inputDescription = e.detail.detail.value
    },

    submitOrg: function (e) {
        if (this.data.inputName == "") {
            wx.showToast({
              title: '名称不能为空',
              icon : "none"
            })
            return
        }
        interact.createOrgApplication(this.data.inputName, this.data.inputDescription, this.data.forum_array[this.data.index1].id).then(
            (res) => {
                wx.navigateBack({
                    delta: 0,
                })
                wx.showToast({
                    title: '申请已提交',
                    icon : 'success'
                })
        })
    },

    bindPicker_1_Change: function(e) {
        this.setData({
            index1: e.detail.value
        })
    },
})