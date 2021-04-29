// pages/sections/act-detail/new-comment/new-comment.js
const utils = require('../../../../utils/util.js')
const interact = require("../../../../utils/interact.js")
const util = require('../../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentId : -1,
    actId : -1,
    comment : "",
    rate : 0,
  },

  bindTextAreaBlur: function(e) {
    // utils.debug(e.detail.value)
    this.data.comment = e.detail.value
  },

  onChange: function(e) {
    // utils.debug(e.detail)
    this.data.rate = e.detail
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.comment && options.commentId != -1) {
      this.data.commentId = options.commentId
    }
    this.data.actId = options.actId
  },

  createComment : function () {
    // util.debug(this.data.commentId)
    if (this.data.commentId != -1) {
      //TODO：编辑评论
    }
    else {
      interact.submitComment(this.data.actId, this.data.rate, this.data.comment).then(res => {
        wx.navigateBack({
            delta: 0,
        })
        if (this.data.commentId == -1) {
            wx.showToast({
                title: '评论成功',
            })
        }
        else {
            wx.showModal({
                title: '修改成功\n请重新打开活动页',
            })
        }
      })
    }
  }
})