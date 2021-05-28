const app = getApp()
const util = require("../../utils/util.js")
const interact = require("../../utils/interact.js")

// pages/follows/follows-home/follows-home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        org_list : null,
        act_list : null,
        havelogin : false,
        show : false
    },

    onLoad: function (options) {
        /*应该从后端获取数据，这里手动设置数据，便于查看效果*/
        

    },

    toOrg(e) {
        wx.navigateTo({
            url: `../sections/act-list/act-list?orgId=${e.currentTarget.dataset.orgid}`,
        })
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
        this.setData({
            show : app.show
        })
        if (app.unreadNotifList.length != 0) {
            app.showRedDot()
        }
        if (app.haveRegistered()) {
            this.setData({
                havelogin : true
            })
        } 
        else {
            app.goCertificate()
            return
        }

        interact.getAllFollowOrgs().then(
            (res) => {
                this.setData({
                    org_list : res.data
                })
            }
        )
        interact.getFollowOrgActs().then(
            (res) => {
                var lst = res.data
                if (app.loginData.follow_boya) {
                    interact.getAllStatusOrgActs(-1).then(
                        (res) => {
                            lst = lst.concat(res.data.unstart).concat(res.data.cur).concat(res.data.end)
                            this.setData({
                                act_list : this.addRelaTimeAndSort(lst)
                            })
                        }
                    )
                }
                else {
                    this.setData({
                        act_list : lst
                    })
                }
            }
        )
    },


    // callLogin: function (e) {
    //   if (!app.haveRegistered()) {
    //     const login = require("../../../utils/login.js")
    //     login.registerInfo().then(
    //         this.setData({
    //             havelogin: true,
    //         })
    //     )
    //   }
    // },

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

    addRelaTimeAndSort(notifList) {
        if (typeof(notifList) == 'string') {
          return []
        }
        for (var i = 0; i < notifList.length; i++) {
          notifList[i].relative_pub_time = util.getRelativeTime(notifList[i].pub_time)
        }
        return notifList.sort(util.compare('id')).reverse()
    },
})