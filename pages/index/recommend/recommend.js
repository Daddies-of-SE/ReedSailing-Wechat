const interact = require("../../../utils/interact.js")
const app = getApp()

// pages/index/recommend.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info : "userInfo未获取",
        haveLogin : false
    },

    onLoad(){
        this.setData({
            haveLogin : app.loginData.token != ""
        })
    },

    //TODO
    jump: function (e) {
        let that = this
        //调试时若后端无法请求在checkLogin函数参数加个true可以跳过登录
        interact.checkLogin().then((res) => {
          //跳转页面
          wx.navigateTo({
            url: '' //TODO
          })
        }).catch((err) => {
    
          wx.getSetting({
            success(res) {
    
              if (res.authSetting["scope.userInfo"]) {
                wx.getUserInfo({
                  success(result) {
                    that.getCodeLogin(result.userInfo)
                  }
                })
              } else {
                that.setData({ loginDialogShow: true });
              }
    
            }
          })
        })
      },
    
      //获取登录用的Code并发送到服务器
      getCodeLogin(userInfo) {
        let that = this;
        let showFailModel = function (text) {
          wx.hideLoading();
          wx.showModal({
            title: '登录失败1',
            content: text,
            showCancel: true,
            confirmText: '重试',
            success: res => {
              if (res.confirm) {
                wx.showLoading({ title: '正在重试', mask: true });
                that.getCodeLogin(userInfo);
              }
            }
          });
        }
        wx.login({
          success: res => {
            if (res.code) {
              interact.login({
                code: res.code,
                userInfo: userInfo,
              }).then((result) => {
                console.warn("登录成功")
                wx.showToast({
                  title: '登录成功',
                  icon: 'success'
                })
                this.setData({
                    info : JSON.stringify(app.loginData.userInfo),
                    haveLogin : true
                })
              }).catch((e) => {
                console.error("登录失败2：" + e.errMsg);
                if ((e.errMsg + '').indexOf('request:fail') != -1)
                  showFailModel('请求时发生错误');
                else
                  showFailModel(e.errMsg);
              })
            } else {
              console.error("登录失败3：" + res.errMsg);
              showFailModel('未能获取登录授权码');
            }
          }
        })
        
      },
    
      //getUserInfo Button点击事件的Handler
      getUserInfo: function (e) {
        this.setData({ loginDialogShow: false })
        if (e.detail.userInfo) {
          this.getCodeLogin(e.detail.userInfo);
        } else {
          wx.showToast({
            title: '未获取授权',
            icon: 'none'
          })
        }
      },
    
      //loginDialog关闭事件的Handler
      loginDialogClose: function (e) {
        this.setData({
          loginDialogShow: false,
        })
      },


})