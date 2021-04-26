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
        //TODO : change to createOrgApplication
        interact.createOrgDirectly(this.data.inputName, this.data.inputDescription, this.data.forum_array[this.data.index1].id).then(
            (res) => {
            interact.addOrgManager(res.data.id, app.loginData.userId).then(
                wx.showToast({
                    title: '提交成功',
                    icon : 'success'
                  })
            )
        })
    },

    bindPicker_1_Change: function(e) {
        this.setData({
            index1: e.detail.value
        })
    },
})