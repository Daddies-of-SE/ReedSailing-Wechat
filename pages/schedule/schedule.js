const app = getApp()
const interact = require("../../utils/interact.js")
const util = require("../../utils/util.js")

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
      monthActList : {},
      current : "tab1",
      showIndex: [true, true, false],
      year: 0,
      month: 0,
      date: ['日', '一', '二', '三', '四', '五', '六'],
      dateArr: [],
      isToday: 0,
      isTodayWeek: false,
      todayIndex: 0,
      actList: [],
      showDateActList: false,
      DateActList: [],
      init : true,
      searchContent : "",
      debugText : ""
    },

   /**
     * 生命周期函数--监听页面加载
     */
    onShow: function () {
      if (app.unreadNotifList.length != 0) {
        app.showRedDot()
      }
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
        isToday: '' + year + month + now.getDate(),
        DateActList : []
      });
      if (!getApp().haveRegistered()) {
        getApp().goCertificate()
        return
      }

      interact.getAllStatusJoinActs().then(
        res => {
          this.setData({
            unstartActList : res.data.unstart,
            curActList : res.data.cur,
            endActList : res.data.end
          })
        }
      )
      
      this.getMonthActs(this.data.year, this.data.month)
      
    },

    getMonthActs : function(year, month) {
      interact.getJoinedMonthActs(year, month).then(
        (res) => {
          this.setData({
            monthActList : res.data
          })
          //新复制一个，目的是可以使用setData赋值，否则页面视图层无法刷新
          var newDateArr = this.data.dateArr
          for (let i = 0; i < this.data.dateArr.length; i++) {
            var date = newDateArr[i].dateNum
            var m = month < 10 ? "0" + month : month
            date = date < 10 ? "0" + date : date
            var todayAct = this.data.monthActList[`${year}-${m}-${date}`]
            if (todayAct) {
              newDateArr[i].actList = todayAct
              newDateArr[i].hasAct = true
            }
            
          }
          this.setData({
            dateArr : newDateArr
          })
        }
      )
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
      let startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay();                            //目标月1号对应的星期
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
            weight: 5,
            hasAct: false,
            actList: [],
            selected: false
          }
        } else {
          obj = {};
        }
        dateArr[i] = obj;
      }
      
      for (let i = 0; i < 0; i++)
      {
        dateArr[actList[i].date].hasAct = true;
        dateArr[actList[i].date].actList.push(actList[i]);
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
        month: (month + 1),
        DateActList : [],
        init : true
      })
      this.dateInit(year, month);
      this.getMonthActs(this.data.year, this.data.month)
    },
    
    nextMonth: function () {
      //全部时间的月份都是按0~11基准，显示月份才+1
      let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
      let month = this.data.month > 11 ? 0 : this.data.month;
      this.setData({
        year: year,
        month: (month + 1),
        DateActList : [],
        init : true
      })
      this.dateInit(year, month);
      this.getMonthActs(this.data.year, this.data.month)
    },

    showActList: function (e) {
      // var month = this.data.month < 10 ? "0" + this.data.month : this.data.month
      // var date = e.currentTarget.dataset.datenum
      // date = date < 10 ? "0" + date : date
      // var todayAct = this.data.monthActList[`${this.data.year}-${month}-${date}`]
      this.setData({
        // DateActList : todayAct ? todayAct : [],
        DateActList : this.data.dateArr[e.currentTarget.dataset.index].actList,
        showDateActList : true
      })
      // let date = e.currentTarget.dataset.date;
      // showDateActList = date.hasAct;
      // DateActList = date.actList;
      var newDateArr = this.data.dateArr
      for (let i = 0; i < this.data.dateArr.length; i++)
      {
        newDateArr[i].selected = false;
      }
      newDateArr[e.currentTarget.dataset.index].selected = true;
      this.setData({
        dateArr : newDateArr,
        init : false
      })
      // util.debug(date)
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

  // callLogin: function (e) {
  //   if (!app.haveRegistered()) {
  //     const login = require("../../utils/login.js")
  //     login.registerInfo().then(
  //         this.setData({
  //             havelogin: true
  //         })
  //     )
  //   }
  // },

  goAct: function(e) {
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

  onSearch: function (e) {
    if (this.data.searchContent == "") {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: `/pages/sections/search/search?searchContent=${this.data.searchContent}&searchType=4`,
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