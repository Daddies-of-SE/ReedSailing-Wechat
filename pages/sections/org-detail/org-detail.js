// pages/sections/org-detail/org-detail.js

const interact = require("../../../utils/interact.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orgId : -1,
    orgName: "orgName",
    orgPicUrl: "/icon/sample.png",
    orgInfo: "orgInfo",
    texts: "最多XX字",
    max: 200
  },

//字数限制  
inputs: function (e) {
  // 获取输入框的内容
  var value = e.detail.value;
  // 获取输入框内容的长度
  var len = parseInt(value.length);

  //最多字数限制
  if(len > this.data.max) return;
      // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
      this.setData({
         currentWordNumber: len //当前字数  
      });
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    interact.getOrgInfo(app.globalData.currentOrgID).then(
      (res) => {
        this.setData({
          orgName : res.data.name,
          orgId : res.data.id,
          orgInfo : res.data.description
        })
        if (res.data.avatar != null) {
          this.setData({
            orgPicUrl : res.data.avatar,
          })
        }
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})