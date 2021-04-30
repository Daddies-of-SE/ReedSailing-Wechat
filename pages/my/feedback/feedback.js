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
    if (this.data.contact != "") {
      msg += "\n联系方式：" + this.data.contact
    }
    interact.submitFeedback(msg).then(
      (res) => {
        wx.navigateBack({
          delta: 0,
        })
        wx.showToast({
          title: '提交成功',
        })
      }

    )
    
  }
})