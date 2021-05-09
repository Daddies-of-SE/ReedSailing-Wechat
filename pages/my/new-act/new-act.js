// pages/my/new-act/new-act.js
const interact = require("../../../utils/interact.js")
const util = require("../../../utils/util.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        actId : -1,
        actInfo : {},
        my_org:[],
        categories : [],
        index2: 0,
        flag : ['否','是'],
        index3 : 0,
        index1 : 0,
        createNewCategory : false,

        presetOrgId : -1,
        presetOrgName : "",
        presetOrgForumId: -1,

        check : false, // 是否需要审核
        name: '',
        description: '',
        numPeople: '',
        newCategory: '',

        // start_date: "2021-04-22",
        // start_time: "00:00",
        // end_date: "2021-04-22",
        // end_time: "23:59",
        start_date: null,
        start_time: null,
        end_date: null,
        end_time: null,
    },

    inputNameHandler: function (e) {
        this.data.name = e.detail.detail.value
    },

    inputDescriptionHandler: function (e) {
        this.data.description = e.detail.detail.value
    },

    inputNumPeopleHandler: function (e) {
        this.data.numPeople = e.detail.detail.value
    },

    inputNewCategoryHandler: function (e) {
        this.data.newCategory = e.detail.detail.value
    },

    bindPicker_1_Change: function(e) {
        this.setData({
            index1: e.detail.value
        })
        if (this.data.categories[this.data.index1].create) {
            this.setData({
                createNewCategory: true
            })
        }
    },

    bindPicker_2_Change: function(e) {
        this.setData({
            index2: e.detail.value
        })
    },

    bindPicker_3_Change: function(e) {
        this.setData({
            index3: e.detail.value,
        })

    },

    bindStartDateChange: function (e) {
        this.setData({
            start_date: e.detail.value
        })
    },
    bindStartTimeChange: function (e) {
        this.setData({
            start_time: e.detail.value
        })
    },

    bindEndDateChange: function (e) {
        this.setData({
            end_date: e.detail.value
        })
    },
    bindEndTimeChange: function (e) {
        this.setData({
            end_time: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var time = util.formatTime(new Date()).split("T")
        this.setData({
            start_date : time[0],
            start_time : time[1].split(":")[0] + ":" + time[1].split(":")[1],
            end_date : time[0],
            end_time : time[1].split(":")[0] + ":" + time[1].split(":")[1]
        })
        if (options.actId) {
            this.setData({
                actId: options.actId
            })
        }
        else if (options.orgId) {
            this.setData({
                presetOrgId : options.orgId,
                presetOrgName : options.orgName,
                presetOrgForumId : options.forumId
            })
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (!getApp().haveRegistered()) {
            wx.navigateBack({
              delta: 0,
            })
            getApp().goCertificate()
            return
        }
        interact.getAllActCategories().then(
            (res) => {
                var r = res.data
                r.push({name : "新建类别", create : true})
                this.setData({
                    categories: r
                })
                // console.log(this.data.categories)
            }
        )
        if (this.data.actId != -1) {
            wx.setNavigationBarTitle({
              title: '活动编辑',
            })
            interact.getActInfo(this.data.actId).then(
                (res) => {
                  var r = res.data
                  r.pub_time = util.getTimeMinute(r.pub_time)
                  r.begin_time = util.getTimeMinute(r.begin_time)
                  r.end_time = util.getTimeMinute(r.end_time)
                  this.setData({
                    name: r.name,
                    description: r.description,
                    numPeople: r.contain,
                    actInfo: r,
                    start_date : r.begin_time.split(" ")[0],
                    end_date : r.end_time.split(" ")[0],
                    start_time : r.begin_time.split(" ")[1],
                    end_time : r.end_time.split(" ")[1],
                    index3 : r.review ? 1 : 0
                })
            }
            )
        }
        else if (this.data.presetOrgId == -1) {
            interact.getAllManageOrgs().then(
                (res) => {
                    var dt = [{
                        name : "发布为个人活动",
                    }]
                    for (var i = 0; i < res.data.length; i++) {
                        dt.push(res.data[i].org)
                    }
                    this.setData({
                        my_org : dt
                    })
                }
            )
        }
    },

    submitAct: function() {
        var d = this.data
        var start_datetime = d.start_date + "T" + d.start_time
        var end_datetime = d.end_date + "T" + d.end_time
        var start = new Date(Date.parse(start_datetime))
        var end = new Date(Date.parse(end_datetime))
        if (d.name == "") {
            wx.showToast({
              title: '请输入名称',
              icon : 'none'
            })
        }
        else if (d.numPeople == "") {
            wx.showToast({
              title: '请输入人数',
              icon : 'none'
            })
        }
        else if (!(/(^[1-9]\d*$)/.test(d.numPeople))) {
            wx.showToast({
              title: '人数请输入正整数',
              icon : 'none'
            })
        }
        else if (d.createNewCategory && d.newCategory == "") {
            wx.showToast({
                title: '请输入新类别',
                icon : 'none'
            })
        }
        else if (start >= end) {
            wx.showToast({
                title: '开始时间应早于结束时间',
                icon : 'none'
            })
        }
        else if (start <= new Date()) {
            wx.showToast({
                title: '开始时间应晚于当前时间',
                icon : 'none'
            })
        }
        else {
            if (d.createNewCategory) {
                interact.createActCategory(d.newCategory).then(
                    (res) => {
                        this.newActWrap(d, start_datetime, end_datetime, res.data.id)
                    }
                )
            } 
            else {
                this.newActWrap(d, start_datetime, end_datetime, d.categories[d.index1].id)
            }
        }
    },

    newActWrap: function(d, start_datetime, end_datetime, type_id) {
        interact.createAct({
            id: d.actId,
            name: d.name,
            begin_time: start_datetime,
            end_time: end_datetime,
            contain: d.numPeople,
            description: d.description,
            review: false,
            owner: getApp().loginData.userId,
            type: type_id,
            org: d.presetOrgId != -1 ? d.presetOrgId : d.index2 == 0 ? null : d.my_org[d.index2].id,
            location: 1, //TODO
            block: d.presetOrgId != -1 ? d.presetOrgForumId : d.index2 == 0 ? 5 : d.my_org[d.index2].block.id
            //创建还是修改，通过下面一行的d.actId == -1来判断
        }, d.actId == -1).then(
            res => {
                wx.navigateBack({
                    delta: 0,
                })
                if (this.data.actId == -1) {
                    wx.showToast({
                        title: '创建成功',
                    })
                }
                else {
                    wx.showToast({
                        title: '修改成功',
                    })
                }
            })
    }
})