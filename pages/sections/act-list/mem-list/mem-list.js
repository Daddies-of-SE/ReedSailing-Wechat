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
    orgPicUrl: "/icon/person.png",
    memList: [],

    searchInput : '',
    showSearchResult: false,
    searchResult: null,

    actions : [
      {
        name : '查看',
        color : '#80848f',
        width : 100,
        fontsize : '20',
        // icon : 'group'
      },
      {
        name : '转让',
        color : '#80848f',
        width : 100,
        fontsize : '20',
        icon : 'group'
      },
      {
        name : '移除',
        color : '#fff',
        fontsize : '20',
        width : 100,
        icon : 'delete',
        background : '#ed3f14'
      },
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

  confirm: function() {
    if (this.data.searchResult.email && this.data.searchResult.email != "") {
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
    }
    else {
      wx.showToast({
        title: '该用户未认证，不能添加为管理员',
        icon : 'none'
      })
    }
  },

  cancel: function() {
    this.setData({
      showSearchResult: false,
    })
  },

  handleSwipeClick: function(e) {
    let index = e.detail.index
    if (index == 2){
      // util.debug("click left")
      this.deleteMem(e)
    }
    else if (index == 1) {
      // util.debug("click right")
      this.changeOwner(e)
    }
    else if (index == 0) {
      this.goUser(e.currentTarget.dataset.personid)
    }
  },

  goUser: function (userid) {
    wx.navigateTo({
      url: `../../user-info/user-info?userId=${userid}`,
    })
  },

  deleteMem: function(e) {
    // util.debug(JSON.stringify(e))
    var that = this
    var dataset = e.currentTarget.dataset
    if (dataset.personid == this.data.userId) {
      wx.showToast({
        title: '不能删除自己',
        icon: 'none'
      })
      return
    }
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
    if (dataset.personid == this.data.userId) {
      wx.showToast({
        title: '您已是负责人',
        icon: 'none'
      })
      return
    }
    wx.showModal({
      title : '确认转让负责人？',
      content : "用户： " + dataset.personname,
      success: function(res) {
        if (res.cancel) {

        } else {
          interact.changeOrgOwner(that.data.orgId, dataset.personid).then(
            res2 => {
              wx.showToast({
                title: '转让成功',
              })
              setTimeout(function () {
                  wx.navigateBack({
                      delta: 0,
                  })
              }, 1500)
            }
          )
        }
      }
    })
  },



})