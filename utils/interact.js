var app = getApp()
const util = require("util.js")
const lg = require("login.js")

function getAPIUrl(params) {
  if (!app) {
    app = getApp()
  }
  return app.server + params;
}

//PUT请求函数 urlpath是请求路径（不包含前面的/） data是请求体 funcInfo是调用函数信息
function put_request(urlpath, data, funcInfo) {
  lg.checkLoginData().then(login => {
    wx.request({
      url: getAPIUrl(urlpath),
      method: 'PUT',
      header: {
        'Authorization': 'Bearer ' + login.token
      },
      data: data,
      success: result => {

        //调试使用 发布时请记得注释
        console.log(funcInfo.funcName + "请求体：", data);
        console.log(funcInfo.funcName + "请求结果：", result.data)

        if ('status' in result.data && result.data.status != 0) {
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
        var s = result.statusCode
        if (s == 401) {
          login.catchUnLogin(funcInfo);
          return
        } else if (s != 200 && s != 201 && s != 202) { // 如果状态码不是200
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

        if ('status' in result.data && result.data.status != 0) {
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
        var s = result.statusCode
        if (s == 401) {
          login.catchUnLogin(funcInfo);
          return
        } else if (s != 200 && s != 201 && s != 202) { // 如果状态码不是200
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

        if ('status' in result.data && result.data.status != 0) {
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

//DELETE请求函数 urlpath是请求路径（不包含前面的/）funcInfo是调用函数信息
function delete_request(urlpath, funcInfo) {
  lg.checkLoginData().then(login => {
    wx.request({
      url: getAPIUrl(urlpath),
      method: 'DELETE',
      header: {
        'Authorization': 'Bearer ' + login.token
      },
      // data: data,
      success: result => {

        //调试使用 发布时请记得注释
        console.log(funcInfo.funcName + "请求链接：", urlpath);
        console.log(funcInfo.funcName + "请求结果：", result.data)

        //如果状态码为401 Unauthorized
        if (result.statusCode == 401) {
          lg.catchUnLogin(funcInfo);
          return
        } else if (result.statusCode != 204) { // 如果状态码不是200
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
    get_request(`blocks/organizations/${block_id}/`, 
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

module.exports.getOrgInfo = function (org_id) {
  return new Promise((resolve, reject) => {
    get_request(`organizations/${org_id}/`, 
      {
        func: module.exports.getOrgInfo,
        funcName: 'getOrgInfo',
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

// for develop
module.exports.createBlock = function (name) {
  util.debug("creating block " + name)
  return new Promise((resolve, reject) => {
    post_request(`blocks/`,
      {
        name: name
      }, 
      {
        func: module.exports.createBlock,
        funcName: 'createBlock',
        reject: reject,
        resolve: resolve
    })
  })  
}

module.exports.createOrgApplication = function (name, description, blockid) {
  util.debug("creating org application" + name)
  return new Promise((resolve, reject) => {
    post_request(`organizations/applications`,
      {
        name: name,
        description: description,
        user: app.loginData.userId,
        block: blockid
      }, 
      {
        func: module.exports.createOrgApplication,
        funcName: 'createOrgApplication',
        reject: reject,
        resolve: resolve
    })
  })
}

// for develop
module.exports.createOrgDirectly = function (name, description, blockid) {
  if (!app) {
    app = getApp()
  }
  util.debug("creating org dicrectly " + name)
  return new Promise((resolve, reject) => {
    post_request(`organizations/`,
      {
        name: name,
        description: description, //TODO
        owner: app.loginData.userId,
        block: blockid
      }, 
      {
        func: module.exports.createOrgDirectly,
        funcName: 'createOrgDirectly',
        reject: reject,
        resolve: resolve
    })
  })
}

// for develop
// module.exports.approveMyFirstCreateOrgApply = function () {

//   //先获得我的所有申请，然后再全批准
//   if (!app) {
//     app = getApp()
//   }
//   new Promise((resolve, reject) => {
//     get_request(`users/organizations/applications/${app.loginData.userId}/`, 
//       {
//       func: module.exports.approveMyFirstCreateOrgApply,
//       funcName: 'approveMyFirstCreateOrgApply',
//       reject: reject,
//       resolve: resolve
//     })
//   }).then(
//     (res) => {
//         return new Promise((resolve, reject) => {
//         if (res.data.length > 0 && res.data[0].status == 0) {
//           util.debug(JSON.stringify(res.data))
//           var appli_id = res.data[0].id
//           // util.debug("appli_id " + appli_id)
//           put_request(`organizations/applications/verifications/${appli_id}/`,
//             {
//               "status" : 1 // approve
//             }, {
//               func: module.exports.approveMyFirstCreateOrgApply,
//               funcName: 'approveMyFirstCreateOrgApply',
//               reject: reject,
//               resolve: resolve
//           })
//         }
//       })
//     }
//   )
// }

module.exports.followOrg = function (org_id) {
  return new Promise((resolve, reject) => {
    post_request(`users/followed_organizations/`,
      {
        org: org_id,
        person: app.loginData.userId,
      }, 
      {
        func: module.exports.followOrg,
        funcName: 'followOrg',
        reject: reject,
        resolve: resolve
    })
  })  
}

module.exports.unFollowOrg = function (org_id) {
  return new Promise((resolve, reject) => {
    delete_request(`users/followed_organizations/?user=${app.loginData.userId}&org=${org_id}`, 
      {
        func: module.exports.unFollowOrg,
        funcName: 'unFollowOrg',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.updateUserInfo = function (name, sign) {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
    put_request(`users/${app.loginData.userId}/`,
      {
        name : name,
        sign : sign
      }, 
      {
        func: module.exports.updateUserInfo,
        funcName: 'updateUserInfo',
        reject: reject,
        resolve: resolve
    })
  })  
}

module.exports.getAllFollowOrgs = function () {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
    get_request(`users/followed_organizations/${app.loginData.userId}/`, 
      {
        func: module.exports.getAllFollowOrgs,
        funcName: 'getAllFollowOrgs',
        reject: reject,
        resolve: resolve
    })
  })  
}