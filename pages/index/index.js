const app = getApp()
const interact = require("../../utils/interact.js")
const util = require("../../utils/util.js")

// pages/index/recommend.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        havelogin : false,
        info : "",
        org_list : null,
        act_list : null,
        current : "tab1",
        longitude: 116,
        latitude : 40,
        markers : [],
        show : false
    },

    onLoad: function (options) {
      this.setData({
        longitude: app.buaaLocation.longitude,
        latitude: app.buaaLocation.latitude,
      })
    },

    onShow: function (e) {
      this.setData({
        show : app.show
      })
      if (app.haveRegistered()) {
          this.setData({
              havelogin : true,
              info : JSON.stringify(app.loginData.nickName)
          })
      }
      
      getApp().globalLogin().then(
        (res) => {
          this.setData({
              havelogin : app.haveRegistered(),
              info : JSON.stringify(app.loginData.nickName),
          })
          if (app.unreadNotifList.length != 0) {
            app.showRedDot()
          }
  
          interact.getRecommend().then(
            (res) => {
                var lst = []
                var locations = []
                var acts = res.data.acts
                var orgs = res.data.orgs
                this.setData({
                  org_list : orgs.length > 10 ? orgs.slice(0,10) : orgs
                })
                for (var i = 0; i < Math.min(10, acts.length); i++) {
                    var v = acts[i]
                    v.pub_time = v.pub_time.split(".")[0].replace("T", " ")
                    v.begin_time = util.getTimeMinute(v.begin_time)
                    v.end_time = util.getTimeMinute(v.end_time)
                    v.relative_pub_time = util.getRelativeTime(v.pub_time)
                    if (this.data.show || v.block.id == 2) {
                      lst.push(v)
                      locations.push({
                        id: v.id,
                        latitude: v.location.latitude,
                        longitude: v.location.longitude,
                        name: v.name,
                        width: "30",  
                        height: "60",
                        // callout : {content : v.name}
                      })
                    }
                }
                
                this.setData({
                  act_list : lst.sort(util.compare('id')).reverse(),
                  markers : locations,
                  show : app.show
                })
            }
          )
          
          

          
        }
      )
    },

    // callLogin: function (e) {
    //   if (!app.haveRegistered()) {
    //     const login = require("../../../utils/login.js")
    //     login.registerInfo().then(
    //         this.setData({
    //             havelogin: true,
    //             info : JSON.stringify(app.loginData.nickName)
    //         })
    //     )
    //   }
    // },

    
    toOrg(e) {
        wx.navigateTo({
          url: `../sections/act-list/act-list?orgId=${e.currentTarget.dataset.orgid}`,
        })
    },

    toActivity(e) {
      wx.navigateTo({
        url: `../sections/act-detail/act-detail?actId=${e.currentTarget.dataset.actid}`,
      })
    },

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

    handleChange ({ detail }) {
      this.setData({
          current: detail.key
      });
    },

    goMarker (e) {
      wx.navigateTo({
        url: `../sections/act-detail/act-detail?actId=${e.detail.markerId}`,
      })
    }
})