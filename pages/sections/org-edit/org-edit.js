// pages/sections/org-edit/org-edit.js

const interact = require("../../../utils/interact.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orgId : -1,
    inputName : "",
    inputDescription : "",
    orgPicUrl : "/icon/person.png"
  },

  //字数限制  
  // inputs: function (e) {
  //   // 获取输入框的内容
  //   var value = e.detail.value;
  //   // 获取输入框内容的长度
  //   var len = parseInt(value.length);

  //   //最多字数限制
  //   if(len > this.data.max) return;
  //       // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
  //       this.setData({
  //         currentWordNumber: len //当前字数  
  //       });
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orgId : options.orgId
    })
    interact.getOrgInfo(this.data.orgId).then(
      (res) => {
        this.setData({
          inputName : res.data.name,
          inputDescription : res.data.description
        })
        if (res.data.avatar && res.data.avatar != "") {
          this.setData({
            orgPicUrl : res.data.avatar,
          })
        }
      }
    )
  },

  onShow: function () {
    
  },

  inputNameHandler: function (e) {
    this.data.inputName = e.detail.detail.value
  },

  inputDescriptionHandler: function (e) {
      this.data.inputDescription = e.detail.detail.value
  },

  uploadPic: function (e) {
    interact.uploadOrgAvatar(this.data.orgId).then(
      (res) => {
        this.setData({
          orgPicUrl : res.img
        })
      }
    )
  },

  submitOrg: function (e) {
    if (this.data.inputName == "") {
      wx.showToast({
        title: '名称不能为空',
        icon : "none"
      })
      return
    }
    interact.updateOrgInfo(this.data.orgId, this.data.inputName, this.data.inputDescription, this.data.orgPicUrl).then(
        (res) => {
          wx.showToast({
            title: '修改成功',
          })
          setTimeout(function () {
              wx.navigateBack({
                  delta: 0,
              })
          }, 1500)
    })
},

})