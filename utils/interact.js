let app = getApp()
const util = require("util.js")
let retryTimes = 0

function getAPIUrl(params) {
  if (!params.endsWith("/")) {
    params = params + "/"
  }
  // const server = 'http://www.reedsailing.xyz/'
  const server = 'http://127.0.0.1:8000/'
  return server + params;
}

//缓存用户登录数据
function saveLoginData(data) {
  //存储登录token等信息
  wx.setStorage({
    data: {
      token: data.token,
      userInfo: data.userInfo,
      email : data.email
    },
    key: 'login',
  })
  //  存储到全局变量
  if (!app) {
    app = getApp();
  }
  app.loginData = {
    token: data.token,
    userInfo: data.userInfo,
    email : data.email
  }
}

//检查本地是否存在用户登录数据
function checkLoginData() {
  return new Promise((resolve, reject) => {
    if (!app) {
      app = getApp()
    }
    let getFunc = () => {
      wx.getStorage({
        key: 'login',
        success: res => {
          let data = res.data; 
          console.log("login data: " + data);
          if (data && data.token && data.userInfo) {
            saveLoginData(data)
            resolve(data)
          }
          else {
            reject(res)
          }
        }, fail: e => {
          reject(e);
        }
      })
    }
    if (!app.loginData) {
      getFunc();
    } else {
      if (app.loginData.token && app.loginData.userInfo) {
        resolve(app.loginData)
      } else {
        getFunc()
      }
    }
  })
}

//请求时捕获未登录的状态
function catchUnLogin(funcInfo) {
  //限制重复登录次数为3次
  if (retryTimes < 3) {
    //获取code
    wx.login({
      success: e => {
        if (app.loginData.userInfo) {
          module.exports.login({
            userInfo: app.loginData.userInfo,
            code: e.code
          }).then(() => {
            //记录重复尝试次数
            retryTimes++
            //重复调用请求函数
            funcInfo.func(funcInfo.options).then((res) => {
              if (funcInfo.options.success)
                funcInfo.options.success(res);
              funcInfo.resolve(res);
            }).catch((e) => {
              if (funcInfo.options.fail)
                funcInfo.options.fail(e)
              else
                funcInfo.reject(e);
            })
          }).catch((e) => {
            console.error(funcInfo.funcName + ': 未登录')
            funcInfo.reject({ err: funcInfo.funcName + ': 未登录', errMsg: '未登录' })
          })
        } else {
          console.error(funcInfo.funcName + ': 未登录')
          funcInfo.reject({ err: funcInfo.funcName + ': 未登录', errMsg: '未登录' })
        }
      }
    })
  } else {
    retryTimes = 0
    console.error(funcInfo.funcName + ': 未登录')
    funcInfo.reject({ err: funcInfo.funcName + ': 未登录', errMsg: '未登录' })
  }
}

//POST请求函数 urlpath是请求路径（不包含前面的/） data是请求体 funcInfo是调用函数信息
function request(urlpath, data, funcInfo) {
  checkLoginData().then(login => {
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

        if (!result.data.success) {
          util.debug("result.data.success in request: " + result.data.success)
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
          catchUnLogin(funcInfo);
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
    catchUnLogin(funcInfo)
  })
}

//向后端调用的登录方法。
//options说明：
//code: wx.login()返回的code。
//success: 调用成功，返回结果的函数。
//fail: 调用失败，返回错误信息的函数。
//也可以使用Promise写法。例如调用时: api.login({code: res.code}).then((res)=>{/*正确登录的逻辑段*/}.catch((e)=>{/*发生错误*/}))
module.exports.login = function (options) {
  let that = this
  return new Promise((resolve, reject) => {

    //检查options
    if (!options.code) {
      reject({ err: 'login: 未提供正确的code', errMsg: "未提供正确的code" });
      return false;
    }
    if (!options.userInfo) {
      reject({ err: 'login: 未提供正确的userInfo', errMsg: "未提供正确的userInfo" });
      return false;
    }

    //先检查是否处于登录态
    that.checkLogin()
    //向后端请求登录
    wx.request({
      url: getAPIUrl('login/'),
      data: {
        code: options.code,
        userInfo: options.userInfo
      },
      method: 'POST',
      success: function (res) {
        //如果返回数据存在token则记录并返回token
        if (res.data.token) {
          saveLoginData({
            token: res.data.token,
            userInfo: options.userInfo,
            email: res.data.email
          });
          if (options.success)
            options.success(res);
          resolve(res);
        } else { //如果不存在则报错
          if (options.fail)
            options.fail({ err: res, errMsg: "服务器反馈错误的token" });
          else
            reject({ err: res, errMsg: "服务器反馈错误的token" });
        }
      },
      fail: function (res) {
        if (options.fail)
          options.fail({ err: res, errMsg: "请求时发生错误" });
        else
          reject({ err: res, errMsg: "请求时发生错误" });
      }
    })
  });
}

//检查是否处于登录态。如果是，回调函数中data将包含token和userInfo, 不是则进入fail
module.exports.checkLogin = function (isDebug) {
  return new Promise((resolve, reject) => {
    //如果isDebug为true则跳过登录, 返回假token
    if (isDebug) {
      resolve({
        data: {
          token: 'hhh',
          userinfo: 'hh'
        }
      })
      return;
    }
    //检查Session是否有效
    wx.checkSession({
      success: () => {
        //检查是否存在登录数据
        checkLoginData().then((res) => {
          resolve({ data: res })
        }).catch((e) => {
          reject({ err: e, errMsg: "本地无已存储的用户登录数据" })
        })
      },
      fail: e => {
        reject({ err: e, errMsg: "Session已失效" });
      }
    })
  })
}

module.exports.submitEmailAddress = function (addr) {
  return new Promise((resolve, reject) => {
      wx.showToast({
        title: '提交中',
        icon: 'loading'
      })
      request('sendVerify', {email: addr}, {
        func: module.exports.submitEmailAddress,
        funcName: 'submitEmailAddress',
        reject: reject,
        resolve: resolve
      })
  })
}

module.exports.submitVerifyCode = function (addr, code) {
  return new Promise((resolve, reject) => {
      wx.showToast({
        title: '提交中',
        icon: 'loading'
      })
      request('verify', 
        {
          email: addr,
          verifyCode: code,
        }, {
          func: module.exports.submitVerifyCode,
          funcName: 'submitVerifyCode',
          reject: reject,
          resolve: resolve
      })
  })
}