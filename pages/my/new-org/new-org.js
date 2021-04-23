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
        //TODO: 增加版块选项
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    inputNameHandler: function (e) {
        this.data.inputName = e.detail
    },

    inputDescriptionHandler: function (e) {
        this.data.inputDescription = e.detail
    },

    submitOrg: function (e) {
        //TODO : change to createOrgApplication
        interact.createOrgDirectly(this.data.inputName, this.data.inputDescription, app.globalData.currentForumID).then(
            (res) => {
            interact.addOrgManager(res.data.id, app.loginData.userId).then(
                wx.showToast({
                    title: '提交成功',
                    icon : 'success'
                  })
            )
        })
    }
})