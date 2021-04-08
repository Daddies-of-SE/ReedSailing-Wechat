const app = getApp()
const util = require("util.js")

function getAPIUrl(params) {
  const server = 'http://127.0.0.1:8000/'
  return server + params;
}

function requestPost (data, url) {
  // return new Promise((resolve, reject) => {
    if (!url.endsWith("/")) {
      url = url + "/"
    }
    wx.request({
      url: getAPIUrl(url),
      data: data,
      header:{
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      success: function (res) {
        util.debug("request post success")
        var r = res.data
        r.post_success = true
        return r
      },

      fail: function (res) {
        util.debug("request post fail")
        var r = {post_success : false}
        return r
      }
    })
  // })
}

function submitEmailAddress(addr) {
    wx.showToast({
      title: '提交中',
      icon: 'loading'
    })
  // var r = requestPost({email:addr}, 'sendVerify/')
  // util.debug(r.post_success)
  // if (r.post_success) {
  //   wx.showToast({
  //     title: '提交成功',
  //     icon: 'success'
  //   })
  // }
  // else {
  //   wx.showToast({
  //     title: '无法连接服务器',
  //     icon: 'error'
  //   })
  // }
    wx.request({
    url: getAPIUrl('sendVerify/'),
    data: {
      email: addr
    },
    // method: 'GET',
    header:{
      "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
    },
    method: "POST",
    success: function (res) {
      util.debug("request success" + res)
      util.debug(res.success + res.mess)

      //如果返回数据存在token则记录并返回token
      if (res.data.success) {
        util.debug("find success", res.data.success)
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        })
      } else { //如果不存在则报错
        util.debug("服务器返回data ")
        util.debug(res)
        wx.showToast({
          title: '服务器返回无效token',
          icon: 'error'
        })
      }
    },

    fail: function (res) {
      util.debug("request fail" + res)
      wx.showToast({
        title: '无法连接服务器',
        icon: 'error'
      })
    }
  })
}

module.exports = {
  submitEmailAddress
}