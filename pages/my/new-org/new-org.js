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
        inputDescription : "",
        show : false
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
        // if (!getApp().haveRegistered()) {
        //     getApp().goCertificate()
        //     return
        // }
        this.setData({
            forum_array : [app.forumList[0],app.forumList[2],app.forumList[3]],
            show : getApp().show
        })
    },

    inputNameHandler: function (e) {
        this.data.inputName = e.detail.detail.value
    },

    inputDescriptionHandler: function (e) {
        this.data.inputDescription = e.detail.detail.value
    },

    submitOrg: function (e) {
        if (this.data.inputName.trim() == "") {
            wx.showToast({
              title: '名称不能为空',
              icon : "none"
            })
            return
        }
        if (this.data.inputDescription.trim() == "") {
            wx.showToast({
              title: '申请理由不能为空',
              icon : "none"
            })
            return
        }
        interact.createOrgApplication(this.data.inputName, this.data.inputDescription, this.data.forum_array[this.data.index1].id).then(
            (res) => {
                wx.showToast({
                    title: '申请提交成功，请等待审核',
                    icon: 'none'
                  })
                setTimeout(function () {
                    wx.navigateBack({
                        delta: 0,
                    })
                }, 1500)
        })
    },

    bindPicker_1_Change: function(e) {
        this.setData({
            index1: e.detail.value
        })
    },
})