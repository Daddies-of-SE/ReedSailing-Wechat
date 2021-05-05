const util = require("../../../../utils/util.js")
const interact = require("../../../../utils/interact")

// pages/sections/act-list/mem-list/mem-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId : -1,
    orgId : null,
    orgName: null,
    orgPicUrl: "/icon/sample.png",
    memList: [],

    searchInput : '',
    showSearchResult: false,
    searchResult: null,

    actions : [
      {
        name : '移除',
        color : '#fff',
        fontsize : '20',
        width : 100,
        icon : 'delete',
        background : '#ed3f14'
    },
    {
        name : '转让',
        color : '#80848f',
        width : 100,
        fontsize : '20',
        icon : 'group'
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orgId : options.orgId,
      userId : getApp().loginData.userId
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    interact.getOrgInfo(this.data.orgId).then(
      (res) => {
        this.setData({
          orgName : res.data.name,
        })
        if (res.data.avatar != null) {
          this.setData({
            orgPicUrl : res.data.avatar,
          })
        }
      }
    )

    interact.getOrgAdmins(this.data.orgId).then(
      (res) => {
        this.setData({
          memList: res.data
        })
      }
    )
  },

  onSearch: function() {
    interact.getUserInfo(this.data.searchInput).then(
      (res) => {
        // util.debug(res.data.name)
        this.setData({
          searchResult: res.data,
          showSearchResult: true,
        })
      }
    )
  },

  deleteMem: function(e) {
    // util.debug(JSON.stringify(e))
    var that = this
    var dataset = e.currentTarget.dataset
    wx.showModal({
      title : '确认删除管理员？',
      content : "用户： " + dataset.personname,
      success: function(res) {
        if (res.cancel) {

        } else {
          interact.deleteOrgManager(that.data.orgId, dataset.personid).then(
            res2 => {
              wx.showToast({
                title: '删除成功',
              })
              that.onShow()
            }
          )
        }
      }
    })
    
  },

  changeOwner: function(e) {
    var that = this
    var dataset = e.currentTarget.dataset
    wx.showModal({
      title : '确认转让负责人？',
      content : "用户： " + dataset.personname,
      success: function(res) {
        if (res.cancel) {

        } else {
          interact.changeOrgOwner(that.data.orgId, dataset.personid).then(
            res2 => {
              wx.navigateBack({
                delta: 0,
              })
              wx.showToast({
                title: '转让成功',
              })
            }
          )
        }
      }
    })
  },

  confirm: function() {
    interact.addOrgManager(this.data.orgId, this.data.searchResult.id).then(
      (res) => {
        wx.showToast({
          title: '添加成功',
        })
        this.onShow()
      }
    )
    this.setData({
      showSearchResult: false,
    })
  },

  cancel: function() {
    this.setData({
      showSearchResult: false,
    })
  },

  handleSwipeClick: function(e) {
    let index = e.detail.index
    if (index == 0){
      util.debug("click left")
    }
    else if (index == 1) {
      util.debug("click right")

    }
  },


})