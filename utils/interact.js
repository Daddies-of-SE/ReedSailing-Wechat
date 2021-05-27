var app = getApp()
const util = require("util.js")
const lg = require("login.js")

function getAPIUrl(params) {
  if (!app) {
    app = getApp()
  }
  return app.server + params;
}

module.exports.post_request = post_request

function get_errmsg(data) {
  return data.detail ? data.detail : data.name ? data.name[0] : JSON.stringify(data).slice(0,50)
}

function send_receivers_to_websocket(result) {
  // 如果返回结果包含"__receivers__"字段, 发送ws请求
    if (result.data.__receivers__) {
      
      wx.sendSocketMessage({
        data: JSON.stringify(result.data.__receivers__),
        // success: (res) => {
        //   wx.showToast({
        //     title: 'success send_receivers_to_websocket',
        //   })
        // }
      })
      
    }
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

        //如果状态码为401 Unauthorized
        var s = result.statusCode
        if (s == 401) {
          login.catchUnLogin(funcInfo);
          return
        } else if (s != 200 && s != 201 && s != 204) {
            wx.showModal({
              title: funcInfo.funcName + "请求失败",
              content: get_errmsg(result.data),
              showCancel: true,
              confirmText: '确认',
            })
            funcInfo.reject({ err: result, errMsg: "服务器发生错误" });
        } 

        send_receivers_to_websocket(result);
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
  // util.debug("path " + urlpath)
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

        //如果状态码为401 Unauthorized
        var s = result.statusCode
        if (s == 401) {
          login.catchUnLogin(funcInfo);
          return
        } else if (s != 200 && s != 201 && s != 204) {
            wx.showModal({
              title: funcInfo.funcName + "请求失败",
              content: get_errmsg(result.data),
              showCancel: true,
              confirmText: '确认',
            })
            funcInfo.reject({ err: result, errMsg: "服务器发生错误" });
        } 

        send_receivers_to_websocket(result);
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

        //如果状态码为401 Unauthorized
        var s = result.statusCode
        if (s == 401) {
          login.catchUnLogin(funcInfo);
          return
        } else if (s != 200 && s != 201 && s != 204) {
            if (funcInfo.funcName  == "getOrgInfo" || funcInfo.funcName == "getActInfo") {
              util.debug(funcInfo.funcName + "未找到id")
              funcInfo.resolve(result);
            }
            else {
              wx.showModal({
                title: funcInfo.funcName + "请求失败",
                content: get_errmsg(result.data),
                showCancel: true,
                confirmText: '确认',
              })
              funcInfo.reject({ err: result, errMsg: "服务器发生错误" });
            }
        } 

        send_receivers_to_websocket(result);
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
        var s = result.statusCode
        if (s == 401) {
          login.catchUnLogin(funcInfo);
          return
        } else if (s != 200 && s != 201 && s != 204) {
            wx.showModal({
              title: funcInfo.funcName + "请求失败",
              content: get_errmsg(result.data),
              showCancel: true,
              confirmText: '确认',
            })
            funcInfo.reject({ err: result, errMsg: "服务器发生错误" });
        } 

        send_receivers_to_websocket(result);
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
    get_request(`organizations/${org_id}/`, 
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
    get_request(`organizations/managers/${org_id}`, 
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
    get_request(`users/${user_id}`, 
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

module.exports.updateUserInfo = function (name, sign, contact) {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
    put_request(`users/${app.loginData.userId}/`,
      {
        name : name,
        sign : sign,
        contact: contact
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

module.exports.getAllManageOrgs = function() {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
    get_request(`users/managed_organizations/${app.loginData.userId}/`, 
      {
        func: module.exports.getAllManageOrgs,
        funcName: 'getAllManageOrgs',
        reject: reject,
        resolve: resolve
    })
  }) 
}

module.exports.getOrgActList = function (org_id) {
  return new Promise((resolve, reject) => {
    get_request(`organizations/activities/${org_id}/`, 
      {
        func: module.exports.getOrgActList,
        funcName: 'getOrgActList',
        reject: reject,
        resolve: resolve
    })
  }) 
}

module.exports.addOrgManager = function (org_id, user_id) {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
    post_request(`organizations/managers/`,
      {
        org : org_id,
        person : user_id
      },
      {
        func: module.exports.addOrgManager,
        funcName: 'addOrgManager',
        reject: reject,
        resolve: resolve
    })
  }) 
}


/*
{
  name: "活动1",							   //必填，活动名称
  begin_time: "2021-04-16T14:19:18",		//必填，活动开始时间
  end_time: "2021-04-16T14:19:18",			//必填，活动结束时间
  contain: 100,								//必填，活动人数限制，该值必须大于等于1
  description: "这个是活动描述",			   //选填，活动描述
  review: false,							//必填，加入该活动是否需要审核
  owner: 5,									//必填，创建该活动的用户id
  type: 1,									//选填，该活动的分类
  org: null,								//选填，该活动的组织的id（若为个人活动则可以不填）
  location: 1,								//必填，该活动的地址的id
  block: 1	
}
*/
module.exports.createAct = function (options, isNew) {
  return new Promise((resolve, reject) => {
    if (isNew) {
      post_request(`activities/`, options,
        {
          func: module.exports.createAct,
          funcName: 'createAct',
          reject: reject,
          resolve: resolve
      })
    }
    else {
      put_request(`activities/${options.id}/`, options,
        {
          func: module.exports.createAct,
          funcName: 'createAct',
          reject: reject,
          resolve: resolve
      })
    }
  }) 
}

module.exports.getActInfo = function (act_id) {
  return new Promise((resolve, reject) => {
    get_request(`activities/${act_id}/`, 
      {
        func: module.exports.getActInfo,
        funcName: 'getActInfo',
        reject: reject,
        resolve: resolve
    })
  })  
}

module.exports.getUserOrgRelation = function(org_id) {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
    post_request(`userOrgRelation/`,
      {
        user: app.loginData.userId,
        org: org_id
      }, 
      {
        func: module.exports.getUserOrgRelation,
        funcName: 'getUserOrgRelation',
        reject: reject,
        resolve: resolve
    })
  })  
}

module.exports.getUserActRelation = function(act_id) {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
    post_request(`userActRelation/`,
      {
        user: app.loginData.userId,
        act: act_id
      }, 
      {
        func: module.exports.getUserActRelation,
        funcName: 'getUserActRelation',
        reject: reject,
        resolve: resolve
    })
  })  
}

module.exports.joinAct = function(act_id) {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
    post_request(`activities/participants/`,
      {
        person: app.loginData.userId,
        act: act_id
      }, 
      {
        func: module.exports.joinAct,
        funcName: 'joinAct',
        reject: reject,
        resolve: resolve
    })
  })  
}

module.exports.exitAct = function(act_id) {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
    delete_request(`activities/participants/?person=${app.loginData.userId}&act=${act_id}&operator=${app.loginData.userId}`,
      {
        func: module.exports.exitAct,
        funcName: 'exitAct',
        reject: reject,
        resolve: resolve
    })
  })  
}

module.exports.submitFeedback = function(content) {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
    post_request(`feedbacks/`,
      {
        user : app.loginData.userId,
        content : content
      },{
        func: module.exports.submitFeedback,
        funcName: 'submitFeedback',
        reject: reject,
        resolve: resolve
    }
    )
  })  
}

module.exports.updateOrgInfo = function (org_id, name, description, avatar) {
  return new Promise((resolve, reject) => {
    put_request(`organizations/${org_id}/`,
      {
        name : name,
        description : description,
        avatar : avatar
      }, 
      {
        func: module.exports.updateOrgInfo,
        funcName: 'updateOrgInfo',
        reject: reject,
        resolve: resolve
    })
  })  
}

module.exports.getActNumPeople = function (act_id) {
  return new Promise((resolve, reject) => {
    get_request(`activities/joined_numbers/${act_id}/`, 
      {
        func: module.exports.getActNumPeople,
        funcName: 'getActNumPeople',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.getActParticipantList = function(act_id) {
  return new Promise((resolve, reject) => {
    get_request(`activities/${act_id}/participants/`, 
      {
        func: module.exports.getActParticipantList,
        funcName: 'getActParticipantList',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.deleteActParticipant = function(act_id, person_id) {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
    delete_request(`activities/participants/?person=${person_id}&act=${act_id}&operator=${app.loginData.userId}`,
      {
        func: module.exports.deleteActParticipant,
        funcName: 'deleteActParticipant',
        reject: reject,
        resolve: resolve
    })
  })  
}




module.exports.submitComment = function(act_id, score, content) {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
    post_request(`activities/comments/`,
      {
        user : app.loginData.userId,
        content : content,
        act : act_id,
        score : score
      },{
        func: module.exports.submitComment,
        funcName: 'submitComment',
        reject: reject,
        resolve: resolve
    }
    )
  })  
}

module.exports.editComment = function(commentId, score, content) {
  return new Promise((resolve, reject) => {
    put_request(`activities/comments/${commentId}/`,
      {
        content : content,
        score : score
      },{
        func: module.exports.editComment,
        funcName: 'editComment',
        reject: reject,
        resolve: resolve
    }
    )
  })  
}

module.exports.deleteComment = function (commentId) {
  return new Promise((resolve, reject) => {
    delete_request(`activities/comments/${commentId}/`, 
      {
        func: module.exports.deleteComment,
        funcName: 'deleteComment',
        reject: reject,
        resolve: resolve
    })
  }) 
}


module.exports.getActComments = function (act_id) {
  return new Promise((resolve, reject) => {
    get_request(`activities/${act_id}/comments/`, 
      {
        func: module.exports.getActComments,
        funcName: 'getActComments',
        reject: reject,
        resolve: resolve
    })
  }) 
}

module.exports.getCommentById = function (comment_id) {
  return new Promise((resolve, reject) => {
    get_request(`/activities/comments/${comment_id}/`, 
      {
        func: module.exports.getCommentById,
        funcName: 'getCommentById',
        reject: reject,
        resolve: resolve
    })
  }) 
}


// module.exports.getRecommendOrgs = function () {
//   if (!app) {
//     app = getApp()
//   }
//   return new Promise((resolve, reject) => {
//     get_request(`recommended/organizations/${app.loginData.userId}/`, 
//       {
//         func: module.exports.getRecommendOrgs,
//         funcName: 'getRecommendOrgs',
//         reject: reject,
//         resolve: resolve
//     })
//   }) 
// }

// module.exports.getRecommendActs = function () {
//   if (!app) {
//     app = getApp()
//   }
//   return new Promise((resolve, reject) => {
//     get_request(`recommended/activities/${app.loginData.userId}/`, 
//       {
//         func: module.exports.getRecommendActs,
//         funcName: 'getRecommendActs',
//         reject: reject,
//         resolve: resolve
//     })
//   })
// }

module.exports.getFollowOrgActs = function () {
  return new Promise((resolve, reject) => {
    get_request(`users/followed_organizations/activities/${getApp().loginData.userId}/`, 
      {
        func: module.exports.getFollowOrgActs,
        funcName: 'getFollowOrgActs',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.deleteOrgManager = function (orgId, personId) {
  return new Promise((resolve, reject) => {
    delete_request(`organizations/managers/?user=${personId}&org=${orgId}`, 
      {
        func: module.exports.deleteOrgManager,
        funcName: 'deleteOrgManager',
        reject: reject,
        resolve: resolve
    })
  }) 
}

module.exports.changeOrgOwner = function (orgId, personId) {
  return new Promise((resolve, reject) => {
    post_request(`organizations/owner/${orgId}`,
      {
        owner: personId 
      },
      {
        func: module.exports.changeOrgOwner,
        funcName: 'changeOrgOwner',
        reject: reject,
        resolve: resolve
    })
  }) 
}

module.exports.deleteAct = function (actId) {
  return new Promise((resolve, reject) => {
    delete_request(`activities/${actId}/`, 
      {
        func: module.exports.deleteAct,
        funcName: 'deleteAct',
        reject: reject,
        resolve: resolve
    })
  }) 
}

module.exports.getJoinedMonthActs = function (year, month) {
  return new Promise((resolve, reject) => {
    get_request(`users/joined_acts/${getApp().loginData.userId}/${year}/${month}/`, 
      {
        func: module.exports.getJoinedMonthAct,
        funcName: 'getJoinedMonthAct',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.getAllActCategories = function () {
  return new Promise((resolve, reject) => {
    get_request(`activities/categories/`, 
      {
        func: module.exports.getAllActCategories,
        funcName: 'getAllActCategories',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.createActCategory = function (name) {
  return new Promise((resolve, reject) => {
    post_request(`activities/categories/`, 
      {name : name},
      {
        func: module.exports.createActCategory,
        funcName: 'createActCategory',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.createActAddress = function (name, long, lat, isNew) {
  if (!isNew) {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }
  return new Promise((resolve, reject) => {
    post_request(`activities/addresses/`, 
      {
        name : name,
        longitude : long,
        latitude : lat
      },
      {
        func: module.exports.createActAddress,
        funcName: 'createActAddress',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.searchAllOrgs = function (content) {
  return new Promise((resolve, reject) => {
    post_request(`organizations/search/`, 
      {
        name : content,
      },
      {
        func: module.exports.searchAllOrgs,
        funcName: 'searchAllOrgs',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.searchAllActs = function (content) {
  return new Promise((resolve, reject) => {
    post_request(`activities/search/`, 
      {
        name : content,
      },
      {
        func: module.exports.searchAllActs,
        funcName: 'searchAllActs',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.searchBlockOrgs = function (content, blockId) {
  return new Promise((resolve, reject) => {
    post_request(`blocks/organizations/search/${blockId}/`, 
      {
        name : content,
      },
      {
        func: module.exports.searchBlockOrgs,
        funcName: 'searchBlockOrgs',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.searchOrgActs = function (content, orgId) {
  if (orgId == -1 || orgId == -2) {
    //博雅、个人
    var block_id = orgId == -1 ? 2 : 5;
    return new Promise((resolve, reject) => {
      post_request(`blocks/activities/search/${block_id}/`,
        {
          name : content,
        },
        {
          func: module.exports.searchOrgActs,
          funcName: 'searchOrgActs',
          reject: reject,
          resolve: resolve
      })
    })
  }
  return new Promise((resolve, reject) => {
    post_request(`organizations/activities/search/${orgId}/`, 
      {
        name : content,
      },
      {
        func: module.exports.searchOrgActs,
        funcName: 'searchOrgActs',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.searchJoinedActs = function (content) {
  return new Promise((resolve, reject) => {
    post_request(`users/joined_acts/search/${getApp().loginData.userId}/`, 
      {
        name : content,
      },
      {
        func: module.exports.searchJoinedActs,
        funcName: 'searchJoinedActs',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.searchManageActs = function (content) {
  return new Promise((resolve, reject) => {
    post_request(`users/released_activities/search/${getApp().loginData.userId}/`, 
      {
        name : content,
      },
      {
        func: module.exports.searchManageActs,
        funcName: 'searchManageActs',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.searchManageOrgs = function (content) {
  return new Promise((resolve, reject) => {
    post_request(`users/managed_organizations/search/${getApp().loginData.userId}/`, 
      {
        name : content,
      },
      {
        func: module.exports.searchManageOrgs,
        funcName: 'searchManageOrgs',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.getAllStatusJoinActs = function () {
  return new Promise((resolve, reject) => {
    get_request(`users/joined_acts/status/${getApp().loginData.userId}/`, 
      {
        func: module.exports.getAllStatusJoinActs,
        funcName: 'getAllStatusJoinActs',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.getAllStatusManageActs = function () {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
    get_request(`users/released_activities/status/${app.loginData.userId}/`, 
      {
        func: module.exports.getAllStatusManageActs,
        funcName: 'getAllStatusManageActs',
        reject: reject,
        resolve: resolve
    })
  }) 
}

module.exports.getAllStatusOrgActs = function (org_id) {
  if (org_id == -1 || org_id == -2) {
    //博雅
    var block_id = org_id == -1 ? 2 : 5;
    return new Promise((resolve, reject) => {
      get_request(`blocks/activities/status/${block_id}/`, 
        {
          func: module.exports.getAllStatusOrgActs,
          funcName: 'getAllStatusOrgActs',
          reject: reject,
          resolve: resolve
      })
    })
  }
  return new Promise((resolve, reject) => {
    get_request(`organizations/activities/status/${org_id}/`, 
      {
        func: module.exports.getAllStatusOrgActs,
        funcName: 'getAllStatusOrgActs',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.getPageQRCode = function (path) {
  return new Promise((resolve, reject) => {
    post_request(`qrcode/`, 
      {
        path : path,
        width : 430
      },
      {
        func: module.exports.getPageUrl,
        funcName: 'getPageUrl',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.uploadOrgAvatar = function(org_id) {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,
      sizeType : ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: getAPIUrl(`organizations/${org_id}/avatar/`),
          filePath: tempFilePaths[0],
          name: 'image',
          method :'POST',
          header : {
            'content-type' : 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + getApp().loginData.token
          },
          success (res) {
            if (res.statusCode != 200) {
              wx.showToast({
                title: '请求出现错误',
                icon : 'none'
              })
              console.error(res)
              reject()
            }
            wx.showToast({
              title: '上传成功',
            })
            console.log("uploadOrgAvatar请求成功")
            console.log(res)
            resolve(JSON.parse(res.data))
          },
          fail (res) {
            wx.showToast({
              title: '网络错误',
              icon: 'none'
            })
            console.error("uploadOrgAvatar请求失败", res)
            reject()
          }
        })
      }
    })
  })
}

module.exports.uploadActAvatar = function(act_id, filePath) {
  return new Promise((resolve, reject) => {
    // console.log(act_id, filePath)
    wx.uploadFile({
      url: getAPIUrl(`activities/${act_id}/avatar/`),
      filePath: filePath,
      name: 'image',
      method :'POST',
      header : {
        'content-type' : 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + getApp().loginData.token
      },
      success (res) {
        if (res.statusCode != 200) {
          wx.showToast({
            title: '请求出现错误',
            icon : 'none'
          })
          console.error(res)
          reject()
        }
        wx.showToast({
          title: '上传成功',
        })
        console.log("uploadActAvatar请求成功")
        console.log(res)
        resolve(JSON.parse(res.data))
      },
      fail (res) {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
        console.error("uploadActAvatar请求失败", res)
        console.log(res)
        reject()
      }
    })

  })
}

module.exports.removeActAvatar = function(act_id) {
  return new Promise((resolve, reject) => {
    delete_request(`activities/${act_id}/avatar/`, 
      {
        func: module.exports.removeActAvatar,
        funcName: 'removeActAvatar',
        reject: reject,
        resolve: resolve
    })
  })
}

module.exports.updateFollowBoya = function (follow) {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
    put_request(`users/${app.loginData.userId}/`,
      {follow_boya : follow, name : app.loginData.nickName}, 
      {
        func: module.exports.updateFollowBoya,
        funcName: 'updateFollowBoya',
        reject: reject,
        resolve: resolve
    })
  })  
}

module.exports.setNotifsRead = function (ids, read) {
  return new Promise((resolve, reject) => {
    if (read == 1) {
      resolve()
    }
    put_request(`notifications/read/${getApp().loginData.userId}/`, 
      {
        notifications : ids,
      },
      {
        func: module.exports.setNotifsRead,
        funcName: 'setNotifsRead',
        reject: reject,
        resolve: resolve
    })
  })
}
module.exports.getRecommend = function () {
  if (!app) {
    app = getApp()
  }
  return new Promise((resolve, reject) => {
    get_request(`recommended/${app.loginData.userId}/`, 
      {
        func: module.exports.getRecommend,
        funcName: 'getRecommend',
        reject: reject,
        resolve: resolve
    })
  })
}