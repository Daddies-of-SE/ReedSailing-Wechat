const interact = require("../../../utils/interact.js")

// pages/my/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contact : "",
    content : "",
  },

  contactHandler: function (e) {
    this.data.contact = e.detail.detail.value
  },

  contentHandler: function (e) {
      this.data.content = e.detail.detail.value
  },

  submitFB: function(e) {
    var msg = this.data.content
    if (msg == "") {
      wx.showToast({
        title: '请填写反馈内容',
        icon : 'none'
      })
      return
    }
    if (this.data.contact != "") {
      msg += "\n联系方式：" + this.data.contact
    }
    interact.submitFeedback(msg).then(
      (res) => {
        wx.showToast({
          title: '提交成功',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 0,
          })
        }, 1500)
        
      }

    )
    
  }
})