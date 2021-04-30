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
        index2: 0,
        flag : ['否','是'],
        index3 : 0,

        presetOrgId : -1,
        presetOrgName : "",
        presetOrgForumId: -1,

        check : false, // 是否需要审核
        name: '',
        description: '',
        numPeople: '',

        start_date: "2021-04-22",
        start_time: "00:00",
        end_date: "2021-04-22",
        end_time: "23:59",

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
            start_time : time[1],
            end_date : time[0],
            end_time : time[1]
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
        if (this.data.actId != -1) {
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
        interact.createAct({
            id: d.actId,
            name: d.name,
            begin_time: d.start_date + "T" + d.start_time,
            end_time: d.end_date + "T" + d.end_time,
            contain: d.numPeople,
            description: d.description,
            review: d.check,
            owner: getApp().loginData.userId,
            type: 1, //TODO
            org: d.presetOrgId != -1 ? d.presetOrgId : d.index2 == 0 ? null : d.my_org[index2].id,
            location: 1, //TODO
            block: d.presetOrgId != -1 ? d.presetOrgForumId : d.index2 == 0 ? 5 : d.my_org[index2].belong_forum.id
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
                wx.showModal({
                    title: '修改成功\n请重新打开活动页',
                })
            }
        })
    }
})