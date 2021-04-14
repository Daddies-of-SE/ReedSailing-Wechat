var app = getApp()
const util = require("util.js")
const lg = require("login.js")

function getAPIUrl(params) {
  if (!app) {
    app = getApp()
  }
  return app.server + params;
}

//POST请求函数 urlpath是请求路径（不包含前面的/） data是请求体 funcInfo是调用函数信息
function post_request(urlpath, data, funcInfo) {
  if (!urlpath.endsWith("/")) {
    urlpath = urlpath + "/"
  }
  lg.checkLoginData().then(login => {
    wx.request({
      url: getAPIUrl(urlpath),
      method: 'POST',
      header: {
        'Authorization': 'Bearer ' + login.token
      },
      data: data,
      success: result => {

        //调试使用 发布时请记得注释
        console.log(funcInfo.funcName + "请求体：", data);
        console.log(funcInfo.funcName + "请求结果：", result.data)

        if (result.data.status != 0) {
          util.debug("result.data.status in post_request: " + result.data.status)
          wx.hideToast()
          wx.showModal({
            title: funcInfo.funcName + "请求失败 (errCode:" + result.data.errCode + ")",
            content: result.data.msg,
            showCancel: true,
            confirmText: '确认',
          })
        }

        //如果状态码为401 Unauthorized
        if (result.statusCode == 401) {
          login.catchUnLogin(funcInfo);
          return
        } else if (result.statusCode != 200) { // 如果状态码不是200
            funcInfo.reject({ err: result, errMsg: "服务器发生错误" });
        } 
        funcInfo.resolve(result);

      },

      fail: e => {
        e.func = funcInfo.funcName
        // if (funcInfo.options.fail)
        //   funcInfo.options.fail(e)
        // else
        funcInfo.reject(e);
        wx.showToast({
          'title' : '无法连接服务器',
          'icon' : 'none',
        }) 
      }
    })
  })
  
  .catch(() => {
    lg.catchUnLogin(funcInfo)
  })
}

//GET请求函数 urlpath是请求路径（不包含前面的/）funcInfo是调用函数信息
function get_request(urlpath, funcInfo) {
  lg.checkLoginData().then(login => {
    wx.request({
      url: getAPIUrl(urlpath),
      method: 'GET',
      header: {
        'Authorization': 'Bearer ' + login.token
      },
      // data: data,
      success: result => {

        //调试使用 发布时请记得注释
        console.log(funcInfo.funcName + "请求链接：", urlpath);
        console.log(funcInfo.funcName + "请求结果：", result.data)

        if (result.data.status != 0) {
          util.debug("result.data.status in get_request: " + result.data.status)
          wx.hideToast()
          wx.showModal({
            title: funcInfo.funcName + "请求失败 (errCode:" + result.data.errCode + ")",
            content: result.data.msg,
            showCancel: true,
            confirmText: '确认',
          })
        }

        //如果状态码为401 Unauthorized
        if (result.statusCode == 401) {
          lg.catchUnLogin(funcInfo);
          return
        } else if (result.statusCode != 200) { // 如果状态码不是200
            funcInfo.reject({ err: result, errMsg: "服务器发生错误" });
        } 
        funcInfo.resolve(result);

      },

      fail: e => {
        e.func = funcInfo.funcName
        // if (funcInfo.options.fail)
        //   funcInfo.options.fail(e)
        // else
        funcInfo.reject(e);
        wx.showToast({
          'title' : '无法连接服务器',
          'icon' : 'none',
        }) 
      }
    })
  }).catch(() => {
    lg.catchUnLogin(funcInfo)
  })
}

module.exports.submitEmailAddress = function (addr) {
  return new Promise((resolve, reject) => {
      wx.showToast({
        title: '提交中',
        icon: 'loading'
      })
      post_request('sendVerify', {email: addr}, {
        func: module.exports.submitEmailAddress,
        funcName: 'submitEmailAddress',
        reject: reject,
        resolve: resolve
      })
  })
}

module.exports.submitVerifyCode = function (addr, code) {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
      wx.showToast({
        title: '提交中',
        icon: 'loading'
      })
      post_request('verify', 
        {
          email: addr,
          verifyCode: code,
          id: app.loginData.userId
        }, {
          func: module.exports.submitVerifyCode,
          funcName: 'submitVerifyCode',
          reject: reject,
          resolve: resolve
      })
  })
}

module.exports.getBlockOrgList = function (block_id) {
  return new Promise((resolve, reject) => {
    get_request(`blocks/orgs/?block=${block_id}`, 
      {
        func: module.exports.getBlockOrgList,
        funcName: 'getBlockOrgList',
        reject: reject,
        resolve: resolve
    })
  })  
}

module.exports.getOrgInfo = function (org_id) {
  return new Promise((resolve, reject) => {
    get_request(`organizations/?org=${org_id}`, 
      {
        func: module.exports.getOrgInfo,
        funcName: 'getOrgInfo',
        reject: reject,
        resolve: resolve
    })
  })  
}

module.exports.getOrgAdmins = function (org_id) {
  return new Promise((resolve, reject) => {
    get_request(`organizations/managers/?org=${org_id}`, 
      {
        func: module.exports.getOrgAdmins,
        funcName: 'getOrgAdmins',
        reject: reject,
        resolve: resolve
    })
  })  
}

module.exports.getUserInfo = function (user_id) {
  return new Promise((resolve, reject) => {
    get_request(`users/?id=${user_id}`, 
      {
        func: module.exports.getUserInfo,
        funcName: 'getUserInfo',
        reject: reject,
        resolve: resolve
    })
  })  
}

module.exports.getUserControlOrgs = function (user_id) {
  return new Promise((resolve, reject) => {
    get_request(`users/organizations/?id=${user_id}&user_view=true`, 
      {
        func: module.exports.getUserControlOrgs,
        funcName: 'getUserControlOrgs',
        reject: reject,
        resolve: resolve
    })
  })  
}