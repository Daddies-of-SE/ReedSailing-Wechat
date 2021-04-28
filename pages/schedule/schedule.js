const app = getApp()
const interact = require("../../utils/interact.js")

// pages/schedule/schedule.js
Page({

  /**
   * 页面的初始数据
   */
    data: {
      havelogin : false,
      unstartActList : [],
      curActList : [],
      endActList : [],
      current : "tab1",
      showIndex: [true, true, false],
    },

   /**
     * 生命周期函数--监听页面加载
     */
    onShow: function () {
      interact.getStatusJoinActs('unstart').then(
        res1 => {
            this.setData({
                unstartActList : res1.data
            })
      })
      interact.getStatusJoinActs('cur').then(
        res2 => {
            this.setData({
                curActList : res2.data
            })
      })
      interact.getStatusJoinActs('end').then(
        res3 => {
            this.setData({
                endActList : res3.data
            })
      })
      this.setData({
          havelogin : app.haveRegistered()
      })
    },

    panel: function (e) {
      var index = e.currentTarget.dataset.index
      if (!this.data.showIndex[index]) {
        //此前未show
        var newIndex = this.data.showIndex
        newIndex[index] = true
        this.setData({
          showIndex: newIndex
        })
      } else {
        var newIndex = this.data.showIndex
        newIndex[index] = false
        this.setData({
          showIndex: newIndex
        })
      }
    },

  // bindChange: function (e) {

  //     var that = this;
  //     that.setData({ currentTab: e.detail.current });

  // },
  // swichNav: function (e) {

  //     var that = this;

  //     if (this.data.currentTab === e.target.dataset.current) {
  //         return false;
  //     } else {
  //         that.setData({
  //             currentTab: e.target.dataset.current
  //         })
  //     }
  // } ,

  handleChange ({ detail }) {
    this.setData({
        current: detail.key
    });
  },

  callLogin: function (e) {
    if (!app.haveRegistered()) {
      const login = require("../../utils/login.js")
      login.registerInfo().then(
          this.setData({
              havelogin: true
          })
      )
    }
  },

  goAct: function(e) {
    wx.navigateTo({
        url: `../sections/act-detail/act-detail?actId=${e.currentTarget.dataset.actid}`,
    })
  },
})