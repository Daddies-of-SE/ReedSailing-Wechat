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

  bindTextAreaInput: function(e) {
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
    this.data.actId = options.actId
    if (options.commentId) {  // 不要把条件写成 options.commentId != -1，因为可能的取值是undefine,条件成立
      this.data.commentId = options.commentId
      // TODO: 获取评论原本的内容，等后端的接口
    }
  },

  createComment : function () {
    if (this.data.comment == "") {
      wx.showToast({
        title: '请输入评论内容',
        icon : 'none'
      })
      return
    }
    if (this.data.rate == 0) {
      wx.showToast({
        title: '请评分',
        icon : 'none'
      })
      return
    }
    // util.debug(this.data.commentId)
    if (this.data.commentId != -1) {
      interact.editComment(this.data.commentId, this.data.rate, this.data.comment).then(res => {
        
        wx.navigateBack({
          delta: 1,
        })
        wx.showToast({
          title: '修改成功',
        })
      })
    }
    else {
      interact.submitComment(this.data.actId, this.data.rate, this.data.comment).then(res => {
        
        wx.navigateBack({
          delta: 1,
        })
        wx.showToast({
          title: '评论成功',
        })
      })
    }
  }
})