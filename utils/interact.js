const app = getApp()
const util = require("util.js")

function getAPIUrl(params) {
  const server = 'http://127.0.0.1:8000/'
  return server + params;
}

const submitEmailAddress = addr => {
  console.warn(addr);

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
      //如果返回数据存在token则记录并返回token
      if (res.data.token) {
        util.debug("find token", res.data.token)
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        })
      } else { //如果不存在则报错
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