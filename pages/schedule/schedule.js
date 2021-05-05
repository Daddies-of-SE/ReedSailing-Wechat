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
      year: 0,
      month: 0,
      date: ['日', '一', '二', '三', '四', '五', '六'],
      dateArr: [],
      isToday: 0,
      isTodayWeek: false,
      todayIndex: 0
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
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      this.dateInit();
      this.setData({
        year: year,
        month: month,
        isToday: '' + year + month + now.getDate()
      })
    },
    dateInit: function (setYear, setMonth) {
      //全部时间的月份都是按0~11基准，显示月份才+1
      let dateArr = [];                        //需要遍历的日历数组数据
      let arrLen = 0;                            //dateArr的数组长度
      let now = setYear ? new Date(setYear, setMonth) : new Date();
      let year = setYear || now.getFullYear();
      let nextYear = 0;
      let month = setMonth || now.getMonth();                    //没有+1方便后面计算当月总天数
      let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
      let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();                            //目标月1号对应的星期
      let dayNums = new Date(year, nextMonth, 0).getDate();                //获取目标月有多少天
      let obj = {};
      let num = 0;
    
      if (month + 1 > 11) {
        nextYear = year + 1;
        dayNums = new Date(nextYear, nextMonth, 0).getDate();
      }
      arrLen = startWeek + dayNums;
      for (let i = 0; i < arrLen; i++) {
        if (i >= startWeek) {
          num = i - startWeek + 1;
          obj = {
            isToday: '' + year + (month + 1) + num,
            dateNum: num,
            weight: 5
          }
        } else {
          obj = {};
        }
        dateArr[i] = obj;
      }
      this.setData({
        dateArr: dateArr
      })
     
      let nowDate = new Date();
      let nowYear = nowDate.getFullYear();
      let nowMonth = nowDate.getMonth() + 1;
      let nowWeek = nowDate.getDay();
      let getYear = setYear || nowYear;
      let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    
      if (nowYear == getYear && nowMonth == getMonth) {
        this.setData({
          isTodayWeek: true,
          todayIndex: nowWeek
        })
      } else {
        this.setData({
          isTodayWeek: false,
          todayIndex: -1
        })
      }
    },
    
    lastMonth: function () {
      //全部时间的月份都是按0~11基准，显示月份才+1
      let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
      let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
      this.setData({
        year: year,
        month: (month + 1)
      })
      this.dateInit(year, month);
    },
    
    nextMonth: function () {
      //全部时间的月份都是按0~11基准，显示月份才+1
      let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
      let month = this.data.month > 11 ? 0 : this.data.month;
      this.setData({
        year: year,
        month: (month + 1)
      })
      this.dateInit(year, month);
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