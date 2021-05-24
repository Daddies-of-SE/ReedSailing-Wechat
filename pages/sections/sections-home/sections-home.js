const util = require("../../../utils/util")
const app = getApp();
const interact = require("../../../utils/interact.js")

Page({
 
    /**
     * 页面的初始数据
     */
    data: {
        winWidth:0,
        winHeight:0,
        currentTab:0,
        havelogin: false,
        forum_list: [],
        searchContent : ""
    },
 
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            havelogin : app.haveRegistered(),
            forum_list: app.forumList 
        })
    },

    handleClick: function(e) {
        if (e.currentTarget.dataset.hasOrg) {
            wx.navigateTo({
                url: `../org-list/org-list?forumId=${e.currentTarget.dataset.forumid}&forumName=${e.currentTarget.dataset.name}`,
              })
        } else {
            if (e.currentTarget.dataset.name == "博雅") {
                wx.navigateTo({
                  url: `../act-list/act-list?orgId=-1`,
                })
            }
            else {
                wx.navigateTo({
                    url: `../act-list/act-list?orgId=-2`,
                })
            }
        }
        
    },

    onShow: function (e) {

      //interact.uploadImage("actAvatar/")
        if (app.haveRegistered()) {
            this.setData({
                havelogin : true
            })
        }
        if (app.unreadNotifList.length != 0) {
          app.showRedDot()
        }
      },

    // callLogin: function (e) {
    //     if (!app.haveRegistered()) {
    //         const login = require("../../../utils/login.js")
    //         login.registerInfo().then(
    //             this.setData({
    //                 havelogin: true
    //             })
    //         )
    //     }
    // },

    onShareAppMessage: function (res) {
        return {
          title: app.shareData.title,
          path: 'pages/index/index',
          imageUrl: app.shareData.imageUrl,
          success: function (res) {
            wx.showToast({
              title: '分享成功',
            })
          }
        }
    },

    onSearch: function (e) {
      if (this.data.searchContent == "") {
        wx.showToast({
          title: '请输入搜索内容',
          icon: 'none'
        })
        return
      }
        wx.navigateTo({
          url: `/pages/sections/search/search?searchContent=${this.data.searchContent}&searchType=1`,
        })
      },
    
      onChange: function (e) {
        this.setData({
          searchContent : e.detail
        })
      },
    
      onClear: function (e) {
        this.setData({
          searchContent : ""
        })
      },
})
