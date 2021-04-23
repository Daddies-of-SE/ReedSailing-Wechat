// pages/my/new-act/new-act.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        forum_array: [],
        index1 : 0,
        // TODO: my_org应该设置为**所选forum下**，用户所管理的组织
        my_org:['高工足球队', '高工学生会'],
        index2: 0,
        flag : ['否','是'],
        index3 : 0,

        private : false, // 是否是个人活动
        check : false, // 是否需要审核
        value1: '',
        value2: '',
        value3: '',

        start_date: "2020-04-22",
        start_time: "00:00",
        end_date: "2020-04-22",
        end_time: "23:59",

    },

    bindPicker_1_Change: function(e) {
        this.setData({
            index1: e.detail.value,
            private: this.data.forum_array[e.detail.value] == '个人' ? true : false
        })
        
       
    },
    bindPicker_2_Change: function(e) {
        this.setData({
            index2: e.detail.value
        })
    },

    bindPicker_3_Change: function(e) {
        this.setData({
            index3: e.detail.value,
            private: this.data.flag[e.detail.value] == '是' ? true : false
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

    },

    submitAct: function() {

    }
})