// pages/sections/search/search.js

const interact = require("../../../utils/interact.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options : {},
    idMatchOrg : 0,
    idMatchAct : 0,
    orgList: [],
    actList: [],
    searchRangeText: '',
    searchDone : false
  },
  /*
    searchType：
    1 搜全部组织/活动
    2 搜指定版块下的组织 (提供forumId)
    3 搜指定组织下的活动 (提供orgId，其中-1代表博雅，-2代表个人)
    4 搜指定用户报名的活动 
    5 搜指定用户发布的活动
    6 搜指定用户管理的组织
  */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.searchContent.length > 10) {
      options.searchContent = options.searchContent.slice(0,10)
      wx.showToast({
        title: '搜索内容过长，仅保留前十个字符',
        icon: 'none'
      })
    }
    this.setData({
      options : options,
      searchRangeText : options.searchType == 1 ? "全部组织、活动" :
      options.searchType == 2 ?  `'${options.forumName}'版块下的组织` : 
      options.searchType == 3 && options.orgId in [-1, -2] ? options.orgName:
      options.searchType == 3 ? `'${options.orgName}'组织下的活动` :
      options.searchType == 4 ? `报名的活动` :
      options.searchType == 5 ? `管理的活动` :
      "管理的组织"
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var o = this.options
    var id = parseInt(o.searchContent)
    o.searchType = parseInt(o.searchType)
    // var idMatchOrg = {id : -233}, idMatchAct = {id : -233}
    if (!isNaN(id)) {
      console.log(o.searchType)
      if ([1,2,6].indexOf(o.searchType) > -1) {
        interact.getOrgInfo(id).then(
          (res) => {
            if (res.statusCode != 404) {
              this.setData({
                idMatchOrg : res.data
              })
            }
          }
        )
      }
      if ([1,3,4,5].indexOf(o.searchType) > -1) {
        interact.getActInfo(id).then(
          (res) => {
            if (res.statusCode != 404) {
              this.setData({
                idMatchAct : res.data
              })
            }
          }
        )
      }
    }

    if (o.searchType == 1) {
      interact.searchAllOrgs(o.searchContent).then(
        (res1) => {
          this.setData({
            orgList : res1.data
          })
        }
      )

      interact.searchAllActs(o.searchContent).then(
        (res2) => {
          this.setData({
            actList : res2.data,
            searchDone : true
          })
        }
      )
    }
    else if (o.searchType == 2) {
      interact.searchBlockOrgs(o.searchContent, o.forumId).then(
        (res) => {
          this.setData({
            orgList : res.data,
            searchDone : true
          })
        }
      )
    }
    else if (o.searchType == 3) {
      interact.searchOrgActs(o.searchContent, o.orgId).then(
        (res) => {
          this.setData({
            actList : res.data,
            searchDone : true
          })
        }
      )
    }
    else if (o.searchType == 4) {
      interact.searchJoinedActs(o.searchContent).then(
        (res) => {
          var r = []
          for (var i = 0; i < res.data.length; i++) {
            r.push(res.data[i].act)
          }
          this.setData({
            actList : r,
            searchDone : true
          })
          // console.log(r)
        }
      )
    }
    else if (o.searchType == 5) {
      interact.searchManageActs(o.searchContent).then(
        (res) => {
          this.setData({
            actList : res.data,
            searchDone : true
          })
        }
      )
    }
    else if (o.searchType == 6) {
      interact.searchManageOrgs(o.searchContent).then(
        (res) => {
          var r = []
          for (var i = 0; i < res.data.length; i++) {
            r.push(res.data[i].org)
          }
          this.setData({
            orgList : r,
            searchDone : true
          })
        }
      )
    }
    else {
      console.log("unknown searchType" + o.searchType)
    }
    // for (var i = 0; i < this.data.orgList.length; i++) {
    //   if (this.data.orgList[i].id == id) {
    //     this.setData({
    //       idMatchOrg :this.data.orgList[i]
    //     })
    //   }
    // }
    // for (var i = 0; i < this.data.actList.length; i++) {
    //   if (this.data.actList[i].id == id) {
    //     this.setData({
    //       idMatchAct :this.data.actList[i]
    //     })
    //   }
    // }

  },

  goAct: function(e) {
    wx.navigateTo({
        url: `../../sections/act-detail/act-detail?actId=${e.currentTarget.dataset.actid}`,
    })
  },

  goOrg(e) {
    wx.navigateTo({
      url: `../act-list/act-list?orgId=${e.currentTarget.dataset.orgid}`,
    })
  },
})