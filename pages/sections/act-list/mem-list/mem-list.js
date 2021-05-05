const util = require("../../../../utils/util.js")
const interact = require("../../../../utils/interact")

// pages/sections/act-list/mem-list/mem-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      orgId : options.orgId
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
    interact.addOrgManager(this.data.orgId, this.data.searchResult.id)
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