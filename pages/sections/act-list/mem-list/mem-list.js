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
  }

})