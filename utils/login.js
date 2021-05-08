var app = getApp()
const util = require("util.js")
const interact = require("interact.js")
let retryTimes = 0

function getAPIUrl(params) {
  if (!app) {
    app = getApp()
  }
  return app.server + params;
}


//缓存用户登录数据
module.exports.saveLoginData = function (resData) {
  var dt = {
    token: resData.token,
    email : resData.email,
    userExist : resData.userExist,
    userId : resData.id,
    nickName : resData.name,
    motto : resData.sign,
    avatar : resData.avatar
  }
  // util.debug("save login data: " + JSON.stringify(dt))
  if (dt.email == null) {
    dt.email = ""
  }
  wx.setStorage({
    data: dt,
    key: 'login',
  })
  //  存储到全局变量
  if (!app) {
    app = getApp();
  }
  app.loginData = dt
}

//检查本地是否存在用户登录数据
module.exports.checkLoginData = function () {
  return new Promise((resolve, reject) => {
    if (!app) {
      app = getApp()
    }
    let getFunc = () => {
      wx.getStorage({
        key: 'login',
        success: res => {
          let data = res.data;
          if (data && data.token) {
            module.exports.saveLoginData(data)
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
      if (app.loginData.token) {
        resolve(app.loginData)
      } else {
        getFunc()
      }
    }
  })
}

//请求时捕获未登录的状态
module.exports.catchUnLogin = function(funcInfo) {
  //限制重复登录次数为3次
  util.debug("CatchUnLogin called")
  if (retryTimes < 3) {
    //获取code
    wx.login({
      success: e => {
        if (app.loginData) {
          login_({
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
              // if (funcInfo.options.fail)
              //   funcInfo.options.fail(e)
              // else
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

//向后端调用的登录方法。
//options说明：
//code: wx.login()返回的code。
//success: 调用成功，返回结果的函数。
//fail: 调用失败，返回错误信息的函数。
//也可以使用Promise写法。例如调用时: api.login({code: res.code}).then((res)=>{/*正确登录的逻辑段*/}.catch((e)=>{/*发生错误*/}))
function login_(options) {
  return new Promise((resolve, reject) => {

    //检查options
    if (!options.code) {
      reject({ err: 'login: 未提供正确的code', errMsg: "未提供正确的code" });
      return false;
    }

    //先检查是否处于登录态
    module.exports.checkLogin()
    //向后端请求登录
    wx.request({
      url: getAPIUrl('userLogin/'),
      data: {
        code: options.code
      },
      method: 'POST',
      success: function (res) {
        //如果返回数据存在token则记录并返回token
        // util.debug("res" + JSON.stringify(res))
        if (res.data.token) {
          module.exports.saveLoginData(res.data)
          util.debug("登录成功, id: " + res.data.id)
          if (options.success)
            options.success(res);
          resolve(res);
        } else { //如果不存在则报错
          if (options.fail)
            options.fail({ err: res, errMsg: "服务器反馈错误的token" + res.statusCode });
          else
            reject({ err: res, errMsg: "服务器反馈错误的token" + res.statusCode });
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '无法连接服务器',
          icon: 'none'
        })
        if (options.fail) 
          options.fail({ err: res, errMsg: "请求时发生错误" });
        else
          reject({ err: res, errMsg: "请求时发生错误" });
      }
    })
  });
}

//检查是否处于登录态。如果是，回调函数中data将包含token, 不是则进入fail
module.exports.checkLogin = function (isDebug) {
  return new Promise((resolve, reject) => {
    //如果isDebug为true则跳过登录, 返回假token
    if (isDebug) {
      resolve({
        data: {
          token: 'hhh',
        }
      })
      return;
    }
    //检查Session是否有效
    wx.checkSession({
      success: () => {
        //检查是否存在登录数据
        module.exports.checkLoginData().then((res) => {
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

function showFailModel (text) {
  wx.hideLoading();
  wx.showModal({
    title: '登录失败1',
    content: text,
    showCancel: true,
    confirmText: '重试',
    success: res => {
      if (res.confirm) {
        wx.showLoading({ title: '正在重试', mask: true });
        module.exports.getCodeLogin();
      }
    }
  });
}


// // deprecated
// //获取登录用的Code并发送到服务器
// module.exports.getCodeLogin = function () {
//   // wx.login({
//   //   success(res) {
//   //     util.debug("wx.login登录成功")
//   //   }
//   // })
//   return new Promise((resolve, reject) => {
//     // util.debug("get code login init")
//     wx.getUserProfile({
//       desc: '用于完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
//       success: (res) => {
//         let userInfo = res.userInfo
//         wx.login({
//           success: res => {
//             // util.debug("get user profile登录成功")
//             if (res.code) {
//               login_({
//                 code: res.code,
//                 userInfo: userInfo,
//               }).then((result) => {
//                 wx.showToast({
//                   title: '登录成功',
//                   icon: 'success'
//                 })

//                 interact.getAllFollowOrgs().then(
//                   (res_orgs) => {
//                     app.userData.followOrgInfo = res_orgs.data
//                     app.userData.followOrgs = []
//                     for (var org in res_orgs.data) {
//                       app.userData.followOrgs.push(res_orgs.data[org].org.id)
//                     }
//                     util.debug("关注的组织：" + app.userData.followOrgs)
//                     resolve(res)
//                   }
//                 )

                
//               })
//               // .catch((e) => {
//               //   console.error("登录失败2：" + e.errMsg);
//               //   if ((e.errMsg + '').indexOf('request:fail') != -1)
//               //     showFailModel('请求时发生错误');
//               //   else
//               //     showFailModel(e.errMsg);
//               // })
//             } else {
//               console.error("登录失败3：" + res.errMsg);
//               showFailModel('未能获取登录授权码');
//             }
//           }
//         })
//       },
//       fail : (res) => {
//         util.debug("get user profile fail" + JSON.stringify(res))
//       }
//     })
//   })

// }

module.exports.newLogin = function() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        if (res.code) {
          login_({
            code: res.code
          }).then(
            res => {
              wx.showToast({
                title: '登录成功',
                icon: 'success'
              })
              resolve()
            }
          )
        } else {
          console.error("登录失败3：" + res.errMsg);
          showFailModel('未能获取登录授权码');
        }
      }
    })
  })
}

module.exports.register_ = function (userInfo) {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
    interact.post_request("userRegister/",
      {
        id : app.loginData.userId,
        userInfo: userInfo
      },
      {
        func: module.exports.registerInfo,
        funcName: 'registerInfo',
        reject: reject,
        resolve: resolve
      }
    )
  })
}

module.exports.registerInfo = function () {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc : '用于完善资料',
      success : (res1) => {
        module.exports.register_(res1.userInfo).then(
          res => {
            if (res.data.status == 0) {
              wx.showToast({
                title: '注册成功',
                icon: 'success'
              })
              module.exports.saveLoginData({
                token: app.loginData.token,
                email : app.loginData.email,
                userExist : 1,
                id : app.loginData.userId,
                name : res1.userInfo.nickName,
                sign : app.loginData.motto,
                avatar : res1.userInfo.avatarUrl
              })
            }
          }
        )
      }
    })
  })
}

module.exports.consistentAskingGetUserProfile = function () {
  wx.showModal({
    content : "需要注册才能继续使用",
    showCancel : false,
    success (res) {
      wx.getUserProfile({
        desc : '用于完善资料',
        success : (res1) => {  
          util.debug("授权成功")
        },
        fail : module.exports.consistentAskingGetUserProfile
      })
    }
  })
}